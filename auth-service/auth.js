const express = require('express');
const https = require('https');
const fs = require('fs');
const jwt = require('jsonwebtoken');
const rateLimit = require('express-rate-limit');
const winston = require('winston');
const helmet = require('helmet');
const Joi = require('joi');  
const { producer } = require('./kafka');

const app = express();

// ✅ Ensure JSON parsing is enabled correctly
app.use(express.json()); 

// ✅ Security best practices
app.use(helmet());

// ✅ Logger setup
const logger = winston.createLogger({
  transports: [
    new winston.transports.Console(),
    new winston.transports.Http({ host: 'logstash', port: 5000 }) 
  ]
});

// ✅ Rate limiting setup
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, 
  max: 100, 
});
app.use(limiter);

// ✅ Joi schema for request validation
const loginSchema = Joi.object({
  username: Joi.string().min(3).max(30).required(),
  password: Joi.string().min(6).required()
});

app.post('/login', (req, res) => {
  console.log("Received request body:", req.body); // ✅ Debugging log

  if (!req.body || Object.keys(req.body).length === 0) {
    logger.warn("Received empty request body");
    return res.status(400).json({ 
      statusCode: 400,
      messageId: 'form-auth.invalid',
      message: 'bad login data',
    });
  }

  const { error } = loginSchema.validate(req.body);
  if (error) {
    logger.warn(`Invalid login attempt: ${error.details[0].message}`);
    return res.status(400).json({ 
      statusCode: 400,
      messageId: 'form-auth.invalid',
      message: 'bad login data',
    });
  }

  const { username, password } = req.body;

  if (username === 'admin' && password === 'password') {
    const token = jwt.sign({ username }, 'secretkey', { expiresIn: '1h' });

    producer.send([{ topic: 'auth-topic', messages: `User ${username} logged in` }], (err) => {
      if (err) {
        logger.error('Kafka send error:', err);
      } else {
        logger.info(`User ${username} logged in`);
      }
    });

    return res.json({ token });
  } else {
    logger.warn(`Failed login attempt for username: ${username}`);
    return res.status(401).json({
      statusCode: 401,
      messageId: 'form-auth.unauthorized',
      message: 'Invalid credentials',
    });
  }
});

// ✅ Load HTTPS certificates correctly
try {
  const options = {
    key: fs.readFileSync('key.pem'),
    cert: fs.readFileSync('cert.pem')
  };

  https.createServer(options, app).listen(3000, () => {
    logger.info('Auth service running securely on HTTPS port 3000');
  });
} catch (error) {
  console.error("Error loading SSL certificates:", error);
}

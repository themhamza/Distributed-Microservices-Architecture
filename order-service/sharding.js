const mysql = require('mysql2');


const shards = [
  { host: 'mysql-shard1', port: 3306, user: 'root', password: 'root', database: 'shard1' },
  { host: 'mysql-shard2', port: 3306, user: 'root', password: 'root', database: 'shard2' },
];


function getShard(key) {
  const hash = key.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  return shards[hash % shards.length];
}


function queryShard(key, sql, params) {
  const shard = getShard(key);
  const connection = mysql.createConnection(shard);
  return new Promise((resolve, reject) => {
    connection.query(sql, params, (err, results) => {
      connection.end();
      if (err) reject(err);
      else resolve(results);
    });
  });
}

module.exports = { queryShard };
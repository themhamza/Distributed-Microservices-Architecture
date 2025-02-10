# Distributed Microservices Architecture with Kafka, JWT, and MySQL Sharding

This project demonstrates a **distributed microservices architecture** using **Node.js**, **Kafka**, **JWT authentication**, **rate limiting**, **centralized logging & monitoring** (Prometheus + Grafana, ELK Stack), and **MySQL sharding**. It also includes a **CI/CD pipeline** for zero-downtime deployment.

---

## Table of Contents
1. Project Overview
2. Features
3. Technologies Used
4. Setup Instructions
5. Running the Project
6. Testing the Project
7. Monitoring and Logging
8. CI/CD Pipeline
9. Database Sharding
10. Contributing

---

## Project Overview

This project consists of two microservices:
1. **Auth Service**: Handles user authentication using JWT and produces login events to Kafka.
2. **Order Service**: Consumes Kafka messages and processes orders using MySQL sharding for high availability.

The system is designed to be **scalable**, **fault-tolerant**, and **secure**. It includes:
- Real-time event-driven communication using **Kafka**.
- Centralized logging with the **ELK Stack** (Elasticsearch, Logstash, Kibana).
- Monitoring with **Prometheus** and **Grafana**.
- **CI/CD pipeline** for automated testing and deployment.
- **MySQL sharding** for database scalability.

---

## Features

- **Authentication**: JWT-based authentication for secure API access.
- **Rate Limiting**: Prevents abuse by limiting API requests.
- **Real-Time Communication**: Kafka for event-driven communication between services.
- **Centralized Logging**: Logs are aggregated using the ELK Stack.
- **Monitoring**: Prometheus and Grafana for system health monitoring.
- **Scalability**: MySQL sharding for distributed database storage.
- **CI/CD**: Automated deployment with zero downtime.

---

## Technologies Used

- **Node.js**: Backend runtime for microservices.
- **Kafka**: Real-time event streaming.
- **JWT**: Secure authentication.
- **MySQL**: Database with sharding for high availability.
- **Prometheus + Grafana**: Monitoring and visualization.
- **ELK Stack**: Centralized logging (Elasticsearch, Logstash, Kibana).
- **Docker**: Containerization for easy deployment.
- **GitHub Actions**: CI/CD pipeline for automated testing and deployment.

---

## Setup Instructions
### Prerequisites
- Docker and Docker Compose installed.
- Node.js (v14 or higher).
---

## Running the Project
1. **Auth Service:** Runs on `http://localhost:3000`

`curl -X POST http://localhost:3000/login -d '{"username":"admin","password":"password"}'`
   
2. **Order Service:** Runs on `http://localhost:3001`

   `curl -X POST http://localhost:3001/order -d '{"userId":"user1","product":"Laptop","quantity":1}`

---
## Testing the Project

1. **Test Authentication:**

   `curl -X POST http://localhost:3000/login -d '{"username":"admin","password":"password"}'`

2. **Test Order Service:**

   `curl -X POST http://localhost:3001/order -d '{"userId":"user1","product":"Laptop","quantity":1}'`

---
## Monitoring and Logging

1. **Prometheus:** Access at `http://localhost:9090`.

2. **Grafana:** Access at `http://localhost:3000`.

      - Add Prometheus as a data source.

      - Create dashboards to visualize metrics.

3. **Kibana:** Access at `http://localhost:5601`.

      - Search and analyze logs.

---
  
## CI/CD Pipeline

The project includes a GitHub Actions workflow for automated testing and deployment. The pipeline:

- Runs tests on every push to the main branch.

- Deploys the application to production with zero downtime.

---

  ## Database Sharding

  The order-service uses MySQL sharding to distribute data across multiple databases.

  The sharding logic is implemented in order-service/src/sharding.js.

---
  ## Contributing

  Contributions are welcome! Please follow these steps:

  - Fork the repository.



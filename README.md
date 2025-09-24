# Microservices Backend with NestJS, PostgreSQL, and Next.js UI

This repository contains a microservices-based backend using NestJS and PostgreSQL, with an API Gateway exposing REST APIs. It supports Products and Orders services. The system is containerized with Docker Compose, includes Swagger for API documentation, and a basic Next.js frontend for interaction.

## Architecture Overview
- **Products Service**: Microservice for CRUD on products (TCP port 3001).
- **Orders Service**: Microservice for creating and viewing orders (TCP port 3002), communicates with Products via TCP.
- **API Gateway**: Hybrid app exposing REST APIs on port 3000, handles JWT auth, routes to services via TCP, and includes Swagger at `/api`.
- **Frontend**: Next.js app on port 4000 for basic UI to interact with APIs (login, products CRUD, orders create/view).
- **Database**: Shared PostgreSQL with separate schemas.
- Monorepo managed with Yarn Workspaces.

## Setup and Usage
### Prerequisites
- Node.js 18+
- Yarn
- Docker & Docker Compose
- Git

### Local Development
1. Clone the repo: `git clone <repo-url>`.
2. Install dependencies: `yarn install`.
3. Create `.env` files in each package with DATABASE_URL and JWT_SECRET.
4. Start services using yarn scripts.
5. Access Swagger at http://localhost:3000/api, frontend at http://localhost:4000.

### Docker Compose
`docker-compose up --build`.

### Testing
Use Swagger or import postman_collection.json.

## Commit History
- Init monorepo
- Add products service
- Add orders service
- Add API gateway
- Add frontend
- Add Docker and docs
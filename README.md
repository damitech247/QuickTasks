# Task Management App
## Overview
QuickTasks is a scalable and secure SaaS task management application. It includes a containerized Node.js API backend and a SvelteKit frontend, deployed using AWS Fargate and following best practices in networking, security, and integrations.

### Production Links
*  **Web App**: https://www.damitech.xyz
*  **Postman Docs**: https://documenter.getpostman.com/view/45984001/2sB2x9iAVJ
*  **Swagger UI**: https://api.damitech.xyz/swagger
*  **API Base URL**: https://api.damitech.xyz

## Application Routes

### `/` – Task Management Dashboard
Main dashboard for managing tasks. Users can create, view, update, and delete tasks in a Kanban-style interface.
- **Access**: Authenticated route for **both Users and Admins**
- **Screenshot**:
![Task Dashboard](screenshots/home-page.png)

---

### `/auth` – Role Selection Page
Login entry point where users choose to log in as either an admin or a regular user.
- **Access**: Public (non-authenticated)
- **Screenshot**:
![Auth Role Selection](screenshots/auth.png)

---

### `/auth/user` – User Login Page
Dedicated login page for regular users. On successful login, users are redirected to the Task Dashboard.
- **Access**: Public (non-authenticated)
- **Screenshot**:
![User Login](./screenshots/auth-user.png)

---

### `/auth/admin` – Admin Login Page

Dedicated login page for administrators. Successful login redirects to the Admin Console.
- **Access**: Public (non-authenticated)
- **Screenshot**:
![Admin Login](./screenshots/auth-admin.png)

---

### `/console` – Admin Console
Admin-only interface for managing users. Admins can create, update, delete, and lock user accounts.
- **Access**: Authenticated route for **Admins only**
- **Screenshot**:
![Admin Console](./screenshots/console.png)

---

> ⚠️ All main application routes require authentication. Only `/auth` and its child login pages are accessible without being signed in.

## Architecture
Below is a comprehensive architectural diagram that illustrates the overall system design of the QuickTasks application. It highlights all core AWS services used (such as ECS, RDS, ALB, WAF, Secrets Manager, etc.), networking structure, and integrations with external services like Slack

![Alt text](screenshots/arch-diagram.png)

### Infrastructure as Code (IaC)

The cloud infrastructure for QuickTasks is provisioned using **Terraform**. This ensures repeatable, version-controlled deployments across environments.

### Provisioning Highlights

- **IaC Tool**: Terraform
- **Execution Platform**: Terraform Cloud (for state management and automated apply)
- **Structure**:
  - `environments/`: Contains environment-specific configurations (e.g., `dev`, `prod`)
  - `modules/`: Reusable infrastructure modules

### Benefits

- Automated provisioning of VPC, ECS, ALB, Route 53 records, S3, CloudFront, and other AWS services
- Environment isolation using separate workspaces in Terraform Cloud
- Secure remote state management
- Simplified change tracking and version control

### To Apply Infrastructure (Locally for Testing)
```bash
git clone https://github.com/damitech247/QuickTasks
cd environments/prod
terraform init
terraform plan
terraform apply
```

> For live infrastructure, provisioning is automatically handled via **Terraform Cloud** connected to the Git repository.

### Domain & DNS Setup
- **Domain**: `damitech.xyz` (purchased via GoDaddy)
- **DNS Management**: 
  - Updated nameservers to point to **Amazon Route 53**
  - Configured **A records** for application endpoints
  - Configured **CNAME records** for ACM TLS validation

### Network Setup
- **VPC CIDR**: `10.100.0.0/16`
- **Subnets**:
  - 2 × Public Subnets (used for Public Application Load Balancer)
  - 2 × Private Subnets (used for ECS Containers and RDS)
- **Availability Zones**: Deployment across multiple AZs for high availability

### Load Balancer & WAF
- **ALB**: Serves as the public entry point
  - Integrated with **AWS Certificate Manager (ACM)** for TLS
  - Integrated with **AWS WAF**
    - **AWS Managed Rules** for protection (SQLi, XSS)
    - Custom Web ACLs


## GitHub Actions: CI/CD Deployment Pipeline

This GitHub Actions workflow automates the deployment of both the **API** and **Frontend** services for the QuickTasks application using **AWS ECS** and **AWS ECR**.

### Workflow File
Located at: `.github/workflows/deploy.yml`


### Trigger
This workflow runs on:
- `push` to the `main` branch
- `pull_request` to the `main` branch

### Jobs Overview

#### 1. API Deployment Job (`api-deploy`)

- Checkout code from GitHub
- Configure AWS credentials using GitHub secrets
- Authenticate Docker with AWS ECR
- Build Docker image from `./server`
- Tag and push image to AWS ECR
- Force ECS service update for the API

**ECR Repo**: `damitech/quicktasks-api`  
**ECS Service**: `prod-quicktasks-api`  
**Cluster**: `prod-cluster`


#### 2. Frontend Deployment Job (`frontend-deploy`)

- Checkout code
- Configure AWS credentials
- Authenticate with AWS ECR
- Build Docker image from `./client`
- Tag and push image to AWS ECR
- Force ECS service update for the frontend

**ECR Repo**: `damitech/quicktasks-frontend`  
**ECS Service**: `prod-quicktasks-frontend`  
**Cluster**: `prod-cluster`

###  Required GitHub Secrets

Make sure the following secrets are defined in your GitHub repository settings:

- `AWS_ACCESS_KEY_ID`
- `AWS_SECRET_ACCESS_KEY`


### Benefits of Automated Deployment Pipeline

- Zero-downtime deployments using `--force-new-deployment`
- Secure image handling with ECR
- Automated and consistent delivery to ECS on every change to `main`


## Application Stack

### 🛠️ ECS Cluster & Services
- **ECS Cluster**:
  - 2 services:
    - `API Service`: Node.js + Express, with SQLite ORM to communicate with the RDS database
    - `Frontend Service`: SvelteKit using Vite, deployed in SSR mode
- Both services are containerized and deployed on **AWS Fargate**
- Deployed across **multiple Availability Zones** for HA

---

### Static Assets & CDN
- Hosted static assets (images, SVGs, etc.) in **S3**
- Delivered via **CloudFront** for global caching and performance

---

### Security
- **Secrets Manager**:
  - Stores DB credentials and app secrets
  - ECS tasks use IAM roles to securely pull credentials at runtime
- **TLS Encryption**: Handled by ACM at the ALB layer
- **WAF**: Provides input validation and protection against common attacks

---

### Database
- **Amazon RDS**:
  - Multi-AZ deployment for resilience
  - Indexed for optimized queries
  - Accessed through Sequelize ORM from backend containers

## Integrations, Documentation & Setup

### Slack Integration
- Integrated with **Slack API**
- Sends notifications (e.g., on task creation) to a dedicated Slack channel for team collaboration


## API Documentation
- Postman: https://documenter.getpostman.com/view/45984001/2sB2x9iAVJ
- Swagger: https://api.damitech.xyz/swagger

### Endpoints

Base URL: `https://api.damitech.xyz`

## Authentication

### POST `/api/auth/login`
Authenticate a user and return a JWT token.

**Request Body**:
```json
{
"email": "admin@damitech.xyz",
"password": "S3cureP@ss25"
}
```

**Response**:
```json
{
    "success": true,
    "data": {
        "token": "eyJhbGciOiJIUzI1NiIxxxxxxxx",
        "user": {
            "id": "9f4a93ab-7bac-44c4-8fc6-8bf4cf47b5c4",
            "email": "admin@damitech.xyz",
            "role": "admin",
            "firstName": "Administrator",
            "lastName": ""
        }
    }
}
```

## Admin User Management (Requires Admin Role)

### GET `/api/admin/users`
List all users.

### GET `/api/admin/users/:id`
Retrieve a single user by ID.

### POST `/api/admin/users`
Create a new user.

**Request Body**:
```json
{
  "firstName": "Jane",
  "lastName": "Doe",
  "email": "jane@damitech.xyz",
  "password": "pass",
  "role": "user",
  "department": "HR"
}
```

### PUT `/api/admin/users/:id`
Update a user by ID.

### DELETE `/api/admin/users/:id`
Delete a user by ID.


## Task Management (Authenticated)

### GET `/api/tasks`
Get all tasks for the logged-in user.

### GET `/api/tasks/:id`
Get a task by ID.

### POST `/api/tasks`
Create a new task.

**Request Body**:
```json
{
  "title": "Prepare Quarterly Report",
  "description": "Compile and submit the Q2 financial performance report.",
  "deadline": "2025-07-01T17:00:00Z",
  "priority": "high"
}
```

### PUT `/api/tasks/:id`
Update an existing task.

### DELETE `/api/task/:id`
Delete a task by ID.


## User Profile

### PUT `/api/profile/password`
Update the authenticated user's password.

**Request Body**:
```json
{
  "currentPassword": "Dami#Pass123",
  "newPassword": "Dami#Pass247"
}
```

---

### Notes
- All routes (except `/api/auth/login`) require a valid JWT in the `Authorization` header.
- Admin-only routes are restricted using role-based access control.


## Local Development Setup
1. Clone the repo: `git clone https://github.com/damitech247/QuickTasks`
2. Configure AWS infrastructure via AWS Console or IaC (e.g., Terraform)
3. Store secrets in AWS Secrets Manager
4. Deploy Docker images to ECS Fargate
5. Set DNS and ACM certs via Route 53 and ACM
6. Open the application via `https://www.damitech.xyz`


### Project Structure (Key Folders)
```
server/
├── app.js                  # Main Express app
├── routes/                 # All route files
├── controllers/            # Route handlers
├── models/                 # Sequelize models
├── middleware/             # Authentication and validation
├── config/db.config.js     # Database configuration
├── initRootAdmin.js        # Initializes the root admin user
├── package.json            # Node.js dependencies
├── Dockerfile              # For containerization

client/
├── src/                    # SvelteKit source code
├── static/                 # Static files
├── package.json            # Frontend dependencies
```

### Prerequisites
Ensure you have the following installed:
- Node.js (v18 or later)
- npm (v9 or later)
- PostgreSQL (or a compatible DB if configured)
- Git
- Docker (optional, for containerized run)

### Getting Started Locally

1. Clone the Repository
```bash
git clone https://github.com/damitech247/QuickTasks.git
cd quicktasks
```

2. Install Dependencies
```bash
cd server
npm install
```

3. Set Up Environment Variables

Rename the `sample.env` file to `.env`:

```bash
cp sample.env .env
```

Edit `.env` to match your local database and secrets setup.

Example:
```env
PORT=8080
DB_HOST=localhost
DB_USER=your_db_user
DB_PASSWORD=your_db_password
DB_NAME=quicktasks_dev
JWT_SECRET=your_jwt_secret
ROOT_ADMIN_EMAIL=admin@damitech.xyz
ROOT_ADMIN_PASSWORD=your_admin_password_here
```

### 4. Start the Server
```bash
node app.js
```

Server will run at `http://localhost:8080`.

---

### Frontend Setup (Client)

5. Install Frontend Dependencies
```bash
cd ../client
npm install
```

6. Start the Frontend Dev Server
```bash
npm run dev
```

Frontend will run at `http://localhost:5173` (default Vite port).

---

### Optional: Run Backend with Docker

```bash
cd server
docker build -t quicktasks-app .
docker run -p 8080:8080 quicktasks-app
```

### Setup Tips

- Ensure your database is running and accessible.
- Backend auto-creates a root admin on first start.
- Use pgAdmin or TablePlus to inspect DB.
- Use Postman or Swagger to test backend APIs.

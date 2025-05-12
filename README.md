
----------

## 📁 Multi-Role Project Management System

A robust multi-tenant REST API where companies can manage users, projects, and tasks with strict **role-based access control**.

----------

### 🚀 Tech Stack

-   **Backend:** Node.js, Express.js
    
-   **Database:** MongoDB (Mongoose ODM)
    
-   **Authentication:** JWT + Refresh Token
    
-   **Validation:** express-validator
    
-   **Security:** Rate Limiting, CORS
    
-   **Testing:** Jest (optional)
    
-   **Deployment Ready:** Docker, GitHub Actions (CI/CD)
    

----------

### 🧱 Features

#### 🔐 Authentication & Authorization

-   JWT-based login with refresh token
    
-   Roles: `Admin`, `Manager`, `Member`
    
-   Role-based access control (RBAC)
    

#### 🏢 Multi-Tenancy

-   Users, Projects, and Tasks are tied to one `Company`
    
-   Isolation between different companies' data
    

#### 🧑‍💼 User Management

-   Admins can create, list, and update users
    
-   Passwords are hashed using bcrypt
    

#### 📁 Projects

-   CRUD operations by Admin & Manager
    
-   Each project belongs to a company and a user (creator)
    

#### ✅ Tasks

-   CRUD by Admin/Manager
    
-   Members can view & update only their assigned tasks
    
-   Tasks have status: `To Do`, `In Progress`, `Done`
    

#### 🔍 Extras

-   Pagination, search/filter (e.g. by status, assignee)
    
-   Centralized error handling
    
-   Audit logging (e.g. "User X updated Task Y at Time Z")
    
-   Rate limiting per IP
    

----------

### 📂 Folder Structure

go

CopyEdit

`├── controllers/
├── routes/
├── models/
├── middleware/
├── services/
├── tests/
├── .env.example
├── app.js
├── README.md
└── package.json` 

----------

### ⚙️ Setup Instructions

1.  **Clone the Repository**
    

bash

CopyEdit

`git clone https://github.com/yourusername/project-management-api.git cd project-management-api` 

2.  **Install Dependencies**
    

bash

CopyEdit

`npm install` 

3.  **Create a `.env` file**
    

bash

CopyEdit

`cp .env.example .env` 

4.  **Update `.env` with your values:**
    

env

CopyEdit

`PORT=5000
MONGODB_URI=mongodb://localhost:27017/projectdb
JWT_SECRET=your_jwt_secret
REFRESH_TOKEN_SECRET=your_refresh_secret
TOKEN_EXPIRY=15m
REFRESH_TOKEN_EXPIRY=7d` 

5.  **Run the App**
    

bash

CopyEdit

`npm run dev` 

----------

### 📬 API Endpoints (Grouped)

#### 🔐 Auth

pgsql

CopyEdit

`POST   /api/auth/register       → Register a company and  admin POST   /api/auth/login → Login  and  get tokens
POST   /api/auth/refresh-token  → Refresh  access token` 

#### 👥 Users

pgsql

CopyEdit

`POST   /api/users               → Create a user (Admin  only) GET /api/users/:companyId    → List users of company (Admin  only)
PUT    /api/users/:userId       → Update  user (Admin  only)` 

#### 📁 Projects

pgsql

CopyEdit

`POST   /api/projects            → Create project (Admin, Manager) GET /api/projects/:companyId→ List company projects (Admin, Manager)
PUT    /api/projects/:projectId→ Update project (Admin, Manager)` 

#### ✅ Tasks

pgsql

CopyEdit

`POST   /api/tasks               → Create task (Admin, Manager) GET /api/tasks/:projectId    → List tasks (Admin, Manager)
PUT    /api/tasks/:taskId       → Update task (All roles: only assigned if Member)` 

----------

### 🧪 Testing (Optional)

To run unit tests (if implemented):

bash

CopyEdit

`npm test`


# Real Estate API

The **Real Estate API** is a fully structured backend system built with **Node.js** and **Express.js**, designed to power real estate and property listing platforms.  
It follows a clean **MVC architecture**, supports secure authentication, and allows users to create, manage, and browse property listings.

This API is suitable for mobile apps, web apps (React, Next.js, Vue), or standalone backend services.

---

## 🚀 Features

### 🔐 **Authentication & Authorization**
- User registration & login (JWT-based)
- Secured routes using Access Tokens
- Role-based access control  
  - **Admin**  
  - **Agent**  
  - **Client/User**

### 🏠 **Property Management**
- Create, read, update, delete (CRUD)
- Upload property images (via Multer)
- Property validation  
- Ownership restrictions for agents

### ⚙️ **Core Backend Features**
- Custom error handling middleware
- Request validation middleware
- Token verification middleware
- Cleaner project structure (Controller, Routes, Models)

---

## 📁 Project Structure
real_estate_api/
│── Controller/
│ ├── propertyController.js
│ ├── userController.js
│
│── Routes/
│ ├── propertyRoute.js
│ ├── userRoute.js
│
│── middleware/
│ ├── errorHandler.js
│ ├── roleMiddleware.js
│ ├── uploadMiddleware.js
│ ├── validateHandlerToken.js
│
│── model/
│ ├── propertyModel.js
│ ├── userModel.js
│
│── config/
│ ├── db.js (if present)
│
│── server.js
│── package.json
│── README.md



---

## 🔧 Installation & Setup

### **1. Clone the repository**
```bash
git clone https://github.com/YourUsername/real_estate_api.git
cd real_estate_api


2. Install dependencies
npm install
3. Create a .env file
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
4. Start the server
npm start
Server runs on:
http://localhost:5000

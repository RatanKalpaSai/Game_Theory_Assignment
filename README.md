# Game_Theory_Assignment
A booking app for a sports technology company's operations team.

# Backend Booking Management System

## College ID: [IIT2021016]

### Introduction
This is the backend for a booking management system that handles:
- Customer management
- Center (facility) management
- Booking management

The backend is implemented using Node.js with Express and MongoDB as the database.

### Prerequisites
- Node.js (v14+)
- MongoDB Atlas or a local MongoDB instance
- npm or yarn

### Dependencies
- express
- dotenv
- mongoose
- express-async-handler
- cookie-parser
- cors

## Setup Instructions

### Backend Setup (Render.com)
1. Navigate to the backend directory:
    ```bash
    cd backend
    npm install
    ```

2. Create a `.env` file in the `backend/` directory with the following content:
    ```env
    PROD_MODE
    MONGO_URI
    DEV_MODE
    PORT=5000
    ```

3. Deploy to Render.com:
    - Login to [Render.com](https://render.com) and create a new Web Service.
    - Connect your GitHub repository containing the backend.
    - Add the following environment variables in Render’s **Environment tab**:
      ```makefile
      MONGO_URI=your_mongodb_atlas_uri
      PORT=5000
      ```
    - Deploy the service.

4. Backend URL:  
   `[https://sportify-m8gu.onrender.com](https://game-theory-assignment-li8x.onrender.com)`

---

### Frontend Setup (Netlify)
1. Navigate to the frontend directory:
    ```bash
    cd ./frontend
    npm install
    ```

2. Create a `.env` file in the `frontend/` directory:
    ```env
    VITE_API_BASE_URL
    VITE_API_CUSTOMER_URL
    VITE_API_CENTER_URL
    VITE_API_BOOKING_URL
    ```

3. Build the frontend:
    ```bash
    npm run build
    ```

4. Deploy to Netlify:
    - Login to [Netlify](https://netlify.com) and create a new site.
    - Connect your GitHub repository containing the frontend.
    - Add the following environment variable in Netlify’s **Environment tab**:
      ```
    VITE_API_BASE_URL
    VITE_API_CUSTOMER_URL
    VITE_API_CENTER_URL
    VITE_API_BOOKING_URL
      ```
    - Deploy the site.

5. Frontend URL:  
   `(https://serene-gelato-16454a.netlify.app/)(https://serene-gelato-16454a.netlify.app/)`

---

## Running the Application Locally

### Backend:
- Navigate to the `backend/` directory and start the server:
    ```bash
    npm run dev
    ```

### Frontend:
- Navigate to the `frontend/` directory and start the development server:
    ```bash
    npm run dev
    ```

---

## Deployed URLs
- **Frontend (Netlify):**  
  `https://serene-gelato-16454a.netlify.app`

- **Backend (Render.com):**
  `https://game-theory-assignment-li8x.onrender.com`

---

## Special Instructions
1. Ensure MongoDB Atlas cluster IP is properly whitelisted to allow access.
2. Use valid date inputs to avoid booking errors.
3. To reset data, rerun the seed script in the `backend/` directory:
    ```bash
    npm run seed
    ```

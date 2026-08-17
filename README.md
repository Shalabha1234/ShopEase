# 🛍️ ShopEase | Full Stack E-Commerce Platform

ShopEase is a modern full-stack e-commerce platform built using **React, TypeScript, Node.js, Express.js, and Supabase**. It provides a complete online shopping experience with secure authentication, product management, shopping cart, wishlist, order tracking, and an admin dashboard.

---

## ✨ Features

### 👤 Customer Features
- User Registration & Login
- JWT Authentication
- Browse Products
- Product Details
- Category Filtering
- Shopping Cart
- Wishlist
- Secure Checkout
- Order Placement
- Order History
- Order Tracking
- Responsive User Interface

### 👨‍💼 Admin Features
- Admin Dashboard
- Product Management (Create, Update, Delete)
- User Management
- Order Management
- Dashboard Statistics

---

# 🛠️ Tech Stack

## Frontend
- React
- TypeScript
- Vite
- React Router
- Tailwind CSS
- Context API

## Backend
- Node.js
- Express.js
- TypeScript
- JWT Authentication
- REST API

## Database
- Supabase (PostgreSQL)

## Tools
- Git
- GitHub
- VS Code

---

# 📂 Project Structure

```
ShopEase/
│
├── frontend/
│   ├── src/
│   │   ├── api/
│   │   ├── assets/
│   │   ├── components/
│   │   ├── context/
│   │   ├── data/
│   │   ├── pages/
│   │   └── App.tsx
│   │
│   └── package.json
│
├── backend/
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── routes/
│   │   ├── services/
│   │   └── server.ts
│   │
│   └── package.json
│
└── README.md
```

---

# 🔐 Authentication

- Secure JWT Authentication
- Protected Routes
- Role-based Admin Access
- Secure Password Encryption

---

# 🚀 Getting Started

## Clone the Repository

```bash
git clone https://github.com/Shalabha1234/ShopEase.git

cd ShopEase
```

---

## Backend Setup

```bash
cd backend

npm install

npm run dev
```

Backend runs on:

```
http://localhost:5000
```

---

## Frontend Setup

```bash
cd frontend

npm install

npm run dev
```

Frontend runs on:

```
http://localhost:5173
```

---

# ⚙️ Environment Variables

### Backend (.env)

```env
SUPABASE_URL=your_supabase_url

SUPABASE_KEY=your_supabase_key

JWT_SECRET=your_secret_key

PORT=5000
```

### Frontend (.env)

```env
VITE_API_URL=http://localhost:5000
```

---

# 📈 Future Enhancements

- Online Payment Gateway Integration
- Product Reviews & Ratings
- Email Notifications
- Discount Coupons
- Inventory Analytics
- Dark Mode
- Multi-language Support

---


---

# ⭐ Support

If you found this project useful, consider giving it a ⭐ on GitHub.

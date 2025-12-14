## 🚗 Vehicle Rental Management API

🔗 **Live URL:** https://ass2-virid.vercel.app/

---

## 📌 Project Description

এই প্রোজেক্টটি একটি **Vehicle Rental Management System API**, যেখানে:

- User Authentication  
- Vehicle Management  
- Booking System  

সবকিছু **Role-based Access Control (Admin & Customer)** দিয়ে পরিচালিত হয়।

---

## ✨ Features

### 🔐 Authentication & User
- JWT ভিত্তিক Authentication  
- User Registration & Login  
- Admin এবং Customer role  
- Admin সব user manage করতে পারে  
- Customer শুধু নিজের profile update করতে পারে  

---

### 🚘 Vehicle Management
- Admin vehicle add / update / delete করতে পারে  
- Public সব vehicle দেখতে পারে  
- Vehicle availability (`available` / `booked`) auto update হয়  

---

### 📅 Booking System
- Customer/Admin booking করতে পারে  
- Vehicle availability check হয়  
- Auto total price calculation  

**Customer:**
- নিজের booking দেখতে পারে  
- Rent শুরু হওয়ার আগে booking cancel করতে পারে  

**Admin:**
- সব booking দেখতে পারে  
- Booking `returned` করলে vehicle আবার `available` হয়  

---

## 🛠️ Technology Stack

### Backend
- Node.js  
- Express.js  
- TypeScript  

### Database
- PostgreSQL  
- pg (node-postgres)  

### Security & Tools
- JWT (jsonwebtoken)  
- bcrypt (password hashing)  
- dotenv  
- Role-based middleware  

### Deployment
- Vercel  

---

## 📂 Project Structure

src/
│
├── config/
│ └── db.ts
│
├── modules/
│ ├── auth/
│ ├── users/
│ ├── vehicles/
│ └── bookings/
│
├── middlewares/
│ └── auth.ts
│
├── app.ts
└── server.ts



---

## 📮 API Endpoints (Summary)

### Auth
- `POST /api/v1/auth/register`
- `POST /api/v1/auth/login`

### Users
- `GET /api/v1/users` (Admin)
- `PUT /api/v1/users/:id`
- `DELETE /api/v1/users/:id` (Admin)

### Vehicles
- `POST /api/v1/vehicles` (Admin)
- `GET /api/v1/vehicles`
- `GET /api/v1/vehicles/:vehicleId`
- `PUT /api/v1/vehicles/:vehicleId` (Admin)
- `DELETE /api/v1/vehicles/:vehicleId` (Admin)

### Bookings
- `POST /api/v1/bookings`
- `GET /api/v1/bookings`
- `PUT /api/v1/bookings/:bookingId`

---

## 🔗 Links

- **GitHub Repository:** https://github.com/NUMSagor/ass2.git  
- **Live Deployment:** https://ass2-virid.vercel.app/

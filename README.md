# 🧑‍💼 Job Portal – Full Stack Project

A full-stack Job Application Portal built using **React, Node.js, Express, and PostgreSQL**.  
The platform supports **Admin (Recruiter)** and **User (Candidate)** roles with proper authentication, authorization, and real-world hiring workflow.

---

## 🔗 Live URLs

- **Backend API**: https://job-portal-rowj.onrender.com  
- **Frontend**: Deployed on Vercel

---

## 🛠️ Tech Stack

### Frontend
- React.js
- React Router
- Axios
- Tailwind CSS
- Vite

### Backend
- Node.js
- Express.js

### Database
- PostgreSQL

### Authentication
- JWT (JSON Web Token)
- bcryptjs

---

## 👥 User Roles

### 👨‍💼 Admin / Recruiter
- Register & Login
- Create job postings
- Update job details
- Delete jobs
- View applicants for each job

### 👤 Candidate / User
- Register & Login
- Browse all job listings
- Search & filter jobs
- Apply to jobs
- Save jobs to favourites
- View applied jobs
- View saved jobs

---

## ✨ Features Implemented

### Authentication
- JWT based login & registration
- Password hashing using bcrypt
- Role-based access control

### Jobs
- Admin can create, edit, delete jobs
- Public job listing
- Search by title, location, and job type

### Applications
- Candidates can apply to jobs
- Duplicate applications are prevented
- View all applied jobs (My Applications)

### Favourites
- Save jobs to favourites
- Remove saved jobs
- View saved jobs (My Favourites)

---

## 🗄️ Database Tables

- `users`
- `jobs`
- `applications`
- `favourites`

Relational integrity maintained using **foreign keys and JOIN queries**.

---

## 🔌 Backend API Routes

### Auth
- `POST /api/auth/register`
- `POST /api/auth/login`

### Jobs
- `POST /api/jobs` (Admin)
- `GET /api/jobs`
- `GET /api/jobs/:id`
- `PUT /api/jobs/:id` (Admin)
- `DELETE /api/jobs/:id` (Admin)

### Applications
- `POST /api/applications/:jobId`
- `GET /api/applications/my`

### Favourites
- `POST /api/favourites/:jobId`
- `DELETE /api/favourites/:jobId`
- `GET /api/favourites/my`

---

## 📂 Project Structure

### Backend

# MediCare+ | Hospital Management System

A comprehensive full-stack healthcare platform designed to streamline doctor appointments, hospital services management, and patient-doctor interactions. This project provides a robust solution for patients to discover specialists and book consultations, while offering a specialized dashboard for doctors to manage their practice.

## Project Overview

MediCare+ is built to modernize the traditional hospital booking experience. It features a seamless user interface for patients to search for doctors by specialty, view detailed professional profiles, and book appointments with real-time payment integration. On the flip side, it includes a dedicated management portal for doctors and administrators to oversee schedules, appointments, and service offerings.

## Folder Structure

- admin/ - Administrative dashboard for managing the platform.
- backend/ - Node.js and Express server with MongoDB integration.
  - controllers/ - Business logic for processing requests.
  - models/ - Data schemas for patients, doctors, and appointments.
  - routes/ - API endpoints for different features.
- frontend/ - Main patient-facing application built with React.
  - src/components/ - Shared interface elements.
  - src/pages/ - Main application views like Home and Appointments.
- README.md - Project documentation.

## Key Features

### For Patients
- Specialist Discovery: Browse and filter doctors across multiple specialties like Cardiology, Neurology, Pediatrics, and more.
- Service Booking: Direct booking for specialized hospital services such as Lab Tests, Surgery Consultations, and Diagnostic Imaging.
- Real-time Appointments: Intuitive booking flow with date and time selection.
- Secure Payments: Integrated with Stripe for safe and seamless transaction handling.
- Patient Portal: View and manage personal appointments and consultation history.

### For Doctors & Administrators
- Role-based Access: Secure authentication powered by Clerk for doctors and staff.
- Professional Dashboard: Overview of daily appointments, patient statistics, and schedule management.
- Profile Management: Doctors can update their professional information, availability, and consultation fees.
- Appointment Control: Accept or manage patient bookings directly through a dedicated admin interface.

## Tech Stack

### Frontend
- React.js: Modern component-based architecture for a responsive UI.
- Vite: Fast builds and optimized development environment.
- Tailwind CSS: Utility-first styling for a clean, professional, and mobile-friendly design.
- React Router: Client-side routing for seamless page transitions.
- Lucide React: High-quality vector iconography (used without external dependencies).

### Backend
- Node.js & Express: Scalable server-side logic and RESTful API development.
- MongoDB & Mongoose: NoSQL database for flexible and efficient data storage.
- Clerk Auth: Secure user authentication and session management.
- Stripe API: Financial infrastructure for handling online payments.
- Cloudinary: Cloud-based media management for storing doctor profiles and hospital assets.

## Installation and Setup

Follow these steps to set up the project locally on your machine.

### 1. Clone the Repository
```bash
git clone https://github.com/YourUsername/Hospital-Management-System.git
cd Hospital-Management-System
```

### 2. Install Dependencies
You need to install dependencies for the root project and each sub-module:

```bash
# Root directory
npm install

# Backend
cd backend && npm install

# Frontend (Patient App)
cd ../frontend && npm install

# Admin (Management App)
cd ../admin && npm install
```

### 3. Environment Configuration
Create a `.env` file in the `backend/` directory and add the following keys:

```env
PORT=4000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_random_secret_string
CLERK_SECRET_KEY=your_clerk_secret_key
CLERK_PUBLISHABLE_KEY=your_clerk_pub_key
STRIPE_SECRET_KEY=your_stripe_secret_key
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
FRONTEND_URL=http://localhost:5173
```

*Note: You will also need to set up Clerk environment variables in the `frontend` and `admin` folders (usually `VITE_CLERK_PUBLISHABLE_KEY`).*

### 4. Running the Project
To run the full system, you will need to open three terminal windows:

**Terminal 1: Backend API**
```bash
cd backend
node index.js
```

**Terminal 2:when i Patient Frontend**
```bash
cd frontend
npm run dev
```

**Terminal 3: Admin Dashboard**
```bash
cd admin
npm run dev
```

## Features Deep Dive
- **Automated Payments**: Uses Stripe Webhooks or Success/Cancel redirects to verify payment status before confirming appointments.
- **Image Management**: Integrated with Cloudinary for handling high-quality doctor profile images and hospital assets.
- **Secure Authentication**: Uses Clerk for modern, secure, and hassle-free user management.

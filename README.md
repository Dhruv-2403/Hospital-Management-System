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
git clone https://github.com/Dhruv-2403/Hospital-Management-System.git
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

## How the Application Works

### Architecture Overview
MediCare+ is a full-stack healthcare platform built with three main components: a patient-facing frontend application, an admin dashboard for doctors and administrators, and a backend API server. The frontend runs on port 5173, the admin panel on port 5174, and the backend API on port 4000. All three applications communicate with a MongoDB database for data storage and integrate with external services including Clerk for authentication, Stripe for payments, and Cloudinary for image storage.

### Application Flow

#### 1. Patient Journey (Frontend)
1. **Browse & Search**: Patients visit the homepage and browse doctors by specialty or search for specific services
2. **View Profiles**: Click on a doctor to view detailed profile including qualifications, experience, fees, and availability
3. **Book Appointment**: Select date and time slot, fill in patient details (name, age, gender, mobile)
4. **Payment**: Choose payment method (Cash/Online via Stripe)
5. **Confirmation**: Receive appointment confirmation with booking details
6. **Manage**: View and track appointments in the patient portal

#### 2. Doctor/Admin Journey (Admin Panel)
1. **Authentication**: Secure login using Clerk authentication
2. **Dashboard**: View statistics including total appointments, completed consultations, and revenue
3. **Manage Doctors**: Add new doctors with profiles, specializations, fees, and schedules
4. **Manage Services**: Add/edit hospital services (Lab Tests, X-Ray, Surgery Consultations, etc.)
5. **Appointments**: View all bookings, update status (Pending → Confirmed → Completed)
6. **Service Bookings**: Manage service-specific appointments separately

#### 3. Backend API Workflow

**Core API Endpoints:**
- `/api/doctors` - CRUD operations for doctor profiles
- `/api/appointments` - Handle patient appointment bookings
- `/api/services` - Manage hospital services
- `/api/service-appointments` - Service-specific bookings

**Data Models:**
- **Doctor**: Stores doctor info (name, specialization, fees, schedule, availability)
- **Appointment**: Patient bookings with doctor, date/time, payment status
- **Service**: Hospital services with pricing, slots, and availability
- **ServiceAppointment**: Bookings for specific services

**Authentication & Security:**
- Clerk middleware validates user sessions
- JWT tokens for API authentication
- Role-based access control for admin operations
- CORS enabled for cross-origin requests

**Payment Processing:**
1. Patient initiates booking with Stripe payment
2. Backend creates Stripe checkout session
3. Stripe redirects to success/cancel URL
4. Backend verifies payment and confirms appointment
5. Appointment status updated to "Confirmed" and "Paid"

**Image Management:**
- Doctor/service images uploaded via Multer middleware
- Images stored in Cloudinary cloud storage
- URLs saved in MongoDB for quick retrieval

### Technology Integration

**Frontend ↔ Backend Communication:**
- Axios for HTTP requests to REST API
- React Router for client-side navigation
- React Hot Toast for user notifications
- State management via React hooks

**Admin ↔ Backend Communication:**
- Similar REST API integration
- Clerk authentication for secure access
- Real-time data updates on dashboard

**Backend ↔ Database:**
- Mongoose ODM for MongoDB operations
- Schema validation and indexing
- Timestamps for audit trails

**External Services:**
- **Clerk**: Handles user authentication and session management
- **Stripe**: Processes online payments securely
- **Cloudinary**: Stores and delivers media assets

### Key Workflows

**Appointment Booking Flow:**
The patient selects a doctor from the listings, chooses an available date and time slot, fills in their personal details including name, age, gender, and mobile number, then initiates payment through Stripe. After successful payment via Stripe checkout, the backend verifies the transaction, confirms the booking, saves the appointment to MongoDB, and displays a confirmation message to the patient.

**Doctor Management Flow:**
An admin logs into the secure admin panel, navigates to the Add Doctor section, uploads a profile image which gets stored in Cloudinary, fills in the doctor's details including name, specialization, qualifications, experience, fees, and availability schedule. The backend validates all the information, saves it to MongoDB, and the doctor immediately appears in the patient-facing listings.

**Service Booking Flow:**
Patients browse available hospital services like Lab Tests or X-Ray scans, select a specific service, choose an available time slot, provide their contact details, make payment through Stripe, and upon successful payment, the backend confirms the booking, creates a service appointment record in the database, and displays a confirmation to the patient.

## Features Deep Dive
- **Automated Payments**: Uses Stripe Webhooks or Success/Cancel redirects to verify payment status before confirming appointments.
- **Image Management**: Integrated with Cloudinary for handling high-quality doctor profile images and hospital assets.
- **Secure Authentication**: Uses Clerk for modern, secure, and hassle-free user management.

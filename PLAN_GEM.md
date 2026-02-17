# Canteen Management System (CMS) - Execution Plan

This document outlines the detailed execution plan for the CMS project based on the Software Requirements Specification (SRS) v1.0.

## Phase 1: Foundation & Backend Setup
Goal: Establish the server-side infrastructure and database connectivity.

- [ ] **1.1 Backend Initialization**
    - [ ] Setup Node.js/Express environment.
    - [ ] Configure environment variables (.env) for database URI and secret keys.
    - [ ] Implement global error handling middleware.
- [ ] **1.2 Database Schema Design**
    - [ ] Create `User` schema (Admin credentials).
    - [ ] Create `MenuItem` schema (name, price, category, image, stockLevel, available).
    - [ ] Create `Order` schema (orderId, customerDetails, items, totalAmount, paymentStatus, qrCode, isRedeemed).
- [ ] **1.3 API Infrastructure**
    - [ ] Setup CORS and security headers (Helmet).
    - [ ] Implement logging (Morgan/Winston).

## Phase 2: Authentication & Security (Section 5.3)
Goal: Secure the Admin dashboard and protect data.

- [ ] **2.1 Admin Authentication**
    - [ ] Create Admin login endpoint (POST /api/auth/login).
    - [ ] Implement JWT (JSON Web Tokens) for session management.
    - [ ] Password hashing using bcrypt.
- [ ] **2.2 Frontend Auth Integration**
    - [ ] Create a Login page for Admins.
    - [ ] Implement Auth Context/State to manage login status.
    - [ ] Add protected routes to prevent unauthorized access to `/admin` and `/updatemenu`.

## Phase 3: Menu Management - Admin (Section 3.1)
Goal: Enable Admins to maintain the digital menu.

- [ ] **3.1 Menu CRUD Operations**
    - [ ] API: GET /menu (Public).
    - [ ] API: POST /menu (Admin only) - Add new dish.
    - [ ] API: PUT /menu/:id (Admin only) - Update price/details (REQ-2).
    - [ ] API: DELETE /menu/:id (Admin only).
- [ ] **3.2 Image Handling (REQ-1)**
    - [ ] Integrate Multer/Cloudinary for menu item image uploads.
    - [ ] Update frontend to support image selection in "Add/Update Item" dialogs.
- [ ] **3.3 Availability Toggle (REQ-3)**
    - [ ] API: PATCH /menu/:id/toggle (Admin only) - Toggle "Sold Out" status.
    - [ ] UI: Add toggle switch to the Update Menu cards.

## Phase 4: Customer Ordering & Payments (Section 3.2)
Goal: Facilitate order placement and secure transactions.

- [ ] **4.1 Shopping Cart Implementation**
    - [ ] Implement frontend state for the virtual cart.
    - [ ] Add "Add to Cart" and "Remove from Cart" functionality.
- [ ] **4.2 Checkout & Bill Calculation (REQ-4)**
    - [ ] Create Checkout page with order summary.
    - [ ] Implement tax calculation logic on the backend.
- [ ] **4.3 Payment Gateway Integration (REQ-5)**
    - [ ] Integrate a sandbox payment provider (Stripe or Razorpay).
    - [ ] Handle payment success/failure redirects and notifications.
    - [ ] Ensure no stock is deducted on failure.

## Phase 5: QR Receipt & Verification (Section 3.3 & 4.2)
Goal: Digitalize the fulfillment process.

- [ ] **5.1 QR Code Generation (REQ-6, REQ-7)**
    - [ ] Backend: Generate a unique hash/ID for every successful order.
    - [ ] Frontend: Use a library (e.g., `qrcode.react`) to display the QR code on the receipt page.
    - [ ] Ensure QR contains Order ID and summary.
- [ ] **5.2 Admin Verification Mode**
    - [ ] Create a "Scan & Verify" page for Admin.
    - [ ] Integrate `html5-qrcode` or similar for camera access (Section 4.2).
    - [ ] API: POST /api/orders/verify - Validate QR and mark order as "Fulfilled".
- [ ] **5.3 Order Invalidation (Safety 5.2)**
    - [ ] Logic to ensure a QR code can only be scanned once for fulfillment.

## Phase 6: Inventory & Real-time Updates (Section 3.4)
Goal: Automate stock management.

- [ ] **6.1 Automatic Stock Reduction (REQ-8)**
    - [ ] Hook into successful payment to decrement `stockLevel` in DB.
- [ ] **6.2 Out-of-Stock Logic (REQ-9, REQ-11)**
    - [ ] Disable "Add to Cart" if stock is 0.
    - [ ] Implement a check before payment to ensure items in cart are still available.
- [ ] **6.3 Real-time Synchronization**
    - [ ] Implement WebSockets (Socket.io) to push stock updates to all clients within 5 seconds (Section 5.1).
- [ ] **6.4 Manual Inventory Update (REQ-10)**
    - [ ] Add "Manage Stock" fields to the Admin dashboard.

## Phase 7: Non-Functional Requirements & Polish (Section 5)
Goal: Ensure quality, performance, and usability.

- [ ] **7.1 Responsive Refinement (Section 5.4)**
    - [ ] Audit all pages for "one-hand" operation (large buttons, bottom-aligned actions).
    - [ ] Verify layout on mobile, tablet, and desktop.
- [ ] **7.2 Error Handling & UI Feedback (Section 4.1)**
    - [ ] Implement the "standard red notification box" for all validation/API errors.
    - [ ] Add loading states (Spinners/Skeletons) for better UX.
- [ ] **7.3 Performance Optimization**
    - [ ] Optimize images for < 2s load time (Section 5.1).
    - [ ] Implement basic caching for the menu.
- [ ] **7.4 Documentation (Section 2.6)**
    - [ ] Draft the "How to Order" guide for customers.
    - [ ] Draft the Admin User Manual for QR scanning and menu management.

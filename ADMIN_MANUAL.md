# Canteen Management System - Admin Manual

This manual is for canteen staff and administrators to manage the menu, view orders, and verify pickups.

## Accessing the Admin Panel
1.  Navigate to `/admin/login`.
2.  Enter your credentials (default: `admin` / `password123` or as configured).
3.  Click **"Sign In"**.

## Dashboard Overview
The **Dashboard** gives you a quick snapshot of the canteen's performance:
- **Total Orders**: Number of order placed today.
- **Total Revenue**: Total earnings for the day.
- **Pending Orders**: Orders waiting to be fulfilled.
- **Active Orders List**: Listen for real-time incoming orders.

## Menu Management
Navigate to the **Menu** tab in the navigation bar.

### Adding a New Item
1.  Click **"Add New Item"**.
2.  Fill in the details: Name, Price, Category, Image URL, Stock Level.
3.  Ensure "Available" is toggled ON.
4.  Click **"Save"**.

### Editing an Item
1.  Find the item card.
2.  Click **"Edit"**.
3.  Modify the details (e.g., update price or stock).
4.  Click **"Save"**.

### Deleting an Item
1.  Click **"Delete"** on the item card.
2.  Confirm the action.

## Verifying Orders (Scanner)
Use this feature to verify student orders upon pickup.
1.  Navigate to the **Scanner** tab.
2.  Allow browser camera permissions if asked.
3.  Point the camera at the student's **QR Code**.
4.  The system will scan the code and display the **Order Details**.
5.  Verify the items and hand over the food.
6.  (Optional) Click "Mark as Completed" if implemented.

## Troubleshooting
- **Scanner not working?**: Ensure lighting is good and camera permissions are allowed.
- **Real-time updates not showing?**: Refresh the page to reconnect the socket.

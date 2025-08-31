# 📡 API Documentation - Morbid Gene Backend

A simple overview of the backend endpoints for the Morbid Gene 2.0 application.

**Base URL:** `http://localhost:8080` (development)

---

## 🔐 Authentication Endpoints

### `POST /auth/register`
Register new user.
```json
// Request
{
  "name": "John Doe",
  "email": "john@example.com", 
  "password": "password123"
}

// Response
{
  "message": "User registered successfully",
  "user": { "id": "...", "name": "John Doe", "email": "john@example.com" }
}
```

### `POST /auth/login`  
Login user.
```json
// Request
{
  "email": "john@example.com",
  "password": "password123"
}

// Response - Sets httpOnly cookie
{
  "message": "Login successful",
  "user": { "id": "...", "name": "John Doe", "email": "john@example.com" }
}
```

### `POST /auth/logout`
Logout user (requires auth cookie).

### `GET /auth/me`
Get current logged in user (requires auth cookie).

---

## 🛍️ Merchandise Endpoints (Spreadshirt API)

### `GET /api/merch/`
Get all products from Spreadshirt.
```json
// Response
{
  "products": [
    {
      "id": "prod_123",
      "name": "Morbid Gene T-Shirt", 
      "price": { "amount": 29.99, "currencyId": "EUR" },
      "previewImage": { "url": "https://..." }
    }
  ]
}
```

### `GET /api/merch/:productId`
Get specific product details.

### `GET /api/merch/productType/:productTypeId`  
Get sizes and colors for product type.

### `GET /api/merch/images/:sellableId/:appearanceId`
Get product images for specific color.

---

## 🛒 Shopping Cart (Basket) Endpoints

### `POST /api/merch/baskets`
Create new shopping basket at Spreadshirt.
```json
// Request
{
  "currencyId": "EUR",
  "countryId": "DE"
}

// Response  
{
  "basketId": "12345678-1234-1234-1234-123456789abc",
  "basketUrl": "https://morbidgene.myspreadshop.net/basket/..."
}
```

### `GET /api/merch/baskets/:basketId`
Get basket contents.

### `PUT /api/merch/baskets/:basketId`
Add/remove products from basket.
```json
// Request (add item)
{
  "action": "add",
  "basketItems": [
    {
      "sellableId": "123456789",
      "sizeId": "2", 
      "appearanceId": "1",
      "quantity": 1
    }
  ]
}
```

### `DELETE /api/merch/baskets/:basketId`
Clear basket.

### `GET /api/merch/baskets/:basketId/checkout`
Get checkout URL for purchase.

---

## 👤 User Management (Requires auth)

### `PUT /user/favorites`
Add/remove favorite products.
```json
// Request
{
  "action": "add", // or "remove"
  "productId": "prod_123456"
}
```

### `GET /user/favorites`
Get user's favorite products.

### `PUT /user/profile`
Update user profile.
```json
// Request
{
  "name": "New Name",
  "currentPassword": "old123", // for password change
  "newPassword": "new456"      // optional
}
```

---

## 📧 Contact Forms

### `POST /contact`
Send contact form.
```json
// Request
{
  "name": "Jane Doe",
  "email": "jane@example.com",
  "subject": "Question",
  "message": "Hello..."
}
```

### `POST /contact/booking`
Send booking request for gigs.
```json
// Request
{
  "name": "Event Organizer",
  "email": "organizer@venue.com", 
  "eventType": "Concert",
  "venue": "Stockholm Music Hall",
  "eventDate": "2024-06-15",
  "message": "We would like to book..."
}
```

---

## ⚙️ Admin Endpoints

### `POST /admin/cleanup`
Clean up old sessions and temporary data.

---

## 🔒 Authentication

**Authentication:** JWT tokens in httpOnly cookies
- Cookie name: `authToken`
- Set automatically on login
- Required for `/user/*` endpoints and logout

**Error responses:**
```json
{
  "message": "Error message",
  "status": 400/401/404/500
}
```

---

## 🔌 External Integrations

- **Spreadshirt API** - Handles all products and orders
- **Nodemailer** - Sends emails from contact forms  
- **MongoDB** - Users, sessions, favorites

**This backend serves as a proxy between the React frontend and Spreadshirt e-commerce system, plus handles user authentication and contact forms.**
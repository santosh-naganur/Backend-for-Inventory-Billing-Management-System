# Billing & Management System API Documentation

## Base URL
```
http://localhost:3000/api
```

## Authentication
All endpoints (except registration and login) require authentication via JWT token in the Authorization header:
```
Authorization: Bearer <your_jwt_token>
```

---

## Authentication Endpoints

### 1. Register User
**POST** `/auth/register`

**Request Body:**
```json
{
  "username": "john_doe",
  "email": "john@example.com",
  "password": "password123",
  "businessName": "John's Store"
}
```

**Response:**
```json
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "user": {
      "_id": "user_id",
      "username": "john_doe",
      "email": "john@example.com",
      "businessName": "John's Store",
      "isActive": true,
      "createdAt": "2024-01-01T00:00:00.000Z",
      "updatedAt": "2024-01-01T00:00:00.000Z"
    },
    "token": "jwt_token_here"
  }
}
```

### 2. Login User
**POST** `/auth/login`

**Request Body:**
```json
{
  "login": "john@example.com", // or username
  "password": "password123"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "user": {
      "_id": "user_id",
      "username": "john_doe",
      "email": "john@example.com",
      "businessName": "John's Store"
    },
    "token": "jwt_token_here"
  }
}
```

### 3. Logout User
**POST** `/auth/logout`

**Headers:** `Authorization: Bearer <token>`

**Response:**
```json
{
  "success": true,
  "message": "Logout successful"
}
```

---

## Products Endpoints

### 1. Get All Products
**GET** `/products`

**Query Parameters:**
- `page` (optional): Page number (default: 1)
- `limit` (optional): Items per page (default: 10, max: 100)
- `search` (optional): Search term
- `category` (optional): Filter by category
- `lowStock` (optional): Filter low stock items (true/false)

**Headers:** `Authorization: Bearer <token>`

**Response:**
```json
{
  "success": true,
  "data": {
    "products": [
      {
        "_id": "product_id",
        "name": "Laptop",
        "description": "High-performance laptop",
        "price": 999.99,
        "stock": 50,
        "category": "Electronics",
        "businessId": "business_id",
        "isActive": true,
        "createdAt": "2024-01-01T00:00:00.000Z",
        "updatedAt": "2024-01-01T00:00:00.000Z"
      }
    ],
    "pagination": {
      "currentPage": 1,
      "totalPages": 1,
      "totalProducts": 1,
      "hasNext": false,
      "hasPrev": false
    }
  }
}
```

### 2. Get Single Product
**GET** `/products/:id`

**Headers:** `Authorization: Bearer <token>`

### 3. Create Product
**POST** `/products`

**Request Body:**
```json
{
  "name": "Laptop",
  "description": "High-performance laptop",
  "price": 999.99,
  "stock": 50,
  "category": "Electronics"
}
```

**Headers:** `Authorization: Bearer <token>`

### 4. Update Product
**PUT** `/products/:id`

**Request Body:** (all fields optional)
```json
{
  "name": "Updated Laptop",
  "description": "Updated description",
  "price": 1099.99,
  "stock": 60,
  "category": "Electronics"
}
```

**Headers:** `Authorization: Bearer <token>`

### 5. Delete Product
**DELETE** `/products/:id`

**Headers:** `Authorization: Bearer <token>`

---

## Contacts Endpoints (Customers/Vendors)

### 1. Get All Contacts
**GET** `/contacts`

**Query Parameters:**
- `page` (optional): Page number
- `limit` (optional): Items per page
- `search` (optional): Search term
- `type` (optional): "customer" or "vendor"

**Headers:** `Authorization: Bearer <token>`

### 2. Get Single Contact
**GET** `/contacts/:id`

**Headers:** `Authorization: Bearer <token>`

### 3. Create Contact
**POST** `/contacts`

**Request Body:**
```json
{
  "name": "John Customer",
  "phone": "+1234567890",
  "email": "customer@example.com",
  "address": "123 Main St, City, State",
  "type": "customer" // or "vendor"
}
```

**Headers:** `Authorization: Bearer <token>`

### 4. Update Contact
**PUT** `/contacts/:id`

**Request Body:** (all fields optional)
```json
{
  "name": "Updated Name",
  "phone": "+0987654321",
  "email": "updated@example.com",
  "address": "456 New St, City, State",
  "type": "customer"
}
```

**Headers:** `Authorization: Bearer <token>`

### 5. Delete Contact
**DELETE** `/contacts/:id`

**Headers:** `Authorization: Bearer <token>`

---

## Transactions Endpoints

### 1. Get All Transactions
**GET** `/transactions`

**Query Parameters:**
- `page` (optional): Page number
- `limit` (optional): Items per page
- `type` (optional): "sale" or "purchase"
- `startDate` (optional): ISO 8601 date
- `endDate` (optional): ISO 8601 date
- `customerId` (optional): Customer ID
- `vendorId` (optional): Vendor ID

**Headers:** `Authorization: Bearer <token>`

### 2. Create Transaction
**POST** `/transactions`

**Request Body:**
```json
{
  "type": "sale", // or "purchase"
  "customerId": "customer_id", // required for sales
  "vendorId": "vendor_id", // required for purchases
  "products": [
    {
      "productId": "product_id",
      "quantity": 2,
      "price": 999.99
    }
  ],
  "notes": "Optional transaction notes"
}
```

**Headers:** `Authorization: Bearer <token>`

---

## Reports Endpoints

### 1. Inventory Report
**GET** `/reports/inventory`

**Query Parameters:**
- `category` (optional): Filter by category
- `lowStock` (optional): Filter low stock items
- `sortBy` (optional): "name", "stock", "price", "category"
- `sortOrder` (optional): "asc" or "desc"

**Headers:** `Authorization: Bearer <token>`

**Response:**
```json
{
  "success": true,
  "data": {
    "summary": {
      "totalProducts": 10,
      "totalStockValue": 50000,
      "lowStockProducts": 2,
      "outOfStockProducts": 0
    },
    "categorySummary": {
      "Electronics": {
        "count": 5,
        "totalStock": 100,
        "totalValue": 30000
      }
    },
    "products": [...]
  }
}
```

### 2. Transactions Report
**GET** `/reports/transactions`

**Query Parameters:**
- `type` (optional): "sale" or "purchase"
- `startDate` (optional): ISO 8601 date
- `endDate` (optional): ISO 8601 date
- `groupBy` (optional): "day", "week", "month"
- `customerId` (optional): Customer ID
- `vendorId` (optional): Vendor ID

**Headers:** `Authorization: Bearer <token>`

---

## Error Responses

All endpoints return consistent error responses:

```json
{
  "success": false,
  "message": "Error description",
  "errors": [
    {
      "field": "fieldName",
      "message": "Validation error message"
    }
  ]
}
```

**Common HTTP Status Codes:**
- `200`: Success
- `201`: Created
- `400`: Bad Request (validation errors)
- `401`: Unauthorized (invalid/missing token)
- `404`: Not Found
- `500`: Internal Server Error

---

## Testing with Postman

1. **Import the collection** (see Postman_Collection.json)
2. **Set up environment variables:**
   - `base_url`: `http://localhost:3000/api`
   - `token`: (will be set automatically after login)
3. **Start with registration/login** to get authentication token
4. **Test all endpoints** in the order provided

---

## Quick Start Guide

1. **Start the server:** `npm start`
2. **Register a new user** using POST `/auth/register`
3. **Login** using POST `/auth/login` and copy the token
4. **Set Authorization header** in Postman: `Bearer <your_token>`
5. **Create products, contacts, and transactions**
6. **Generate reports** to see your data

The server is now running on `http://localhost:3000` and ready for testing!

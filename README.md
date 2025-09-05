# Inventory & Billing Management System - Backend

A comprehensive backend system for small businesses to manage products, customers, vendors, and transactions with automatic stock tracking and reporting capabilities.

## Features

- **User Authentication**: JWT-based authentication with secure password hashing
- **Product Management**: CRUD operations with stock tracking and low stock alerts
- **Customer & Vendor Management**: Complete contact management system
- **Transaction Management**: Sales and purchase transactions with automatic stock updates
- **Reporting**: Comprehensive reports for inventory, sales, purchases, and analytics
- **Security**: Rate limiting, input validation, and secure middleware

## Tech Stack

- **Node.js** with Express.js
- **MongoDB** with Mongoose ODM
- **JWT** for authentication
- **bcryptjs** for password hashing
- **express-validator** for input validation
- **helmet** for security headers
- **express-rate-limit** for rate limiting

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (v4.4 or higher)
- npm or yarn

## Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd inventory-billing-backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   ```bash
   cp env.example .env
   ```
   
   Update the `.env` file with your configuration:
   ```env
   MONGODB_URI=mongodb://localhost:27017/inventory_billing
   JWT_SECRET=your_super_secret_jwt_key_here
   JWT_EXPIRE=7d
   PORT=3000
   NODE_ENV=development
   ```

4. **Start MongoDB**
   Make sure MongoDB is running on your system.

5. **Run the application**
   ```bash
   # Development mode
   npm run dev
   
   # Production mode
   npm start
   ```

The server will start on `http://localhost:3000` (or the port specified in your `.env` file).

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user info
- `POST /api/auth/logout` - Logout user

### Products
- `GET /api/products` - Get all products (with pagination, search, filters)
- `GET /api/products/:id` - Get single product
- `POST /api/products` - Create new product
- `PUT /api/products/:id` - Update product
- `DELETE /api/products/:id` - Delete product (soft delete)
- `PUT /api/products/:id/stock` - Update product stock

### Contacts (Customers & Vendors)
- `GET /api/contacts` - Get all contacts
- `GET /api/contacts/:id` - Get single contact
- `POST /api/contacts` - Create new contact
- `PUT /api/contacts/:id` - Update contact
- `DELETE /api/contacts/:id` - Delete contact (soft delete)
- `GET /api/contacts/customers` - Get all customers
- `GET /api/contacts/vendors` - Get all vendors

### Transactions
- `GET /api/transactions` - Get all transactions (with filters)
- `GET /api/transactions/:id` - Get single transaction
- `POST /api/transactions` - Create new transaction
- `PUT /api/transactions/:id/status` - Update transaction status
- `GET /api/transactions/customer/:customerId` - Get customer transactions
- `GET /api/transactions/vendor/:vendorId` - Get vendor transactions

### Reports
- `GET /api/reports/inventory` - Inventory report with stock levels
- `GET /api/reports/transactions` - Transaction reports with analytics
- `GET /api/reports/sales` - Sales report
- `GET /api/reports/purchases` - Purchases report
- `GET /api/reports/dashboard` - Dashboard summary data

## API Usage Examples

### Authentication

**Register a new user:**
```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "john_doe",
    "email": "john@example.com",
    "password": "password123",
    "businessName": "John\'s Store"
  }'
```

**Login:**
```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "login": "john@example.com",
    "password": "password123"
  }'
```

### Products

**Create a product:**
```bash
curl -X POST http://localhost:3000/api/products \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "name": "Laptop",
    "description": "High-performance laptop",
    "price": 999.99,
    "stock": 10,
    "category": "Electronics"
  }'
```

**Get products with filters:**
```bash
curl "http://localhost:3000/api/products?search=laptop&category=Electronics&lowStock=true&page=1&limit=10" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

### Transactions

**Create a sale transaction:**
```bash
curl -X POST http://localhost:3000/api/transactions \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "type": "sale",
    "customerId": "CUSTOMER_ID",
    "products": [
      {
        "productId": "PRODUCT_ID",
        "quantity": 2,
        "price": 999.99
      }
    ],
    "notes": "Customer purchase"
  }'
```

## Data Models

### User
```javascript
{
  username: String,
  email: String,
  password: String (hashed),
  businessName: String,
  isActive: Boolean,
  createdAt: Date,
  updatedAt: Date
}
```

### Product
```javascript
{
  name: String,
  description: String,
  price: Number,
  stock: Number,
  category: String,
  businessId: ObjectId,
  isActive: Boolean,
  createdAt: Date,
  updatedAt: Date
}
```

### Contact (Customer/Vendor)
```javascript
{
  name: String,
  phone: String,
  email: String,
  address: String,
  type: 'customer' | 'vendor',
  businessId: ObjectId,
  isActive: Boolean,
  createdAt: Date,
  updatedAt: Date
}
```

### Transaction
```javascript
{
  type: 'sale' | 'purchase',
  customerId: ObjectId (for sales),
  vendorId: ObjectId (for purchases),
  products: [{
    productId: ObjectId,
    quantity: Number,
    price: Number
  }],
  totalAmount: Number,
  date: Date,
  businessId: ObjectId,
  notes: String,
  status: 'pending' | 'completed' | 'cancelled',
  createdAt: Date,
  updatedAt: Date
}
```

## Security Features

- **JWT Authentication**: Secure token-based authentication
- **Password Hashing**: bcryptjs with salt rounds
- **Rate Limiting**: 100 requests per 15 minutes per IP
- **Input Validation**: Comprehensive validation using express-validator
- **Security Headers**: Helmet.js for security headers
- **CORS**: Configurable cross-origin resource sharing
- **Data Isolation**: Each business user manages their own data

## Error Handling

The API returns consistent error responses:

```javascript
{
  "success": false,
  "message": "Error description",
  "errors": [] // Validation errors (if any)
}
```

## Development

**Run in development mode:**
```bash
npm run dev
```

**Run tests:**
```bash
npm test
```

## Production Deployment

1. Set `NODE_ENV=production` in your environment
2. Use a strong JWT secret
3. Configure MongoDB connection string for production
4. Set up proper logging and monitoring
5. Use a process manager like PM2

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

MIT License - see LICENSE file for details.

## Support

For support and questions, please open an issue in the repository.

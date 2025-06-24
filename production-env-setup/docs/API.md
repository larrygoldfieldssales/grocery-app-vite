
# API Documentation

## Authentication

All authenticated endpoints require a valid session token.

### Auth Endpoints

#### Sign In
```http
POST /api/auth/signin
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123"
}
```

#### Sign Up
```http
POST /api/auth/signup
Content-Type: application/json

{
  "name": "John Doe",
  "email": "user@example.com",
  "password": "password123"
}
```

## Products

### Get Products
```http
GET /api/products?category=fruits&search=apple&page=1&limit=20&sortBy=price&order=asc&featured=true
```

**Query Parameters:**
- `category` (string): Filter by category ID
- `search` (string): Search in product name and description
- `page` (number): Page number (default: 1)
- `limit` (number): Items per page (default: 20)
- `sortBy` (string): Sort field (price, name, rating, createdAt)
- `order` (string): Sort order (asc, desc)
- `featured` (boolean): Show only featured products

**Response:**
```json
{
  "products": [
    {
      "_id": "...",
      "name": "Organic Apples",
      "description": "Fresh organic apples",
      "price": 3.99,
      "originalPrice": 4.99,
      "images": ["/products/apples.jpg"],
      "category": {
        "_id": "...",
        "name": "Fruits & Vegetables"
      },
      "unit": "per lb",
      "inStock": true,
      "rating": 4.5,
      "reviewCount": 89
    }
  ],
  "pagination": {
    "currentPage": 1,
    "totalPages": 5,
    "totalProducts": 100,
    "hasNextPage": true,
    "hasPrevPage": false
  }
}
```

### Get Single Product
```http
GET /api/products/[productId]
```

## Cart

### Get Cart
```http
GET /api/cart
Authorization: Bearer <token>
```

### Add to Cart
```http
POST /api/cart
Authorization: Bearer <token>
Content-Type: application/json

{
  "productId": "...",
  "quantity": 2,
  "price": 3.99
}
```

### Update Cart Item
```http
PUT /api/cart/items/[itemId]
Authorization: Bearer <token>
Content-Type: application/json

{
  "quantity": 3
}
```

### Remove from Cart
```http
DELETE /api/cart/items/[itemId]
Authorization: Bearer <token>
```

## Orders

### Get User Orders
```http
GET /api/orders
Authorization: Bearer <token>
```

### Create Order
```http
POST /api/orders
Authorization: Bearer <token>
Content-Type: application/json

{
  "deliveryAddress": {
    "street": "123 Main St",
    "city": "Anytown",
    "state": "CA",
    "postalCode": "12345",
    "country": "USA"
  },
  "deliveryInstructions": "Leave at door"
}
```

**Response:**
```json
{
  "order": {
    "_id": "...",
    "status": "pending",
    "total": 45.99,
    "estimatedDelivery": "2024-01-01T15:00:00Z"
  },
  "clientSecret": "pi_..."
}
```

### Get Order Details
```http
GET /api/orders/[orderId]
Authorization: Bearer <token>
```

## Categories

### Get Categories
```http
GET /api/categories
```

## Error Responses

All endpoints return consistent error responses:

```json
{
  "error": "Error message",
  "code": "ERROR_CODE",
  "details": "Additional error details"
}
```

### Common HTTP Status Codes

- `200` - Success
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `500` - Internal Server Error

## Rate Limiting

- Anonymous users: 100 requests per hour
- Authenticated users: 1000 requests per hour
- Admin users: 5000 requests per hour

## Webhooks

### Stripe Webhook
```http
POST /api/webhooks/stripe
Stripe-Signature: <signature>
```

Handles payment confirmation and order status updates.

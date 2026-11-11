
# E-commerce Product Catalog API

A RESTful API for managing products in an
e-commerce application.

## Technologies Used
- Node.js
- Express.js
- MongoDB
- Mongoose
- Postman

## Features
- Create products
- Retrieve all products
- Retrieve a single product
- Update products
- Delete products
- Input validation
- Error handling

## Live API
https://ecommerce-product-catalog-api-sup4.onrender.com

## API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| GET | /api/products | Get all products |
| GET | /api/products/:id | Get one product |
| POST | /api/products | Create product |
| PUT | /api/products/:id | Update product |
| DELETE | /api/products/:id | Delete product |

## Installation

1. Clone the repository.
2. Run npm install.
3. Create a .env file.
4. Add your MongoDB connection string.
5. Run npm start.

## Environment Variables

PORT=3000
MONGO_URI=your_mongodb_connection_string

## Testing
API endpoints were tested using Postman.

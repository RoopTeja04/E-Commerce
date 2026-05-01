# E-Commerce Microservices Project

This repository contains a full-stack e-commerce application built with a React frontend and multiple Node.js/Express backend services.  
The backend is split by domain (Auth, Products, Cart, Newsletter) and all services share a MongoDB database connection utility.

## Tech Stack

- Frontend: React 19, TypeScript, Vite, Zustand, Axios, React Router
- Backend: Node.js, Express, Mongoose, JWT, Nodemailer
- Database: MongoDB Atlas

## Project Structure

```text
E-Commerce/
  Client/                # React + TypeScript frontend
  AuthServer/            # Authentication, OTP, JWT + refresh token
  ProductsServer/        # Product catalog APIs
  CartServer/            # Cart APIs + inter-service calls to Auth/Products
  NewsLetterServer/      # Newsletter subscription + welcome email
  SharedDB/              # Shared MongoDB connection helper
  .env                   # Shared environment variables
```

## Architecture and Flow

### 1) Client application (`Client`)

- Uses `react-router-dom` for routes:
  - `/` home
  - `/product` product details
  - `/cart` cart
  - `/orders` orders placeholder
  - `/account` profile placeholder
  - `/login`, `/create-account`, `/verify-otp` auth screens
- Uses Zustand stores:
  - `AuthStore`: holds user/token state and refresh-token based session restore on app start
  - `CartStores`: cart count/items and add/remove actions
  - `ProductStroes`: single product and related products
- Uses Axios clients in `Client/src/Services/Api.tsx`:
  - `AuthAPI` -> `http://localhost:5000/auth`
  - `ProductAPI` -> `http://localhost:5001/products`
  - `NewsLetterAPI` -> `http://localhost:5002/newsletter`
  - `CartAPI` -> `http://localhost:5003/cart`
- Auth and cart Axios clients automatically attach access tokens and attempt token refresh on `401`.

### 2) Auth service (`AuthServer`)

- Handles registration/login with OTP email verification.
- Creates:
  - short-lived access token (`15m`)
  - refresh token (`7d`) stored in DB and HTTP-only cookie
- Core routes:
  - `POST /auth/register`
  - `POST /auth/verify-otp`
  - `POST /auth/login`
  - `POST /auth/resend-otp`
  - `POST /auth/refresh-token`
  - `GET /auth/find-user/:userId`

### 3) Products service (`ProductsServer`)

- Manages product catalog retrieval.
- Core routes:
  - `POST /products/add-products-in-bulk`
  - `GET /products/get-products-by-search`
  - `GET /products/get-products-by-id/:ProductId`
  - `GET /products/get-products-by-category`
  - `GET /products/get-total-categories`
  - `GET /products/get-related-products`
  - `POST /products/get-bulk-products` (used by cart service)

### 4) Cart service (`CartServer`)

- Protected by JWT middleware (`Authorization: Bearer <token>`).
- Stores `userId + productId` entries in cart collection.
- Validates product existence by calling Products service (`InterService.js`).
- Fetches full product details in bulk from Products service for cart page rendering.
- Core routes:
  - `POST /cart/add`
  - `GET /cart/get`
  - `DELETE /cart/delete/:productId`

### 5) Newsletter service (`NewsLetterServer`)

- Accepts subscriber email, prevents duplicates, stores subscriber, sends welcome mail.
- Core route:
  - `POST /newsletter/create-news-letter`

## End-to-End Request Flow Examples

### Sign-up and login flow

1. User registers from client (`/create-account`).
2. Auth service creates user with `TempEmail`, hashed password, OTP, expiry.
3. OTP is emailed via Nodemailer.
4. User verifies OTP (`/verify-otp`).
5. Auth service marks user verified, issues access + refresh tokens.
6. Client stores access token in Zustand; refresh token stays in cookie.
7. On access-token expiry, client calls `/auth/refresh-token` automatically through Axios interceptors.

### Add to cart flow

1. User clicks **Add to Cart** from category cards.
2. Client sends `POST /cart/add` with product ID and bearer token.
3. Cart service verifies token, checks product existence via Products service.
4. Cart item is created if not already present.
5. Cart count is refreshed from `GET /cart/get`.

### Cart page load flow

1. Client calls `GET /cart/get` with bearer token.
2. Cart service loads cart rows by user ID.
3. Cart service calls Products service `POST /products/get-bulk-products`.
4. Client receives full product list and renders cart UI.

## Environment Variables

Create a root `.env` file (already expected by all backend services):

```env
MONGO_URI=your_mongodb_uri
JWT_Token=your_access_token_secret
REFRESH_TOKEN_SECRET=your_refresh_token_secret

EMAIL_USER=your_email
EMAIL_PASS=your_email_app_password
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587

AuthServerPORT=5000
ProductsServerPORT=5001
NewsLetterServerPORT=5002
CartServerPORT=5003
```

## Local Setup

### Prerequisites

- Node.js 18+
- npm
- MongoDB Atlas connection string (or local MongoDB)

### Install dependencies

Run in each folder:

- `AuthServer`
- `ProductsServer`
- `CartServer`
- `NewsLetterServer`
- `Client`

```bash
npm install
```

### Run services (5 terminals)

```bash
cd AuthServer && npm run dev
cd ProductsServer && npm run dev
cd CartServer && npm run dev
cd NewsLetterServer && npm run dev
cd Client && npm run dev
```

Frontend: `http://localhost:5173`

## Health Endpoints

- `GET http://localhost:5000/healthz` (Auth)
- `GET http://localhost:5001/healthz` (Products)
- `GET http://localhost:5002/healthz` (Newsletter)
- `GET http://localhost:5003/healthz` (Cart)

## Notes and Known Gaps

- There is no API gateway; frontend calls each service directly.
- Cart and auth rely on consistent JWT secrets across services.
- Several response payloads and status codes are not fully standardized yet.
- `Orders` and profile/account features are currently placeholders on the frontend.
- Keep secrets out of version control (use local `.env` only; rotate leaked secrets if needed).

## Future Improvements

- Add API gateway / reverse proxy and centralized auth validation.
- Add role-based authorization and logout/invalidate refresh-token endpoint.
- Add input validation middleware and consistent error response format.
- Add unit/integration tests for each service.
- Add Docker Compose for one-command local startup.


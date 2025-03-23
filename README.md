## Tech Stack

- Node.js
- Express.js
- TypeScript
- Zod (for validation)
- bcryptjs (for password hashing)

## Project Structure

```
membership-api/
├── src/
│   ├── app.ts                # Main application entry point
│   ├── controllers/          # API routes and controllers
│   ├── middleware/           # Custom middleware (authentication, etc.)
│   ├── dtos/                 # Data Transfer Objects
│   ├── models/               # Data models
│   ├── service/              # Business logic
│   ├── schema/               # Validation schemas
│   ├── utils/                # Utility functions
│   └── data/                 # Seed Data Storage
├── node_modules/             # Dependencies
├── api.postman_collection.json  # Postman collection for API testing
└── package.json              # Project metadata and dependencies
```

## API Endpoints

| Method | Endpoint         | Description                 | Auth Required |
|--------|------------------|-----------------------------|---------------|
| POST   | /register        | Register a new user         | No            |
| POST   | /login           | Login and receive JWT token | No            |
| GET    | /profile         | Get user profile            | Yes           |
| POST   | /profile         | Update user profile         | Yes           |
| DELETE | /profile         | Delete user account         | Yes           |
| POST   | /change-password | Change user password        | Yes           |

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or pnpm

### Installation

1. Clone the repository
```bash
git clone https://github.com/starryskadi/opn-commerce-api
cd opn-commerce-api
```

2. Install dependencies
```bash
npm install
# or
pnpm install
```

3. Start the development server
```bash
npm run dev
# or
pnpm run dev
```

The API will be available at http://localhost:3000

### Build for Production

```bash
npm run build
npm start
# or
pnpm run build
pnpm start
```

## Testing the API

Import the included Postman collection (`api-dev.postman_collection.json`) to test all API endpoints.
Import the included Postman collection (`api-post.postman_collection.json`) to test all API endpoints.


## Available Users

The following test users are available for testing the API:

| Email | Password | Name | Gender |
|-------|----------|------|--------|
| somchai.wong@example.com | OneP@ssword1 | Somchai Wong | male |
| malai.suk@example.com | OneP@ssword1 | Malai Sukhothai | female |
| pranee.rat@example.com | OneP@ssword1 | Pranee Ratanakul | female |

## Production Url
https://bzt5zswfa3.ap-southeast-1.awsapprunner.com/

## Author

Kyaw Zayar Win
# Sugaryzer Backend Service
Backend service for Sugaryzer, sugar tracking in drinks application.

## Tech Stack
- **TypeScript**: Strongly typed JavaScript for safer and more reliable code.
- **Express**: Web framework for building APIs.
- **Prisma**: Modern ORM for PostgreSQL.
- **PostgreSQL**: Relational database.
- **Node.js**: JavaScript runtime environment.

## Tools
| Tool/Service          | Description                                                                 |
|-----------------------|-----------------------------------------------------------------------------|
| **NPM**               | Dependency manager for the project.                                          |
| **Nodemon**           | Automatically restarts the server on file changes during development.         |
| **Compute Engine**     | Google Cloud VM to host PostgreSQL.                                         |
| **Cloud Storage**      | Used to store files and media assets.                                       |
| **JWT**                | JSON Web Token for user authentication and authorization.                   |
| **Zod**                | Schema validation library for validating request bodies.                     |
| **ESLint**             | Linter to enforce code quality and consistency.                             |
| **Swagger**            | Auto-generates API documentation.                                           |
| **Google Cloud Platform** | Provides cloud infrastructure for hosting and file storage.              |

## Folder Structure
```
.
├── prisma/
│   └── schema.prisma
├── src/
│   ├── controllers/
│   │   ├── article-controller.ts
│   │   ├── products-controller.ts
│   │   └── ...
│   ├── docs/
│   │   ├── article-docs.ts
│   │   ├── products-docs.ts
│   │   └── ...
│   ├── error/
│   │   └── response-error.ts
│   ├── lib/
│   │   ├── cloud-storage.ts
│   │   └── db.ts
│   ├── middlewares/
│   │   ├── auth-middleware.ts
│   │   ├── file-middleware.ts
│   │   └── ...
│   ├── models/
│   │   ├── article-model.ts
│   │   ├── product-model.ts
│   │   └── ...
│   ├── repository/
│   │   ├── article-repository.ts
│   │   ├── product-repository.ts
│   │   └── ...
│   ├── routes/
│   │   ├── api.ts
│   │   └── public-route.ts
│   ├── service/
│   │   ├── article-service.ts
│   │   ├── product-service.ts
│   │   └── ...
│   ├── middlewares/
│   │   └── user-request.ts
│   ├── validation/
│   │   ├── article-validation.ts
│   │   ├── product-validation.ts
│   │   └── ...
│   └── index.ts
├── .env
├── .eslint.config.mjs
├── .gitignore
├── tsconfig.json
└── package.json
```

### Installation and Setup (LOCAL)
1. Clone this repository:
   ```bash
   git clone https://github.com/sugaryzer/Sugaryzer-be.git
3. Install dependencies:
   ```bash
   npm install
4. Make .env file and follow the .env.example, if you dont have ML server setup yet comment out the related URL
   - "/api/products/:productBarcode(\\d+)/recommendations"
   - "/api/products/scan"
   - "/api/users/current/analysis"
5. Run the application:
   ```bash
   npm run dev
6. Access the API at http://localhost:PORT.


## Scripts
- `npm run dev` Start the server with Nodemon for live reload.
- `npm run format`
- `npm run lint` Run ESLint to check for code quality issues.
- `npm run lint:fix`

## Response
```json
{
    "error": false,
    "message": "get data success",
    "result": { 
        "data": [
          {
            
          }
        ],
        "paging": {
          "size": 10,
          "total_page": 1,
          "current_page": 1
        }
    }
}
```

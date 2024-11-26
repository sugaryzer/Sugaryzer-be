import express from 'express';
import cors from './middleware/cors';
import dotenv from 'dotenv';
import { errorMiddleware } from './middleware/error-middleware';
import { apiRouter } from './route/api';
import { publicRouter } from './route/public-route';
import swaggerUi from 'swagger-ui-express';
import { swaggerSpec } from './docs/swagger';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use(publicRouter);
app.use(apiRouter);
app.use(errorMiddleware);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec))

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log(`Swagger docs available at http://localhost:${PORT}/api-docs`);
});
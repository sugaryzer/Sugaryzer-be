import express from 'express';
import cors from './middleware/cors';
import dotenv from 'dotenv';
import { publicRouter } from './route/public-route';
import { errorMiddleware } from './middleware/error-middleware';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(publicRouter);
app.use(errorMiddleware)

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
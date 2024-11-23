import express from 'express';
import cors from './middleware/cors';
import dotenv from 'dotenv';
import { errorMiddleware } from './middleware/error-middleware';
import { apiRouter } from './route/api';
import { publicRouter } from './route/public-route';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use(publicRouter);
app.use(apiRouter)
app.use(errorMiddleware)

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
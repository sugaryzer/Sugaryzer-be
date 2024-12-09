import cors from 'cors';

const corsMiddleware = () => {
  console.log('Running in environment:', process.env.NODE_ENV);
  if (process.env.NODE_ENV === 'development') {
    return cors(); // Allow all origins in development
  } else {
    return cors({
      origin: process.env.FRONT_URL, // Specific origin for production
      methods: ['GET', 'POST'],
      allowedHeaders: ['Content-Type']
    });
  }
};

export default corsMiddleware;

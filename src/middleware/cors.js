const cors = require('cors');

const corsMiddleware = () => {
  console.log('Running in environment:', process.env.NODE_ENV);
  if (process.env.NODE_ENV === 'development') {
    return cors(); // Allow all origins in development
  } else {
    return cors({
      origin: 'https://front.com', // Specific origin for production
      methods: ['GET', 'POST'],
      allowedHeaders: ['Content-Type']
    });
  }
};

module.exports = corsMiddleware;
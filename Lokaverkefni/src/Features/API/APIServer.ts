import dotenv from 'dotenv';
import API from './APIApp';

dotenv.config();

const PORT = process.env.PORT || 3000;
const FRONTEND_ORIGIN = process.env.FRONTEND_ORIGIN?.trim();

API.use((request, response, next) => {
  if (FRONTEND_ORIGIN) {
    response.setHeader("Access-Control-Allow-Origin", FRONTEND_ORIGIN);
    response.setHeader("Vary", "Origin");
    response.setHeader("Access-Control-Allow-Credentials", "true");
  } else {
    response.setHeader("Access-Control-Allow-Origin", "*");
  }

  response.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,PATCH,DELETE,OPTIONS");
  response.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization, X-Requested-With");

  if (request.method === "OPTIONS") {
    response.sendStatus(204);
    return;
  }

  next();
});

API.use((request, _response, next) => {
  const timestamp = new Date().toISOString();
  console.log(`${timestamp} ${request.method} ${request.originalUrl}`);
  if (request.method === 'POST' || request.method === 'PATCH') {
    console.log(request.body);
  }

  next();
});

API.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
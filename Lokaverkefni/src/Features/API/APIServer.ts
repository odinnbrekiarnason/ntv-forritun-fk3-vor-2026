import dotenv from 'dotenv';
import API from './APIApp';

dotenv.config();

const PORT = process.env.PORT || 3000;

API.use((request, _response, next) => {
  const timestamp = new Date().toISOString();
  console.log(`${timestamp} ${request.method} ${request.originalUrl}`);
  if (request.method === 'POST' || request.method === 'PATCH') {
    console.log(request.body);
  }

  next();
});

API.listen(Number(PORT), "0.0.0.0", () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
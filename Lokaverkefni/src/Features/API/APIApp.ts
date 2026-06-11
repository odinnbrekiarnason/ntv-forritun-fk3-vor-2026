import 'dotenv/config';
import express from "express";
import productRoutes from "./routes/productRoutes";
import orderRoutes from "./routes/orderRoutes";
import userRoutes from "./routes/userRoutes";
import { errorHandler } from "./middleware/APIErrorHandler";

const API = express();

API.use(express.json());

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

API.get("/", (_request, response) => {
	response.status(200).json({ status: "ok" });
});

API.get("/api/health", (_request, response) => {
  console.log("Health check endpoint hit");
	response.status(200).json({ status: "ok" });
});

API.use("/api/products", productRoutes);
API.use("/api/user", userRoutes);
API.use("/api/order", orderRoutes);

API.use(errorHandler);


export default API;
import express from "express";
import productRoutes from "./routes/productRoutes";
import orderRoutes from "./routes/orderRoutes";
import userRoutes from "./routes/userRoutes";
import cartRoutes from "./routes/cartRoutes";
import { errorHandler } from "./middleware/APIErrorHandler";

const API = express();

API.use(express.json());

API.get("/api/health", (_request, response) => {
  console.log("Health check endpoint hit");
	response.status(200).json({ status: "ok" });
});

API.use("/api/products", productRoutes);
API.use("/api/user", userRoutes);
API.use("/api/order", orderRoutes);
API.use("/api/cart", cartRoutes);

API.use(errorHandler);


export default API;
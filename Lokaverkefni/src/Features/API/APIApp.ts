import express from "express";
import productRoutes from "./Features/routes/productRoutes";
import clerkRoutes from "./Features/routes/clerkRoutes.ts";

const API = express();
API.use("/api/clerk", clerkRoutes);
API.use(express.json());


API.get("/api/health", (_request, response) => {
	console.log("Health check endpoint hit");
	response.status(200).json({ status: "ok" });
});

API.use("/api/products", productRoutes);

export default API;
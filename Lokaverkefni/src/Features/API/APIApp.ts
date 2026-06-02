import express from "express";
import productRoutes from "./Features/routes/productRoutes";

const API = express();
API.use(express.json());


API.get("/api/health", (request, response) => {
	console.log("Health check endpoint hit");
	response.status(200).json({ status: "ok" });
});

API.use("/api/products", productRoutes);

export default API;
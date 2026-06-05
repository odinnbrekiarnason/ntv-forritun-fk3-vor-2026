import express from "express";
import path from "node:path";
import { fileURLToPath } from "node:url";
import productRoutes from "./Features/routes/productRoutes";

const API = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const imagesDir = path.resolve(__dirname, "../../../public/images");

API.use(express.json());
API.use("/images", express.static(imagesDir));


API.get("/api/health", (_request, response) => {
  console.log("Health check endpoint hit");
	response.status(200).json({ status: "ok" });
});

API.use("/api/products", productRoutes);

export default API;
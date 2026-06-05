import express, { type NextFunction, type Request, type Response } from "express";
import db from "../../../../../config/db";

const router = express.Router();

router.get("/", async (_req: Request, res: Response, next: NextFunction) => {
	try {
		const products = await db.many(`
			SELECT id, type, productName, price, stock, description, img_url
			FROM products
			ORDER BY id ASC
		`);

    res.header("access-control-allow-origin", "*");

		res.status(200).json(products);
	} catch (error: unknown) {
		const message = error instanceof Error ? error.message : "Unknown database error";

		res.status(500).json({
			error: "Failed to fetch products",
			detail: message,
		});
    next(error);
	}
});

export default router;
import type { Request, Response, NextFunction } from "express";
import pool from "@config/db";
import { UseCartShop } from "@/Features/Front/Cart/Shop/CartShop";


export const inputToCart = (_req: Request, _res: Response, _next: NextFunction) => {
  const cartShop = UseCartShop();

  try {
    const items = cartShop.items;
    const user = cartShop.userId;
    const productId = items.map(item => item.productId);
    const quantity = items.map(item => item.quantity);

    const result = pool.none("INSERT INTO cart (user_id, product_id, quantity) VALUES ($1, $2, $3) RETURNING *", [user, productId, quantity]);

    if (!result) {
      console.log('FUCKED UP')
      _next();
    } else {
      _res.status(200).json({ message: "Item added to cart" });
    }
  } catch (e: any) {
    console.log(e.message);
    _next(e);
  }
}
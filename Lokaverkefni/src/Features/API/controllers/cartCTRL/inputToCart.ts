import type { Request, Response, NextFunction } from "express";
import pool from "@config/db";


export const inputToCart = async (_req: Request, _res: Response, _next: NextFunction) => {
  try {
    const { userId, productId, quantity } = _req.body as {
      userId: string;
      productId: string;
      quantity: number;
    };

    if (!userId || !productId || !Number.isInteger(quantity) || quantity < 1) {
      _res.status(400).json({ error: "userId, productId and quantity >= 1 are required" });
      return;
    }

    const result = await pool.one(
      `
      with cart_row as (
        insert into cart (user_id)
        values ($1)
        on conflict (user_id) do update set user_id = excluded.user_id
        returning id
      )
      insert into cart_items (cart_id, product_id, quantity)
      select id, $2, $3 from cart_row
      on conflict (cart_id, product_id)
      do update set quantity = cart_items.quantity + excluded.quantity
      returning cart_id, product_id, quantity
      `,
      [userId, productId, quantity],
    );

    _res.status(200).json({ message: "Item added to cart", item: result });
  } catch (e: any) {
    console.log(e.message);
    _next(e);
  }
}
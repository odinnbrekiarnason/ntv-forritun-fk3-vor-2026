import type { NextFunction, Request, Response } from "express";
import pool from "@config/db";

type OrderItemInput = {
  productId: string;
  quantity: number;
};

export const createOrder = async (_req: Request, _res: Response, _next: NextFunction) => {
  try {
    const { orderData, userId } = _req.body as {
      orderData: OrderItemInput[];
      userId: string;
    };

    if (!userId || !Array.isArray(orderData) || orderData.length === 0) {
      _res.status(400).json({ error: "userId and non-empty orderData are required" });
      return;
    }

    for (const item of orderData) {
      if (!item?.productId || !Number.isInteger(item.quantity) || item.quantity < 1) {
        _res.status(400).json({ error: "Each order item needs productId and quantity >= 1" });
        return;
      }
    }

    const userExists = await pool.oneOrNone("select clerk_uid from users where clerk_uid = $1", [userId]);
    if (!userExists) {
      _res.status(404).json({ error: "User not found" });
      return;
    }

    const order = await pool.tx(async (t) => {
      const newOrder = await t.one(
        "insert into orders (status, user_id) values ($1, $2) returning id",
        ["completed", userId],
      );

      for (const item of orderData) {
        const product = await t.oneOrNone("select id, price, stock from products where id = $1", [item.productId]);
        if (!product) {
          throw new Error(`Product not found: ${item.productId}`);
        }

        if (product.stock < item.quantity) {
          throw new Error(`Insufficient stock for product: ${item.productId}`);
        }
        await t.none("update products set stock = stock - $1 where id = $2", [item.quantity, item.productId]);

        await t.none(
          `
          insert into order_items (order_id, product_id, unit_price, quantity)
          values ($1, $2, $3, $4)
          `,
          [newOrder.id, item.productId, product.price, item.quantity],
        );
      }

      const total = await t.one(
        "select coalesce(sum(line_total), 0)::numeric(10,2) as total from order_items where order_id = $1",
        [newOrder.id],
      );

      await t.none(
        "update orders set total_price = $1, finished_at = current_timestamp where id = $2",
        [total.total, newOrder.id],
      );

      return { id: newOrder.id, totalPrice: total.total };
    });

    _res.status(201).json({ message: "Order created", order });
  } catch (e: any) {
    console.log(e.message);
    _next(e);
  }
};


export const getOrdersByUserId = async(_req: Request, _res: Response, _next: NextFunction) => {
  try{
    const { userId } = _req.params;
    console.log(`Fetching orders for userId: ${userId}`);

    if (!userId) {
      _res.status(400).json({ error: "userId is required" });
      return;
    }

    const userExists = await pool.oneOrNone("select clerk_uid from users where clerk_uid = $1", [userId]);
    if (!userExists) {
      _res.status(404).json({ error: "User not found" });
      return;
    }

    const order = await pool.manyOrNone(
      `
      select o.id as order_id, o.status, o.total_price, o.finished_at,
      coalesce(
        json_agg(
          json_build_object(
            'productId', oi.product_id,
            'name', p.product_name,
            'image', p.img_url,
            'type', p.type,
            'unitPrice', oi.unit_price,
            'quantity', oi.quantity
          )
        ) filter (where oi.product_id is not null),
        '[]'::json
      ) as items
      from orders o
      left join order_items oi on o.id = oi.order_id
      left join products p on p.id = oi.product_id
      where o.user_id = $1
      group by o.id, o.status, o.total_price, o.finished_at
      order by o.finished_at desc
      `,
      [userId]
    );

    _res.status(200).json({ orders: order });
  } catch(e: any) {
    console.log(e);
    _next(e);
  }
}

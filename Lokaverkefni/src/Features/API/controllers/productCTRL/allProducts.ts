import type { Product } from "@/Features/Front/Shared/Schemas/ProductsSchema";
import pool from "@config/db";
import type { NextFunction, Request, Response } from "express";

export const getAllProducts = async(_req: Request, _res: Response, _next: NextFunction) => {
  try{
    const {limit, offset} = _req.query as { limit?: string, offset?: string };

    const parsedLimit = limit ? parseInt(limit, 10) : 10;
    const parsedOffset = offset ? parseInt(offset, 10) : 0;

    const result = await pool.many('Select * from products limit $1 offset $2', [parsedLimit, parsedOffset]);

    if(!result) {
      _res.status(500).json({error: "Failed to retrieve products"});
       _next();
    }

    const parsedResult = result as Product[]

    _res.status(200).json(parsedResult);
  } catch(e: any) {
    console.log(e);
    _next(e);
  }
}


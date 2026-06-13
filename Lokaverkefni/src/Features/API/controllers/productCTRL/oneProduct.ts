import type { Product } from "@/Features/Front/Shared/Schemas/ProductsSchema";
import pool from "@config/db";
import type { NextFunction, Request, Response } from "express";

export const getProductById = async(req: Request, res: Response, next: NextFunction) => {
  try{
    const {id: prev} = req.params;

    if(!prev || typeof prev !== "string") {
      res.status(403).json({ error: "Invalid product ID" });
      next();
    } else {
      
      const result = await pool.oneOrNone('Select * from products where id = $1', [prev]);

      if(!result) {
        res.status(404).json({error: "Product not found"});
        next();
      }

      const parsedResult = result as Product;

      res.status(200).json(parsedResult);
    }
  } catch(e: any) {
    console.log(e.message);
    next(e);
  }
}
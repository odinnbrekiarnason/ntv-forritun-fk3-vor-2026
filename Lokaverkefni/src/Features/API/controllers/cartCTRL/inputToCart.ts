import type { Request, Response, NextFunction } from "express";
import pool from "@config/db";


export const inputToCart = (_req: Request, _res: Response, _next: NextFunction) => {
  try{
    const { productId, quantity } = _req.body;

    if(!productId || typeof productId !== "string" || !quantity || typeof quantity !== "number") {
      _res.status(400).json({error: "Invalid input"});
      _next();
    } else {
      
      
      _res.status(200).json({message: "Item added to cart"});
    }
    
  } catch(e: any) {
    console.log(e.message);
    _next(e);
  }
}
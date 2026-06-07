import pool from "@config/db";
import type { NextFunction, Request, Response } from "express";

export const getAllProducts = async(req: Request, res: Response, next: NextFunction) => {
  try{
    const result = await pool.many('Select * from products');

    if(!result) {
      res.status(500).json({error: "Failed to retrieve products"});
       next();
    }

    res.status(200).json(result);
  } catch(e: any) {
    console.log(e);
    next(e);
  }
}


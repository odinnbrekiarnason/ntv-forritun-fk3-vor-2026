import type {Request, Response, NextFunction} from "express";
import pool from "@config/db";
import { useUser } from "@clerk/react";

export const inputUserInDB = async(req: Request, res: Response, next: NextFunction) => {
  try{
    const user = useUser();

    if(!user || !user.user) {
      res.status(403).json({error: "User not authenticated"});
      next();
    } else {
      const {id, firstName, lastName, emailAddresses} = user.user; 
      const email = emailAddresses[0]?.emailAddress || "";

      const existingUser = await pool.oneOrNone('Select * from users where id = $1', [id]);

      if(existingUser) {
        res.status(403).json({error: "User already exists in database"});
        next();
      } else {
        const combo = firstName + " " + lastName;
        await pool.none('Insert into users (id, username, email, shop_role) values ($1, $2, $3, $4)', [id, combo, email, "user"]);
        res.status(200).json({message: "User inserted into database"});
      }
    }
  } catch(e: any) {
    console.log(e.message);
    next(e);
  }
}

export const getUserById = async(req: Request, res: Response, next: NextFunction) => {
  try{
    const {userId} = req.params;

    if(!userId || typeof userId !== "string") {
      res.status(403).json({error: "Invalid user ID"});
      next();
    } else {
      const result = await pool.oneOrNone('Select * from users where id = $1', [userId]);

    }


  } catch(e: any) {
    console.log(e.message);
    next(e);
  };
}
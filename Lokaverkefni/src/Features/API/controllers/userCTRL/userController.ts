import type {Request, Response, NextFunction} from "express";
import pool from "@config/db";
import { useUser } from "@clerk/react";

export const inputUserInDB = async(_req: Request, _res: Response, _next: NextFunction) => {
  try{
    const user = useUser();

    if(!user || !user.user) {
      _res.status(403).json({error: "User not authenticated"});
      _next();
    } else {
      const {id, firstName, lastName, emailAddresses} = user.user; 
      const email = emailAddresses[0]?.emailAddress || "";

      const existingUser = await pool.oneOrNone('Select * from users where id = $1', [id]);

      if(existingUser) {
        _res.status(403).json({error: "User already exists in database"});
        _next();
      } else {
        const combo = firstName + " " + lastName;
        await pool.none('Insert into users (id, username, email, shop_role) values ($1, $2, $3, $4)', [id, combo, email, "user"]);
        _res.status(200).json({message: "User inserted into database"});
      }
    }
  } catch(e: any) {
    console.log(e.message);
    _next(e);
  }
}

export const getUserById = async(_req: Request, _res: Response, _next: NextFunction) => {
  try{
    const {userId} = _req.params;

    if(!userId || typeof userId !== "string") {
      _res.status(403).json({error: "Invalid user ID"});
      _next();
    } else {
      const result = await pool.oneOrNone('Select * from users where id = $1', [userId]);
      if(!result) {
        _res.status(404).json({error: "User not found"});
        _next();
      } else {
        _res.status(200).json(result);
      }
    }
  } catch(e: any) {
    console.log(e.message);
    _next(e);
  };
}
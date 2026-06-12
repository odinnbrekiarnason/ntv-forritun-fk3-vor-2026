import type { Request, Response, NextFunction } from "express";
import pool from "@config/db";

export const inputUserInDB = async (_req: Request, _res: Response, _next: NextFunction) => {
  try {
    const payload = _req.body?.user ?? _req.body;
    const { clerk_uid, username, email } = payload;
    const firstname = (payload.firstname ?? payload.firstName ?? "").trim();

    if (!clerk_uid || !username || !email || !firstname) {
      _res.status(403).json({ error: "User not authenticated" });
      _next();
    } else {

      const existingUser = await pool.oneOrNone('Select * from users where clerk_uid = $1', [clerk_uid]);

      if (existingUser) {
        _res.status(403).json({ error: "User already exists in database" });
      } else {
        await pool.none(
          'Insert into users (clerk_uid, username, email, firstname) values ($1, $2, $3, $4)',
          [clerk_uid, username, email, firstname],
        );
        _res.status(200).json({ message: "User inserted into database" });
      }
    }
  } catch (e: any) {
    console.log(e.message);
    _next(e);
  }
}

export const getUserById = async (_req: Request, _res: Response, _next: NextFunction) => {
  try {
    const { userId } = _req.params;

    if (!userId || typeof userId !== "string") {
      _res.status(403).json({ error: "Invalid user ID" });
      _next();
    } else {
      const result = await pool.oneOrNone('Select * from users where clerk_uid = $1', [userId]);
      
      if (!result) {
        _res.status(404).json({ error: "User not found"});
      } else {
        _res.status(200).json(result);
      }
    }
  } catch (e: any) {
    console.log(e.message);
    _next(e);
  };
}
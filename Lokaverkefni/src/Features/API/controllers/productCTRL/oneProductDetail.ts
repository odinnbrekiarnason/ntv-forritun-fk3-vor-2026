import type { Request, Response, NextFunction } from "express";
import pool from "@config/db";


export const getProductDetails = async(req: Request, res: Response, next: NextFunction) => {
  try{
    const { id } = req.params as { id: string }; 
    const category = req.query.category as string | undefined;

    console.log(category);

    if(!id || typeof id !== "string" || !category || typeof category !== "string") {
      res.status(403).json({ error: "Invalid product ID or category" });
      return;
    }

    const normalizedCategory = category.trim().toLowerCase();
    console.log(normalizedCategory);
    let finalQuery = "";
    let specsTable = "";

    switch(normalizedCategory) {
      case "cpu": 
      finalQuery = `
      select p.*, row_to_json(cs) as specs
      from products p
      join cpu_specs cs on cs.product_id = p.id
      where p.id = $1 and p.type = 'CPU'
      `;
      specsTable = "cpu_specs";
      break;
      case "gpu":
      finalQuery = `
      select p.*, row_to_json(gs) as specs
      from products p
      join gpu_specs gs on gs.product_id = p.id
      where p.id = $1 and p.type = 'GPU'
      `;
      specsTable = "gpu_specs";
      break;
      case "motherboard":
      finalQuery = `
      select p.*, row_to_json(ms) as specs
      from products p
      join motherboard_specs ms on ms.product_id = p.id
      where p.id = $1 and p.type = 'Motherboard'
      `;
      specsTable = "motherboard_specs";
      break;
      case "ram":
      finalQuery = `
      select p.*, row_to_json(rs) as specs
      from products p
      join ram_specs rs on rs.product_id = p.id
      where p.id = $1 and p.type = 'RAM'
      `;
      specsTable = "ram_specs";
      break;
      case "storage":
      finalQuery = `
      select p.*, row_to_json(ss) as specs
      from products p
      join storage_specs ss on ss.product_id = p.id
      where p.id = $1 and p.type = 'Storage'
      `;
      specsTable = "storage_specs";
      break;
      case "power supply":
      case "psu":
      finalQuery = `
      select p.*, row_to_json(ps) as specs
      from products p
      join psu_specs ps on ps.product_id = p.id
      where p.id = $1 and p.type = 'Power Supply'
      `;
      specsTable = "psu_specs";
      break;
      case "cpu cooler":
      case "cooler":
      finalQuery = `
      select p.*, row_to_json(cs) as specs
      from products p
      join cpu_cooler_specs cs on cs.product_id = p.id
      where p.id = $1 and p.type = 'CPU Cooler'
      `;
      specsTable = "cpu_cooler_specs";
      break;
      default: {
        res.status(403).json({ error: "Invalid category" });
        return;
      }
    }

    const result = await pool.oneOrNone(finalQuery, [id]);

    if(!result) {
      res.status(404).json({error: "Product details not found"});
      return;
    }
    

    res.status(200).json(result);

  } catch(e: any) {
    console.log(e.message);
    next(e);
  }
}
import z from "zod";

export const ProductSchema = z.object({
  id: z.number().nonnegative().nonoptional('id Required'),
  type: z.string().nonempty().nonoptional('type Required'),
  price: z.number().nonnegative().nonoptional('price Required'),
  stock: z.number().nonnegative().nonoptional('stock Required'),
  description: z.string().nonempty().nonoptional('description Required'),
  img_url: z.string().nonempty().nonoptional('img_url Required'),
  product_name: z.string().nonempty().nonoptional('product_name Required'),
});

export type Product = z.infer<typeof ProductSchema>;
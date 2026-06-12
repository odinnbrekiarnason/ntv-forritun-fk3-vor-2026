import z from "zod";

export const ProductSchema = z.object({
  id: z.string().nonempty('id Required'),
  type: z.string().nonempty().nonoptional('type Required'),
  price: z.number().nonnegative().nonoptional('price Required'),
  stock: z.number().nonnegative().nonoptional('stock Required'),
  is_available: z.boolean().optional(),
  description: z.string().nonempty().nonoptional('description Required'),
  img_url: z.string().nonempty().nonoptional('img_url Required'),
  img_url2: z.string().nonempty().optional(),
  img_url3: z.string().nonempty().optional(),
  yt_review_url: z.string().nonempty().optional(),
  producer_id: z.string().optional(),
  product_name: z.string().nonempty().nonoptional('product_name Required'),
});

export type Product = z.infer<typeof ProductSchema>;
import z from 'zod';

export const OrderSchema = z.object({
  userId: z.string().nonempty('userId Required'),
  items: z.array(z.object({
    productId: z.string().nonempty('productId Required'),
    quantity: z.number().nonnegative().nonoptional('quantity Required'),
  })).nonempty('items Required'),
})
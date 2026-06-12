import z from 'zod';

export const OrderSchema = z.object({
  userId: z.string().nonempty('userId Required'),
  orderData: z.array(z.object({
    productId: z.string().nonempty('productId Required'),
    quantity: z.number().int().min(1, 'quantity Required'),
  })).nonempty('orderData Required'),
})
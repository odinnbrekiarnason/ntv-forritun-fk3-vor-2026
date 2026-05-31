import z from "zod";

export interface CartItemType {
  productId: string;
  quantity: number;
} 


export const cartSchema = z.object({
  userId: z.string().nonempty(),
  items: z.array(
    z.object({
      productId: z.string().nonempty(),
      quantity: z.number().min(1)
    })
  )
})

export interface CartShopType {
  userId: string,
  items: CartItemType[],
  addToCart: (productId: string, quantity: number) => void;
  changeQuantity: (productId: string) => void;
  clearCart: () => void;
}
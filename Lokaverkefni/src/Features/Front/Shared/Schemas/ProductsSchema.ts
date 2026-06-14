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

const GpuSpecsSchema = z.object({
  memory_type: z.string(),
  vram_gb: z.number(),
  boost_clock_mhz: z.number().nullable(),
  tdp_w: z.number().nullable(),
});

const CpuSpecsSchema = z.object({
  cpu_socket: z.string(),
  core_count: z.number(),
  thread_count: z.number(),
  base_clock_ghz: z.number().nullable(),
  boost_clock_ghz: z.number().nullable(),
  tdp_w: z.number().nullable(),
});

const MotherboardSpecsSchema = z.object({
  cpu_socket: z.string(),
  size: z.string(),
  ram_type: z.string(),
  ram_slots: z.number(),
  max_ram_gb: z.number(),
  chipset: z.string().nullable(),
});

const RamSpecsSchema = z.object({
  ddr_type: z.string(),
  total_capacity_gb: z.number(),
  module_count: z.number(),
  speed_mhz: z.number().nullable(),
});

const StorageSpecsSchema = z.object({
  storage_type: z.string(),
  interface_type: z.string(),
  capacity_gb: z.number(),
  form_factor: z.string().nullable(),
});

const PsuSpecsSchema = z.object({
  wattage: z.number(),
  modular_type: z.string().nullable(),
  form_factor: z.string().nullable(),
});

const CpuCoolerSpecsSchema = z.object({
  cooler_type: z.string(),
  radiator_mm: z.number().nullable(),
  fan_size_mm: z.number().nullable(),
});

export const ProductDetailSchema = z.discriminatedUnion("type", [
  ProductSchema.extend({ type: z.literal("GPU"), specs: GpuSpecsSchema.optional() }),
  ProductSchema.extend({ type: z.literal("CPU"), specs: CpuSpecsSchema.optional() }),
  ProductSchema.extend({ type: z.literal("Motherboard"), specs: MotherboardSpecsSchema.optional() }),
  ProductSchema.extend({ type: z.literal("RAM"), specs: RamSpecsSchema.optional() }),
  ProductSchema.extend({ type: z.literal("Storage"), specs: StorageSpecsSchema.optional() }),
  ProductSchema.extend({ type: z.literal("Power Supply"), specs: PsuSpecsSchema.optional() }),
  ProductSchema.extend({ type: z.literal("CPU Cooler"), specs: CpuCoolerSpecsSchema.optional() }),
]);

export type ProductDetail = z.infer<typeof ProductDetailSchema>;
export type GpuSpecs = z.infer<typeof GpuSpecsSchema>;
export type CpuSpecs = z.infer<typeof CpuSpecsSchema>;
export type MotherboardSpecs = z.infer<typeof MotherboardSpecsSchema>;
export type RamSpecs = z.infer<typeof RamSpecsSchema>;
export type StorageSpecs = z.infer<typeof StorageSpecsSchema>;
export type PsuSpecs = z.infer<typeof PsuSpecsSchema>;
export type CpuCoolerSpecs = z.infer<typeof CpuCoolerSpecsSchema>;

export type Product = z.infer<typeof ProductSchema>;


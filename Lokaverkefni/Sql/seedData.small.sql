BEGIN;

INSERT INTO category (name) VALUES
('GPU'),
('CPU'),
('Motherboard'),
('RAM'),
('Storage'),
('Power Supply'),
('CPU Cooler');

INSERT INTO producers (name) VALUES
('NVIDIA'),
('AMD'),
('Intel'),
('ASUS'),
('GIGABYTE'),
('Corsair'),
('G.Skill'),
('Samsung'),
('Western Digital'),
('ASRock'),
('be quiet!'),
('DEEPCOOL');

INSERT INTO products (
  type,
  product_name,
  price,
  stock,
  description,
  img_url,
  producer_id
)
SELECT
  'GPU',
  'GeForce RTX 5090',
  1999.99,
  4,
  'Ultra high-end flagship GPU for 4K and creator workloads',
  'https://placehold.co/1200x800/1f2937/ffffff?text=GPU+RTX+5090',
  p.id
FROM producers p
WHERE p.name = 'NVIDIA'
UNION ALL
SELECT
  'GPU',
  'Radeon RX 6600',
  219.99,
  14,
  'Value-focused GPU for esports and 1080p gaming',
  'https://placehold.co/1200x800/475569/ffffff?text=GPU+RX+6600',
  p.id
FROM producers p
WHERE p.name = 'AMD'
UNION ALL
SELECT
  'CPU',
  'Core i9-13900K',
  599.99,
  8,
  'High-end desktop CPU with strong gaming performance',
  'https://placehold.co/1200x800/1d4ed8/ffffff?text=CPU+Core+i9+13900K',
  p.id
FROM producers p
WHERE p.name = 'Intel'
UNION ALL
SELECT
  'CPU',
  'Ryzen 5 5600',
  129.99,
  18,
  'Excellent value 6-core CPU for mainstream builds',
  'https://placehold.co/1200x800/9a3412/ffffff?text=CPU+Ryzen+5+5600',
  p.id
FROM producers p
WHERE p.name = 'AMD'
UNION ALL
SELECT
  'Motherboard',
  'ROG Strix Z790',
  399.99,
  6,
  'Premium Intel motherboard for enthusiast systems',
  'https://placehold.co/1200x800/3f3f46/ffffff?text=Motherboard+ROG+Z790',
  p.id
FROM producers p
WHERE p.name = 'ASUS'
UNION ALL
SELECT
  'Motherboard',
  'B550M Steel Legend',
  119.99,
  12,
  'Affordable AM4 motherboard for budget and mid-tier PCs',
  'https://placehold.co/1200x800/52525b/ffffff?text=Motherboard+B550M+Steel+Legend',
  p.id
FROM producers p
WHERE p.name = 'ASRock'
UNION ALL
SELECT
  'RAM',
  'G.Skill Trident Z5 32GB DDR5',
  199.99,
  10,
  'High-speed DDR5 kit for performance builds',
  'https://placehold.co/1200x800/4c1d95/ffffff?text=RAM+GSkill+32GB+DDR5',
  p.id
FROM producers p
WHERE p.name = 'G.Skill'
UNION ALL
SELECT
  'RAM',
  'Corsair ValueSelect 8GB DDR4',
  29.99,
  26,
  'Low-cost memory for basic and office setups',
  'https://placehold.co/1200x800/581c87/ffffff?text=RAM+Corsair+8GB+DDR4',
  p.id
FROM producers p
WHERE p.name = 'Corsair'
UNION ALL
SELECT
  'Storage',
  'Samsung 990 PRO 2TB',
  229.99,
  6,
  'Top-tier NVMe SSD for fast game loads and content work',
  'https://placehold.co/1200x800/14532d/ffffff?text=Storage+Samsung+990+PRO+2TB',
  p.id
FROM producers p
WHERE p.name = 'Samsung'
UNION ALL
SELECT
  'Storage',
  'WD Green 480GB SATA SSD',
  39.99,
  20,
  'Entry-level SSD for OS and light app usage',
  'https://placehold.co/1200x800/1e40af/ffffff?text=Storage+WD+Green+480GB',
  p.id
FROM producers p
WHERE p.name = 'Western Digital'
UNION ALL
SELECT
  'Power Supply',
  'Corsair HX1000i Platinum',
  249.99,
  4,
  'High-end PSU for powerful enthusiast builds',
  'https://placehold.co/1200x800/854d0e/ffffff?text=PSU+Corsair+HX1000i',
  p.id
FROM producers p
WHERE p.name = 'Corsair'
UNION ALL
SELECT
  'Power Supply',
  'be quiet! 500W Bronze',
  69.99,
  14,
  'Budget PSU for everyday and school PCs',
  'https://placehold.co/1200x800/111827/ffffff?text=PSU+be+quiet+500W+Bronze',
  p.id
FROM producers p
WHERE p.name = 'be quiet!'
UNION ALL
SELECT
  'CPU Cooler',
  'DEEPCOOL LT720 360mm',
  169.99,
  5,
  'Premium AIO cooler for high-heat flagship CPUs',
  'https://placehold.co/1200x800/0e7490/ffffff?text=Cooler+DeepCool+LT720',
  p.id
FROM producers p
WHERE p.name = 'DEEPCOOL'
UNION ALL
SELECT
  'CPU Cooler',
  'DEEPCOOL AG400',
  29.99,
  16,
  'Budget tower cooler with solid value performance',
  'https://placehold.co/1200x800/155e75/ffffff?text=Cooler+DeepCool+AG400',
  p.id
FROM producers p
WHERE p.name = 'DEEPCOOL';

-- GPU specs
INSERT INTO gpu_specs (product_id, memory_type, vram_gb, boost_clock_mhz, tdp_w)
SELECT p.id, 'GDDR7', 32, 2407, 575 FROM products p WHERE p.product_name = 'GeForce RTX 5090'
UNION ALL
SELECT p.id, 'GDDR6', 8, 2491, 132 FROM products p WHERE p.product_name = 'Radeon RX 6600';

-- CPU specs
INSERT INTO cpu_specs (product_id, cpu_socket, core_count, thread_count, base_clock_ghz, boost_clock_ghz, tdp_w)
SELECT p.id, 'LGA1700', 24, 32, 3.00, 5.80, 125 FROM products p WHERE p.product_name = 'Core i9-13900K'
UNION ALL
SELECT p.id, 'AM4', 6, 12, 3.50, 4.40, 65 FROM products p WHERE p.product_name = 'Ryzen 5 5600';

-- Motherboard specs
INSERT INTO motherboard_specs (product_id, cpu_socket, size, ram_type, ram_slots, max_ram_gb, chipset)
SELECT p.id, 'LGA1700', 'ATX', 'DDR5', 4, 128, 'Z790' FROM products p WHERE p.product_name = 'ROG Strix Z790'
UNION ALL
SELECT p.id, 'AM4', 'MATX', 'DDR4', 4, 128, 'B550' FROM products p WHERE p.product_name = 'B550M Steel Legend';

-- RAM specs
INSERT INTO ram_specs (product_id, ddr_type, total_capacity_gb, module_count, speed_mhz)
SELECT p.id, 'DDR5', 32, 2, 6000 FROM products p WHERE p.product_name = 'G.Skill Trident Z5 32GB DDR5'
UNION ALL
SELECT p.id, 'DDR4', 8, 1, 2666 FROM products p WHERE p.product_name = 'Corsair ValueSelect 8GB DDR4';

-- Storage specs
INSERT INTO storage_specs (product_id, storage_type, interface_type, capacity_gb, form_factor)
SELECT p.id, 'NVMe SSD', 'PCIe 4.0', 2000, 'M.2' FROM products p WHERE p.product_name = 'Samsung 990 PRO 2TB'
UNION ALL
SELECT p.id, 'SATA SSD', 'SATA III', 480, '2.5"' FROM products p WHERE p.product_name = 'WD Green 480GB SATA SSD';

-- PSU specs
INSERT INTO psu_specs (product_id, wattage, modular_type, form_factor)
SELECT p.id, 1000, 'Fully Modular', 'ATX' FROM products p WHERE p.product_name = 'Corsair HX1000i Platinum'
UNION ALL
SELECT p.id, 500, 'Non-Modular', 'ATX' FROM products p WHERE p.product_name = 'be quiet! 500W Bronze';

-- CPU Cooler specs
INSERT INTO cpu_cooler_specs (product_id, cooler_type, radiator_mm, fan_size_mm)
SELECT p.id, 'AIO', 360, 120 FROM products p WHERE p.product_name = 'DEEPCOOL LT720 360mm'
UNION ALL
SELECT p.id, 'Air', NULL, 120 FROM products p WHERE p.product_name = 'DEEPCOOL AG400';

COMMIT;

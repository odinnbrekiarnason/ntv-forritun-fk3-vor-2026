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
  6,
  'Ultra high-end 4K gaming GPU with flagship performance',
  'https://placehold.co/1200x800/1f2937/ffffff?text=GPU+RTX+5090',
  p.id
FROM producers p
WHERE p.name = 'NVIDIA'
UNION ALL
SELECT
  'GPU',
  'GeForce RTX 4090',
  1499.99,
  10,
  'High-end gaming graphics card with 24GB GDDR6X',
  'https://placehold.co/1200x800/0f172a/ffffff?text=GPU+RTX+4090',
  p.id
FROM producers p
WHERE p.name = 'NVIDIA'
UNION ALL
SELECT
  'GPU',
  'Radeon RX 7900 XTX',
  999.99,
  15,
  'Powerful AMD Radeon graphics card',
  'https://placehold.co/1200x800/1e3a8a/ffffff?text=GPU+RX+7900+XTX',
  p.id
FROM producers p
WHERE p.name = 'AMD'
UNION ALL
SELECT
  'GPU',
  'GeForce RTX 4060',
  299.99,
  22,
  'Mid-range 1080p gaming GPU with efficient power draw',
  'https://placehold.co/1200x800/334155/ffffff?text=GPU+RTX+4060',
  p.id
FROM producers p
WHERE p.name = 'NVIDIA'
UNION ALL
SELECT
  'GPU',
  'Radeon RX 6600',
  219.99,
  24,
  'Budget-friendly graphics card for esports and entry gaming',
  'https://placehold.co/1200x800/475569/ffffff?text=GPU+RX+6600',
  p.id
FROM producers p
WHERE p.name = 'AMD'
UNION ALL
SELECT
  'CPU',
  'Ryzen 9 7950X',
  699.99,
  20,
  '16-core 32-thread flagship CPU',
  'https://placehold.co/1200x800/7c2d12/ffffff?text=CPU+Ryzen+9+7950X',
  p.id
FROM producers p
WHERE p.name = 'AMD'
UNION ALL
SELECT
  'CPU',
  'Core i9-13900K',
  599.99,
  25,
  '24-core hybrid architecture processor',
  'https://placehold.co/1200x800/1d4ed8/ffffff?text=CPU+Core+i9+13900K',
  p.id
FROM producers p
WHERE p.name = 'Intel'
UNION ALL
SELECT
  'CPU',
  'Ryzen 5 5600',
  129.99,
  30,
  'Great value 6-core CPU for gaming and school builds',
  'https://placehold.co/1200x800/9a3412/ffffff?text=CPU+Ryzen+5+5600',
  p.id
FROM producers p
WHERE p.name = 'AMD'
UNION ALL
SELECT
  'CPU',
  'Core i3-12100F',
  99.99,
  32,
  'Entry-level CPU with strong single-core performance',
  'https://placehold.co/1200x800/2563eb/ffffff?text=CPU+Core+i3+12100F',
  p.id
FROM producers p
WHERE p.name = 'Intel'
UNION ALL
SELECT
  'Motherboard',
  'ROG Strix Z790',
  399.99,
  10,
  'Premium Z790 gaming motherboard',
  'https://placehold.co/1200x800/3f3f46/ffffff?text=Motherboard+ROG+Z790',
  p.id
FROM producers p
WHERE p.name = 'ASUS'
UNION ALL
SELECT
  'Motherboard',
  'X670 AORUS',
  499.99,
  15,
  'High-end X670E motherboard for AMD Ryzen',
  'https://placehold.co/1200x800/27272a/ffffff?text=Motherboard+X670+AORUS',
  p.id
FROM producers p
WHERE p.name = 'GIGABYTE'
UNION ALL
SELECT
  'Motherboard',
  'B550M Steel Legend',
  119.99,
  20,
  'Affordable AM4 motherboard for value-focused builds',
  'https://placehold.co/1200x800/52525b/ffffff?text=Motherboard+B550M+Steel+Legend',
  p.id
FROM producers p
WHERE p.name = 'ASRock'
UNION ALL
SELECT
  'RAM',
  'Corsair Vengeance 16GB DDR4 3200',
  89.99,
  20,
  '16GB (2x8GB) DDR4 3200MHz',
  'https://placehold.co/1200x800/7f1d1d/ffffff?text=RAM+Corsair+16GB+DDR4',
  p.id
FROM producers p
WHERE p.name = 'Corsair'
UNION ALL
SELECT
  'RAM',
  'G.Skill Trident Z5 32GB DDR5',
  199.99,
  15,
  '32GB (2x16GB) DDR5 6000MHz RGB',
  'https://placehold.co/1200x800/4c1d95/ffffff?text=RAM+GSkill+32GB+DDR5',
  p.id
FROM producers p
WHERE p.name = 'G.Skill'
UNION ALL
SELECT
  'RAM',
  'Corsair Dominator 64GB DDR5',
  349.99,
  10,
  'High-capacity premium DDR5 kit for power users',
  'https://placehold.co/1200x800/6d28d9/ffffff?text=RAM+Corsair+64GB+DDR5',
  p.id
FROM producers p
WHERE p.name = 'Corsair'
UNION ALL
SELECT
  'RAM',
  'G.Skill Ripjaws 16GB DDR4',
  54.99,
  28,
  'Budget 16GB DDR4 memory kit for mainstream PCs',
  'https://placehold.co/1200x800/7e22ce/ffffff?text=RAM+GSkill+16GB+DDR4',
  p.id
FROM producers p
WHERE p.name = 'G.Skill'
UNION ALL
SELECT
  'RAM',
  'Corsair ValueSelect 8GB DDR4',
  29.99,
  40,
  'Low-cost single-stick memory for entry-level systems',
  'https://placehold.co/1200x800/581c87/ffffff?text=RAM+Corsair+8GB+DDR4',
  p.id
FROM producers p
WHERE p.name = 'Corsair'
UNION ALL
SELECT
  'Storage',
  'Samsung 990 PRO 2TB',
  229.99,
  12,
  'Flagship PCIe 4.0 NVMe SSD with very high throughput',
  'https://placehold.co/1200x800/14532d/ffffff?text=Storage+Samsung+990+PRO+2TB',
  p.id
FROM producers p
WHERE p.name = 'Samsung'
UNION ALL
SELECT
  'Storage',
  'Samsung 970 EVO 1TB',
  149.99,
  10,
  '1TB NVMe PCIe 3.0 SSD',
  'https://placehold.co/1200x800/166534/ffffff?text=Storage+Samsung+970+EVO+1TB',
  p.id
FROM producers p
WHERE p.name = 'Samsung'
UNION ALL
SELECT
  'Storage',
  'Samsung 870 EVO 1TB',
  89.99,
  18,
  'Reliable SATA SSD for older systems and mass storage',
  'https://placehold.co/1200x800/15803d/ffffff?text=Storage+Samsung+870+EVO+1TB',
  p.id
FROM producers p
WHERE p.name = 'Samsung'
UNION ALL
SELECT
  'Storage',
  'WD Black SN850X 2TB',
  199.99,
  14,
  'High-end PCIe 4.0 SSD tuned for gaming workloads',
  'https://placehold.co/1200x800/1e3a8a/ffffff?text=Storage+WD+SN850X+2TB',
  p.id
FROM producers p
WHERE p.name = 'Western Digital'
UNION ALL
SELECT
  'Storage',
  'WD Blue 2TB HDD',
  79.99,
  15,
  '2TB 3.5" SATA HDD',
  'https://placehold.co/1200x800/1d4ed8/ffffff?text=Storage+WD+Blue+2TB+HDD',
  p.id
FROM producers p
WHERE p.name = 'Western Digital'
UNION ALL
SELECT
  'Storage',
  'WD Green 480GB SATA SSD',
  39.99,
  35,
  'Low-cost SSD for boot drives and office PCs',
  'https://placehold.co/1200x800/1e40af/ffffff?text=Storage+WD+Green+480GB',
  p.id
FROM producers p
WHERE p.name = 'Western Digital'
UNION ALL
SELECT
  'Power Supply',
  'Corsair HX1000i Platinum',
  249.99,
  8,
  'Premium 1000W PSU for enthusiast multi-GPU systems',
  'https://placehold.co/1200x800/854d0e/ffffff?text=PSU+Corsair+HX1000i',
  p.id
FROM producers p
WHERE p.name = 'Corsair'
UNION ALL
SELECT
  'Power Supply',
  'ASRock 850W Gold',
  129.99,
  10,
  '850W 80+ Gold Fully Modular',
  'https://placehold.co/1200x800/b45309/ffffff?text=PSU+ASRock+850W+Gold',
  p.id
FROM producers p
WHERE p.name = 'ASRock'
UNION ALL
SELECT
  'Power Supply',
  'be quiet! 500W Bronze',
  69.99,
  15,
  'Entry-level 500W 80+ Bronze power supply for budget PCs',
  'https://placehold.co/1200x800/111827/ffffff?text=PSU+be+quiet+500W+Bronze',
  p.id
FROM producers p
WHERE p.name = 'be quiet!'
UNION ALL
SELECT
  'CPU Cooler',
  'DEEPCOOL LT720 360mm',
  169.99,
  9,
  'High-performance 360mm AIO cooler for flagship CPUs',
  'https://placehold.co/1200x800/0e7490/ffffff?text=Cooler+DeepCool+LT720',
  p.id
FROM producers p
WHERE p.name = 'DEEPCOOL'
UNION ALL
SELECT
  'CPU Cooler',
  'be quiet! Dark Rock Pro 4',
  89.99,
  10,
  'Dual-tower air cooler',
  'https://placehold.co/1200x800/334155/ffffff?text=Cooler+Dark+Rock+Pro+4',
  p.id
FROM producers p
WHERE p.name = 'be quiet!'
UNION ALL
SELECT
  'CPU Cooler',
  'DeepCool Castle 360',
  159.99,
  15,
  '360mm AIO liquid cooler',
  'https://placehold.co/1200x800/0891b2/ffffff?text=Cooler+DeepCool+Castle+360',
  p.id
FROM producers p
WHERE p.name = 'DEEPCOOL'
UNION ALL
SELECT
  'CPU Cooler',
  'DEEPCOOL AG400',
  29.99,
  28,
  'Budget air cooler suitable for entry and mid-range CPUs',
  'https://placehold.co/1200x800/155e75/ffffff?text=Cooler+DeepCool+AG400',
  p.id
FROM producers p
WHERE p.name = 'DEEPCOOL';

COMMIT;

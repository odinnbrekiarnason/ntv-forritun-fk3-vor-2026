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
  'GeForce RTX 4090',
  1499.99,
  10,
  'High-end gaming graphics card with 24GB GDDR6X',
  'https://images.nvidia.com/aem-dam/Solutions/geforce/ada/rtx-4090/geforce-rtx-4090-product-gallery-thumbnail-267-1.jpg',
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
  'https://www.amd.com/content/dam/amd/en/images/products/graphics/2648997-amd-radeon-7900xtx.jpg',
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
  'https://www.amd.com/content/dam/amd/en/images/products/cpu/ryzen-9-7950x/ryzen-9-7950x-product-gallery-thumbnail-267-1.jpg',
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
  'https://www.intel.com/content/dam/www/public/us/en/images/product/13th-gen-core/i9-13900k-processor-hero-600.jpg',
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
  'https://www.asus.com/media/global/products/ROG_Strix_Z790/ROG_Strix_Z790_Product_Image.jpg',
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
  'https://www.gigabyte.com/Motherboard/X670-AORUS-ELITE-AX-rev-10#kf',
  p.id
FROM producers p
WHERE p.name = 'GIGABYTE'
UNION ALL
SELECT
  'RAM',
  'Corsair Vengeance 16GB DDR4',
  89.99,
  20,
  '16GB (2x8GB) DDR4 3200MHz',
  'https://assets.corsair.com/image/upload/c_pad,q_85,h_926,w_926,f_auto/products/Memory/CMW16GX4M2C3200C16/Gallery/Vengeance_RGB_Pro_01.webp',
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
  'https://placehold.co/1200x800/7c3aed/ffffff?text=G.Skill+Trident+Z5+32GB',
  p.id
FROM producers p
WHERE p.name = 'G.Skill'
UNION ALL
SELECT
  'Storage',
  'Samsung 970 EVO 1TB',
  149.99,
  10,
  '1TB NVMe PCIe 3.0 SSD',
  'https://placehold.co/1200x800/14532d/ffffff?text=Samsung+970+EVO+1TB',
  p.id
FROM producers p
WHERE p.name = 'Samsung'
UNION ALL
SELECT
  'Storage',
  'WD Blue 2TB HDD',
  79.99,
  15,
  '2TB 3.5" SATA HDD',
  'https://placehold.co/1200x800/1e3a8a/ffffff?text=WD+Blue+2TB+HDD',
  p.id
FROM producers p
WHERE p.name = 'Western Digital'
UNION ALL
SELECT
  'Power Supply',
  'ASRock 850W Gold',
  129.99,
  10,
  '850W 80+ Gold Fully Modular',
  'https://placehold.co/1200x800/b45309/ffffff?text=ASRock+850W+Gold',
  p.id
FROM producers p
WHERE p.name = 'ASRock'
UNION ALL
SELECT
  'Power Supply',
  'be quiet! 750W Platinum',
  149.99,
  15,
  '750W 80+ Platinum Fully Modular',
  'https://placehold.co/1200x800/111827/ffffff?text=be+quiet%21+750W+Platinum',
  p.id
FROM producers p
WHERE p.name = 'be quiet!'
UNION ALL
SELECT
  'CPU Cooler',
  'be quiet! Dark Rock Pro 4',
  89.99,
  10,
  'Dual-tower air cooler',
  'https://placehold.co/1200x800/334155/ffffff?text=Dark+Rock+Pro+4',
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
  'https://placehold.co/1200x800/0891b2/ffffff?text=DeepCool+Castle+360',
  p.id
FROM producers p
WHERE p.name = 'DEEPCOOL';

COMMIT;

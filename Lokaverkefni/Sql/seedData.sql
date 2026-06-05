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

INSERT INTO products (type, productName, price, stock, description, img_url, producer_id, category_id)
SELECT
    'GPU',
    'GeForce RTX 4090',
    1499.99,
    10,
    'High-end gaming graphics card with 24GB GDDR6X',
    'http://localhost:3000/images/rtx4090.jpg',
    p.id,
    c.id
FROM producers p, category c 
WHERE p.name = 'NVIDIA' AND c.name = 'GPU'

UNION ALL

SELECT
    'GPU',
    'Radeon RX 7900 XTX',
    999.99,
    15,
    'Powerful AMD Radeon graphics card',
    'http://localhost:3000/images/rx7900xtx.jpg',
    p.id,
    c.id
FROM producers p, category c 
WHERE p.name = 'AMD' AND c.name = 'GPU'

UNION ALL

SELECT
    'CPU',
    'Ryzen 9 7950X',
    699.99,
    20,
    '16-core 32-thread flagship CPU',
    'http://localhost:3000/images/ryzen97950x.jpg',
    p.id,
    c.id
FROM producers p, category c 
WHERE p.name = 'AMD' AND c.name = 'CPU'

UNION ALL

SELECT
    'CPU',
    'Core i9-13900K',
    599.99,
    25,
    '24-core hybrid architecture processor',
    'http://localhost:3000/images/i913900k.jpg',
    p.id,
    c.id
FROM producers p, category c 
WHERE p.name = 'Intel' AND c.name = 'CPU'

UNION ALL

SELECT
    'Motherboard',
    'ROG Strix Z790',
    399.99,
    10,
    'Premium Z790 gaming motherboard',
    'http://localhost:3000/images/rogstrixz790.jpg',
    p.id,
    c.id
FROM producers p, category c 
WHERE p.name = 'ASUS' AND c.name = 'Motherboard'

UNION ALL

SELECT
    'Motherboard',
    'X670 AORUS',
    499.99,
    15,
    'High-end X670E motherboard for AMD Ryzen',
    'http://localhost:3000/images/x670aorus.jpg',
    p.id,
    c.id
FROM producers p, category c 
WHERE p.name = 'GIGABYTE' AND c.name = 'Motherboard'

UNION ALL

SELECT
    'RAM',
    'Corsair Vengeance 16GB DDR4',
    89.99,
    20,
    '16GB (2x8GB) DDR4 3200MHz',
    'http://localhost:3000/images/corsairvengeance.jpg',
    p.id,
    c.id
FROM producers p, category c 
WHERE p.name = 'Corsair' AND c.name = 'RAM'

UNION ALL

SELECT
    'RAM',
    'G.Skill Trident Z5 32GB DDR5',
    199.99,
    15,
    '32GB (2x16GB) DDR5 6000MHz RGB',
    'http://localhost:3000/images/gskilltrident.jpg',
    p.id,
    c.id
FROM producers p, category c 
WHERE p.name = 'G.Skill' AND c.name = 'RAM'

UNION ALL

SELECT
    'Storage',
    'Samsung 970 EVO 1TB',
    149.99,
    10,
    '1TB NVMe PCIe 3.0 SSD',
    'http://localhost:3000/images/samsung970evo.jpg',
    p.id,
    c.id
FROM producers p, category c 
WHERE p.name = 'Samsung' AND c.name = 'Storage'

UNION ALL

SELECT
    'Storage',
    'WD Blue 2TB HDD',
    79.99,
    15,
    '2TB 3.5" SATA HDD',
    'http://localhost:3000/images/wdblue2tb.jpg',
    p.id,
    c.id
FROM producers p, category c 
WHERE p.name = 'Western Digital' AND c.name = 'Storage'

UNION ALL

SELECT
    'Power Supply',
    'ASRock 850W Gold',
    129.99,
    10,
    '850W 80+ Gold Fully Modular',
    'http://localhost:3000/images/asrock850w.jpg',
    p.id,
    c.id
FROM producers p, category c 
WHERE p.name = 'ASRock' AND c.name = 'Power Supply'

UNION ALL

SELECT
    'Power Supply',
    'be quiet! 750W Platinum',
    149.99,
    15,
    '750W 80+ Platinum Fully Modular',
    'http://localhost:3000/images/bequiet750w.jpg',
    p.id,
    c.id
FROM producers p, category c 
WHERE p.name = 'be quiet!' AND c.name = 'Power Supply'

UNION ALL

SELECT
    'CPU Cooler',
    'be quiet! Dark Rock Pro 4',
    89.99,
    10,
    'Dual-tower air cooler',
    'http://localhost:3000/images/darkrockpro4.jpg',
    p.id,
    c.id
FROM producers p, category c 
WHERE p.name = 'be quiet!' AND c.name = 'CPU Cooler'

UNION ALL

SELECT
    'CPU Cooler',
    'DeepCool Castle 360',
    159.99,
    15,
    '360mm AIO liquid cooler',
    'http://localhost:3000/images/deepcoolcastle360.jpg',
    p.id,
    c.id
FROM producers p, category c 
WHERE p.name = 'DEEPCOOL' AND c.name = 'CPU Cooler';
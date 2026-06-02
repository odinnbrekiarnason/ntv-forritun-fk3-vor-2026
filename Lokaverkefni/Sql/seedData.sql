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

INSERT INTO products (type, price, stock, description, img_url, producer_id, category_id)
SELECT
    'GPU',
    1499.99,
    10,
    'High-end gaming graphics card with 24GB GDDR6X',
    'https://example.com/images/rtx4090.jpg',
    p.id,
    c.id
FROM producers p, category c 
WHERE p.name = 'NVIDIA' AND c.name = 'GPU'

UNION ALL

SELECT
    'GPU',
    999.99,
    15,
    'Powerful AMD Radeon graphics card',
    'https://example.com/images/rx7900xtx.jpg',
    p.id,
    c.id
FROM producers p, category c 
WHERE p.name = 'AMD' AND c.name = 'GPU'

UNION ALL

SELECT
    'CPU',
    699.99,
    20,
    '16-core 32-thread flagship CPU',
    'https://example.com/images/ryzen97950x.jpg',
    p.id,
    c.id
FROM producers p, category c 
WHERE p.name = 'AMD' AND c.name = 'CPU'

UNION ALL

SELECT
    'CPU',
    599.99,
    25,
    '24-core hybrid architecture processor',
    'https://example.com/images/i913900k.jpg',
    p.id,
    c.id
FROM producers p, category c 
WHERE p.name = 'Intel' AND c.name = 'CPU'

UNION ALL

SELECT
    'Motherboard',
    399.99,
    10,
    'Premium Z790 gaming motherboard',
    'https://example.com/images/rogstrixz790.jpg',
    p.id,
    c.id
FROM producers p, category c 
WHERE p.name = 'ASUS' AND c.name = 'Motherboard'

UNION ALL

SELECT
    'Motherboard',
    499.99,
    15,
    'High-end X670E motherboard for AMD Ryzen',
    'https://example.com/images/x670aorus.jpg',
    p.id,
    c.id
FROM producers p, category c 
WHERE p.name = 'GIGABYTE' AND c.name = 'Motherboard'

UNION ALL

SELECT
    'RAM',
    89.99,
    20,
    '16GB (2x8GB) DDR4 3200MHz',
    'https://example.com/images/corsairvengeance.jpg',
    p.id,
    c.id
FROM producers p, category c 
WHERE p.name = 'Corsair' AND c.name = 'RAM'

UNION ALL

SELECT
    'RAM',
    199.99,
    15,
    '32GB (2x16GB) DDR5 6000MHz RGB',
    'https://example.com/images/gskilltrident.jpg',
    p.id,
    c.id
FROM producers p, category c 
WHERE p.name = 'G.Skill' AND c.name = 'RAM'

UNION ALL

SELECT
    'Storage',
    149.99,
    10,
    '1TB NVMe PCIe 3.0 SSD',
    'https://example.com/images/samsung970evo.jpg',
    p.id,
    c.id
FROM producers p, category c 
WHERE p.name = 'Samsung' AND c.name = 'Storage'

UNION ALL

SELECT
    'Storage',
    79.99,
    15,
    '2TB 3.5" SATA HDD',
    'https://example.com/images/wdblue2tb.jpg',
    p.id,
    c.id
FROM producers p, category c 
WHERE p.name = 'Western Digital' AND c.name = 'Storage'

UNION ALL

SELECT
    'Power Supply',
    129.99,
    10,
    '850W 80+ Gold Fully Modular',
    'https://example.com/images/asrock850w.jpg',
    p.id,
    c.id
FROM producers p, category c 
WHERE p.name = 'ASRock' AND c.name = 'Power Supply'

UNION ALL

SELECT
    'Power Supply',
    149.99,
    15,
    '750W 80+ Platinum Fully Modular',
    'https://example.com/images/bequiet750w.jpg',
    p.id,
    c.id
FROM producers p, category c 
WHERE p.name = 'be quiet!' AND c.name = 'Power Supply'

UNION ALL

SELECT
    'CPU Cooler',
    89.99,
    10,
    'Dual-tower air cooler',
    'https://example.com/images/darkrockpro4.jpg',
    p.id,
    c.id
FROM producers p, category c 
WHERE p.name = 'be quiet!' AND c.name = 'CPU Cooler'

UNION ALL

SELECT
    'CPU Cooler',
    159.99,
    15,
    '360mm AIO liquid cooler',
    'https://example.com/images/deepcoolcastle360.jpg',
    p.id,
    c.id
FROM producers p, category c 
WHERE p.name = 'DEEPCOOL' AND c.name = 'CPU Cooler';
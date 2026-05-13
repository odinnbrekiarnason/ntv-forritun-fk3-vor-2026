-- LOKAVERKEFNI ROADMAP SQL
-- Target dialect: PostgreSQL

-- Optional reset section for local development
DROP TABLE IF EXISTS prebuild_items CASCADE;
DROP TABLE IF EXISTS prebuilds CASCADE;
DROP TABLE IF EXISTS gpu CASCADE;
DROP TABLE IF EXISTS cpu CASCADE;
DROP TABLE IF EXISTS motherboard CASCADE;
DROP TABLE IF EXISTS ram_memory CASCADE;
DROP TABLE IF EXISTS storage_drive CASCADE;
DROP TABLE IF EXISTS power_supply CASCADE;
DROP TABLE IF EXISTS cpu_cooler CASCADE;

-- =========================
-- Core component tables
-- =========================

CREATE TABLE gpu (
  gpu_id BIGSERIAL PRIMARY KEY,
  model_name TEXT NOT NULL,
  producer TEXT NOT NULL CHECK (producer IN ('NVIDIA', 'AMD')),
  price NUMERIC(10,2) NOT NULL CHECK (price > 0),
  motherboard_size_requirement TEXT NOT NULL CHECK (
    motherboard_size_requirement IN ('E-ATX', 'ATX', 'MICRO-ATX', 'MINI-ITX')
  ),
  recommended_psu_watts INTEGER CHECK (recommended_psu_watts > 0),
  gpu_size_mm INTEGER CHECK (gpu_size_mm > 0)
);

CREATE TABLE cpu (
  cpu_id BIGSERIAL PRIMARY KEY,
  model_type TEXT NOT NULL,
  supplier TEXT NOT NULL CHECK (supplier IN ('AMD', 'INTEL')),
  price NUMERIC(10,2) NOT NULL CHECK (price > 0),
  motherboard_compatibility TEXT NOT NULL CHECK (motherboard_compatibility IN ('AMD', 'INTEL')),
  cores INTEGER NOT NULL CHECK (cores > 0),
  pins INTEGER CHECK (pins > 0)
);

CREATE TABLE motherboard (
  motherboard_id BIGSERIAL PRIMARY KEY,
  model_name TEXT NOT NULL,
  producer TEXT NOT NULL CHECK (producer IN ('ASUS', 'GIGABYTE', 'MSI', 'ASROCK')),
  price NUMERIC(10,2) NOT NULL CHECK (price > 0),

  -- Socket support family from your requirement
  socket_support TEXT NOT NULL CHECK (socket_support IN ('INTEL', 'AMD')),

  -- Physical size
  board_size TEXT NOT NULL CHECK (board_size IN ('E-ATX', 'ATX', 'MICRO-ATX', 'MINI-ITX')),

  -- Storage compatibility
  storage_compatibility TEXT NOT NULL CHECK (storage_compatibility IN ('M.2 NVME SSD', 'SATA', 'BOTH')),
  storage_slots INTEGER NOT NULL CHECK (storage_slots >= 0),

  ddr_type SMALLINT NOT NULL CHECK (ddr_type IN (4, 5)),
  pcie_slots INTEGER NOT NULL CHECK (pcie_slots > 0),

  -- Extras
  number_of_ports INTEGER CHECK (number_of_ports > 0),
  port_types TEXT,
  wireless_internet BOOLEAN NOT NULL DEFAULT FALSE,

  -- Free-text list for edge cases; can be normalized later
  cpu_compatibilities TEXT
);

CREATE TABLE ram_memory (
  ram_id BIGSERIAL PRIMARY KEY,
  model_name TEXT NOT NULL,
  producer TEXT NOT NULL CHECK (producer IN ('Samsung', 'SK Hynix', 'Micron Tech')),
  price NUMERIC(10,2) NOT NULL CHECK (price > 0),
  ddr_type SMALLINT NOT NULL CHECK (ddr_type IN (4, 5)),
  size_gb INTEGER NOT NULL CHECK (size_gb IN (8, 16, 32, 64)),
  workload_volts NUMERIC(4,2) CHECK (workload_volts > 0)
);

CREATE TABLE storage_drive (
  storage_id BIGSERIAL PRIMARY KEY,
  model_name TEXT NOT NULL,
  producer TEXT NOT NULL CHECK (producer IN ('Samsung', 'WD-Blue')),
  price NUMERIC(10,2) NOT NULL CHECK (price > 0),
  type TEXT NOT NULL CHECK (type IN ('SATA', 'M.2')),
  size_tb NUMERIC(4,2) NOT NULL CHECK (size_tb IN (0.5, 1, 2, 5)),
  read_speed_mb_s INTEGER CHECK (read_speed_mb_s > 0),
  write_speed_mb_s INTEGER CHECK (write_speed_mb_s > 0)
);

CREATE TABLE power_supply (
  psu_id BIGSERIAL PRIMARY KEY,
  model_name TEXT NOT NULL,
  producer TEXT NOT NULL CHECK (producer IN ('ASROCK', 'BE QUIET', 'DEEPCOOL')),
  price NUMERIC(10,2) NOT NULL CHECK (price > 0),
  power_supplied_watts INTEGER NOT NULL CHECK (power_supplied_watts > 0),

  -- Extras
  size TEXT,
  number_of_sata_connectors INTEGER CHECK (number_of_sata_connectors > 0)
);

CREATE TABLE cpu_cooler (
  cooler_id BIGSERIAL PRIMARY KEY,
  model_name TEXT NOT NULL,
  producer TEXT NOT NULL CHECK (producer IN ('BE QUIET', 'DEEPCOOL')),
  price NUMERIC(10,2) NOT NULL CHECK (price > 0),
  type TEXT NOT NULL CHECK (type IN ('WATER COOLED', 'AIR COOLED')),
  compatible_ports TEXT,
  max_fan_speed_rpm INTEGER CHECK (max_fan_speed_rpm > 0)
);


-- Basic Tables ()



CREATE TABLE gpu (
  id BIGSERIAL PRIMARY KEY,
  model_name TEXT NOT NULL,
  price NUMBER(10,2) NOT NULL CHECK (price > 0),
  stock INTEGER NOT NULL CHECK (stock > 0)
)

CREATE TABLE cpu (
  id BIGSERIAL PRIMARY KEY,
  model_type TEXT NOT NULL,
  price NUMBER(10,2) NOT NULL CHECK (price > 0)
  stock INTEGER NOT NULL CHECK (stock > 0)
)

CREATE TABLE motherboard (
  id BIGSERIAL PRIMARY KEY,
  model_name TEXT NOT NULL,
  price NUMBER(10,2) NOT NULL CHECK (price > 0)
  stock INTEGER NOT NULL CHECK (stock > 0)
)

CREATE TABLE ram_memory (
  id BIGSERIAL PRIMARY KEY,
  model_name TEXT NOT NULL,
  price NUMBER(10,2) NOT NULL CHECK (price > 0)
  stock INTEGER NOT NULL CHECK (stock > 0)
)

CREATE TABLE storage_drive (
  id BIGSERIAL PRIMARY KEY,
  model_name TEXT NOT NULL,
  price NUMBER(10,2) NOT NULL CHECK (price > 0)
  stock INTEGER NOT NULL CHECK (stock > 0)
)

CREATE TABLE power_supply (
  id BIGSERIAL PRIMARY KEY,
  model_name TEXT NOT NULL,
  price NUMBER(10,2) NOT NULL CHECK (price > 0)
  stock INTEGER NOT NULL CHECK (stock > 0)
)

CREATE TABLE cpu_cooler (
  id BIGSERIAL PRIMARY KEY,
  model_name TEXT NOT NULL,
  price NUMBER(10,2) NOT NULL CHECK (price > 0)
  stock INTEGER NOT NULL CHECK (stock > 0)
)

-- Basic Table Seed Data 

INSERT INTO gpu (model_name, price, stock) VALUES
('NVIDIA GeForce RTX 4090', 1499.99, 10),
('AMD Radeon RX 7900 XTX', 999.99, 15);

INSERT INTO cpu (model_type, price, stock) VALUES
('AMD Ryzen 9 7950X', 699.99, 20),
('INTEL Core i9-13900K', 599.99, 25);

INSERT INTO motherboard (model_name, price, stock) VALUES
('ASUS ROG Strix Z790-E', 399.99, 10),
('GIGABYTE X670 AORUS Master', 499.99, 15);

INSERT INTO ram_memory (model_name, price, stock) VALUES
('Corsair Vengeance LPX 16GB DDR4', 89.99, 20),
('G.Skill Trident Z RGB 32GB DDR5', 199.99, 15);

INSERT INTO storage_drive (model_name, price, stock) VALUES
('Samsung 970 EVO Plus 1TB M.2', 149.99, 10),
('WD-Blue 2TB SATA', 79.99, 15);

INSERT INTO power_supply (model_name, price, stock) VALUES
('ASROCK Phantom Gaming 850W', 129.99, 10),
('BE QUIET Straight Power 11 750W', 149.99, 15);

INSERT INTO cpu_cooler (model_name, price, stock) VALUES
('BE QUIET Dark Rock Pro 4', 89.99, 10),
('DEEPCOOL Castle 360EX', 159.99, 15);
drop table if exists motherboard_specs cascade;
drop table if exists cpu_specs cascade;
drop table if exists ram_specs cascade;
drop table if exists gpu_specs cascade;
drop table if exists storage_specs cascade;
drop table if exists psu_specs cascade;
drop table if exists cpu_cooler_specs cascade;
drop table if exists products cascade;
drop table if exists producers cascade;
drop table if exists category cascade;
drop table if exists order_items cascade;
drop table if exists orders cascade;
drop table if exists users cascade;



create table producers (
  id uuid primary key default gen_random_uuid(),
  name varchar(50) not null unique
);

create table category (
  id uuid primary key default gen_random_uuid(),
  name varchar(50) not null unique
);

create table products (
  id uuid primary key default gen_random_uuid(),
  type varchar(255) not null,
  product_name varchar(255) not null unique,
  price decimal(10, 2) not null check (price > 0),
  stock int not null check (stock >= 0),
  description text,
  is_available boolean generated always as (stock >= 0) stored,
  img_url text not null,
  img_url2 text,
  img_url3 text,
  yt_review_url text,

  producer_id uuid,
  constraint fk_producer_id foreign key (producer_id) references producers(id) on delete cascade
);

create table users (
  id uuid primary key default gen_random_uuid(),
  clerk_uid varchar(100) not null unique,
  username varchar(255) not null,
  firstname varchar(255) not null,
  email varchar(255) not null unique,
  shop_role varchar(50) not null default 'member'
);

create table orders (
  id uuid primary key default gen_random_uuid(),
  status varchar(255) not null,
  total_price decimal(10, 2) not null default 0,
  created_at timestamp without time zone default current_timestamp,
  finished_at timestamp without time zone,

  user_id varchar(100) not null,
  constraint fk_user_id foreign key (user_id) references users(clerk_uid) on delete cascade
);

create table order_items (
  order_id uuid not null references orders(id) on delete cascade,
  product_id uuid not null references products(id) on delete restrict,
  unit_price decimal(10, 2) not null check (unit_price > 0),
  quantity int not null check (quantity >= 1),
  line_total decimal(10, 2) generated always as ((unit_price * quantity)::decimal(10, 2)) stored,
  primary key (order_id, product_id)
);

create table motherboard_specs (
  product_id uuid primary key references products(id) on delete cascade,
  cpu_socket varchar(20) not null,
  size varchar(20) not null,
  ram_type varchar(10) not null,
  ram_slots int not null check (ram_slots > 0),
  max_ram_gb int not null check (max_ram_gb > 0),
  chipset varchar(50)
);

create table cpu_specs (
  product_id uuid primary key references products(id) on delete cascade,
  cpu_socket varchar(20) not null,
  core_count int not null check (core_count > 0),
  thread_count int not null check (thread_count > 0),
  base_clock_ghz decimal(4, 2),
  boost_clock_ghz decimal(4, 2),
  tdp_w int check (tdp_w > 0)
);

create table ram_specs (
  product_id uuid primary key references products(id) on delete cascade,
  ddr_type varchar(10) not null,
  total_capacity_gb int not null check (total_capacity_gb > 0),
  module_count int not null check (module_count > 0),
  speed_mhz int check (speed_mhz > 0)
);

create table gpu_specs (
  product_id uuid primary key references products(id) on delete cascade,
  memory_type varchar(20) not null,
  vram_gb int not null check (vram_gb > 0),
  boost_clock_mhz int check (boost_clock_mhz > 0),
  tdp_w int check (tdp_w > 0)
);

create table storage_specs (
  product_id uuid primary key references products(id) on delete cascade,
  storage_type varchar(20) not null,
  interface_type varchar(20) not null,
  capacity_gb int not null check (capacity_gb > 0),
  form_factor varchar(20)
);

create table psu_specs (
  product_id uuid primary key references products(id) on delete cascade,
  wattage int not null check (wattage > 0),
  modular_type varchar(20),
  form_factor varchar(20)
);

create table cpu_cooler_specs (
  product_id uuid primary key references products(id) on delete cascade,
  cooler_type varchar(20) not null,
  radiator_mm int check (radiator_mm > 0),
  fan_size_mm int check (fan_size_mm > 0)
);

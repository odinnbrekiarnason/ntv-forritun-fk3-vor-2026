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
  stock int not null check (stock >= 1),
  description text,
  is_available boolean generated always as (stock > 0) stored,
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

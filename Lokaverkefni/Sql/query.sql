drop table if exists products cascade;
drop table if exists producers cascade;
drop table if exists category cascade;
drop table if exists orders cascade;
drop table if exists users cascade;
drop table if exists cart cascade;


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
  userName varchar(255) not null,
  email varchar(50) not null unique,
  shop_role varchar(255) not null
);

create table orders (
  id uuid primary key default gen_random_uuid(),
  quantity int not null default 1 check (quantity >= 1),
  status varchar(255) not null,
  created_at timestamp without time zone default current_timestamp,
  finished_at timestamp without time zone,

  user_id uuid,
  product_id uuid,
  constraint fk_user_id foreign key (user_id) references users(id) on delete cascade,
  constraint fk_product_id foreign key (product_id) references products(id) on delete cascade
);

create table cart (
  id uuid primary key default gen_random_uuid(),
  item_ids uuid[] not null default '{}'::uuid[],
  total_price decimal(10, 2) default 0,

  user_id uuid,
  constraint fk_user_id foreign key (user_id) references users(id) on delete cascade
);

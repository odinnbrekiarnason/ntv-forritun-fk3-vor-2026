drop table if exists products cascade;
drop table if exists producers cascade;
drop table if exists category cascade;
drop table if exists order_items cascade;
drop table if exists orders cascade;
drop table if exists users cascade;
drop table if exists cart cascade;
drop table if exists cart_items cascade;


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
  id varchar(100) primary key,
  userName varchar(255) not null,
  email varchar(50) not null unique,
  shop_role varchar(255) not null default 'member'
);

create table orders (
  id uuid primary key default gen_random_uuid(),
  status varchar(255) not null,
  total_price decimal(10, 2) not null default 0,
  created_at timestamp without time zone default current_timestamp,
  finished_at timestamp without time zone,

  user_id varchar(100),
  constraint fk_user_id foreign key (user_id) references users(id) on delete cascade
);

create table cart (
  id uuid primary key default gen_random_uuid(),
  total_price decimal(10, 2) default 0,

  user_id varchar(100),
  constraint fk_user_id foreign key (user_id) references users(id) on delete cascade,
  constraint uq_cart_user unique (user_id)
);

create table cart_items (
  cart_id uuid not null references cart(id) on delete cascade,
  product_id uuid not null references products(id) on delete cascade,
  quantity int not null check (quantity >= 1),
  primary key (cart_id, product_id)
);

create table order_items (
  order_id uuid not null references orders(id) on delete cascade,
  product_id uuid not null references products(id) on delete restrict,
  unit_price decimal(10, 2) not null check (unit_price > 0),
  quantity int not null check (quantity >= 1),
  line_total decimal(10, 2) generated always as ((unit_price * quantity)::decimal(10, 2)) stored,
  primary key (order_id, product_id)
);

create or replace function recalc_cart_total(p_cart_id uuid)
returns void
language sql
as $$
  update cart c
  set total_price = coalesce((
    select sum(ci.quantity * p.price)
    from cart_items ci
    join products p on p.id = ci.product_id
    where ci.cart_id = p_cart_id
  ), 0)::numeric(10,2)
  where c.id = p_cart_id;
$$;

create or replace function trg_recalc_cart_total()
returns trigger
language plpgsql
as $$
begin
  perform recalc_cart_total(coalesce(new.cart_id, old.cart_id));
  return coalesce(new, old);
end;
$$;

drop trigger if exists cart_items_recalc_total on cart_items;

create trigger cart_items_recalc_total
after insert or update or delete on cart_items
for each row
execute function trg_recalc_cart_total();

create table producers (
  id serial primary key,
  name varchar(50) not null unique
)

create table products (
  id serial primary key,
  type varchar(255) not null,
  price decimal(10, 2) not null check(price > 0),
  stock int not null check(stock >= 1),
  description text default null,
  img_url varchar(255) not null,
  
  --foreign keys
  producer_id int,
  category_id int,
  foreign key (category_id) references category(id) on delete cascade,
  foreign key (producer_id) references producer(id) on delete cascade
)

create table users (
  id serial primary key,
  name varchar(255) not null,
  email varchar(255) not null unique check(email like '%@%'),
  created_at Date default current_timestamp
)

create table previous_purchases (
  id serial primary key,
  user_id int,
  product_id int,
  foreign key (user_id) references users(id) on delete cascade,
  foreign key (product_id) references products(id) on delete cascade
)

create table category (
  id serial primary key,
  name varchar(50) not null unique
)


create table producers (
  id serial primary key,
  name varchar(50) not null unique
)

create table products (
  id serial primary key,
  type varchar(255) not null,
  productName varchar(255) not null unique,
  price decimal(10, 2) not null check(price > 0),
  stock int not null check(stock >= 1),
  description text nullable,
  img_url varchar(255) not null,
  
  --foreign keys
  
  producer_id foreign key references prod,
  constraint (fk_producer_id) foreign key (producer_id) references producer(id) on delete cascade,
)

create table category (
  id serial primary key,
  name varchar(50) not null unique
)


import {prisma} from "../../lib/prisma";


export async function Clean_Reset() {
  await prisma.$executeRaw`drop table if exists "User" cascade;`;
  await prisma.$executeRaw`drop table if exists "Product" cascade;`;
  await prisma.$executeRaw`drop table if exists "CartItem" cascade;`;
  await prisma.$executeRaw`drop table if exists "Order" cascade;`;
  await prisma.$executeRaw`drop table if exists "OrderItem" cascade;`;
  console.log("User table has been cleanly reset.");
}

Clean_Reset().then(async() => {
  await prisma.$disconnect();
}).catch(async (e) => {
  console.error(e);
  await prisma.$disconnect();
  process.exit(1);
})
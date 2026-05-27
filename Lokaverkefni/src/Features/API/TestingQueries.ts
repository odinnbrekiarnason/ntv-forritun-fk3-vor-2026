import {CreateUser} from "./User/UserScripts/CRUD";
import { prisma } from "../../lib/prisma";

CreateUser('test User', 'test@example.com,', 'password123').then((user) => {
  console.log("Created user:", user);
}).catch((error) => {
  console.error("Error creating user:", error);
  prisma.$disconnect();
});
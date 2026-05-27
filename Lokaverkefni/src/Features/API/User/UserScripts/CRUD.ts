
import { prisma } from "../../../../lib/prisma";
import type { DBUserNoPw } from "../../../../Shared/User/schemas";
import { scrambler } from "../passwordScrambler";

export async function CreateUser(username: string, email: string, password: string): Promise<DBUserNoPw | undefined> {

  const existing = await prisma.user.findUnique({
    where: {
      email: email,
    }
  });

  if(existing) {
    return undefined;
  }

  const user = await prisma.user.create({
    data: {
      username,
      email,
      password: await scrambler(password)
    },
  });

  const userParsed: DBUserNoPw = {
    id: user.id,
    username: user.username,
    email: user.email,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  };

  return userParsed;
}

export async function ReadUser(username: string, email?: string) {
  if(email) {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    console.log("Read user by email:", user);
    return user;
  } else {
    const user = await prisma.user.findUnique({
      where: {
        username,
      },
    });
    console.log("Read user by username:", user);
    return user;
  }
}
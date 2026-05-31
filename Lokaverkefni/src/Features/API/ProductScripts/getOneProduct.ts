import { prisma } from "@/lib/prisma";

type ProductId = number | bigint;

function toBigIntId(id: ProductId): bigint {
  return typeof id === "bigint" ? id : BigInt(id);
}

export type returnType = {
  id: bigint;
  name: string;
  price: number;
  description: string;
  imageUrl: string;
}

export async function getGpuById(productId: ProductId) {
  const response = await prisma.gpu.findUnique({
    where: {
      id: toBigIntId(productId),
    },
  });
  return response;
}

export async function getCpuById(productId: ProductId) {
  const response = await prisma.cpu.findUnique({
    where: {
      id: toBigIntId(productId),
    },
  });
  return response;
}

export async function getMotherboardById(productId: ProductId) {
  const response = await prisma.motherboard.findUnique({
    where: {
      id: toBigIntId(productId),
    },
  });
  return response;
}

export async function getRamMemoryById(productId: ProductId) {
  const response = await prisma.ramMemory.findUnique({
    where: {
      id: toBigIntId(productId),
    },
  });
  return response;
}

export async function getStorageDriveById(productId: ProductId) {
  const response = await prisma.storageDrive.findUnique({
    where: {
      id: toBigIntId(productId),
    },
  });
  return response;
}

export async function getPowerSupplyById(productId: ProductId) {
  const response = await prisma.powerSupply.findUnique({
    where: {
      id: toBigIntId(productId),
    },
  });
  return response;
}

export async function getCpuCoolerById(productId: ProductId) {
  const response = await prisma.cpuCooler.findUnique({
    where: {
      id: toBigIntId(productId),
    },
  });
  return response;
}

export async function getAllGpus() {
  return prisma.gpu.findMany();
}

export async function getAllCpus() {
  return prisma.cpu.findMany();
}

export async function getAllMotherboards() {
  return prisma.motherboard.findMany();
}

export async function getAllRamMemory() {
  return prisma.ramMemory.findMany();
}

export async function getAllStorageDrives() {
  return prisma.storageDrive.findMany();
}

export async function getAllPowerSupplies() {
  return prisma.powerSupply.findMany();
}

export async function getAllCpuCoolers() {
  return prisma.cpuCooler.findMany();
}


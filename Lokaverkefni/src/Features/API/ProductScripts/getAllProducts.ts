import { getAllCpuCoolers, getAllCpus, getAllGpus, getAllMotherboards, getAllPowerSupplies, getAllRamMemory, getAllStorageDrives } from "./getOneProduct";

export async function getAllProducts() {
  const gpus = await getAllGpus();
  const cpus = await getAllCpus();
  const motherboards = await getAllMotherboards();
  const ramMemory = await getAllRamMemory();
  const storageDrives = await getAllStorageDrives();
  const powerSupplies = await getAllPowerSupplies();
  const cpuCoolers = await getAllCpuCoolers();

  const allProducts = {
    gpus,
    cpus,
    motherboards,
    ramMemory,
    storageDrives,
    powerSupplies,
    cpuCoolers
  };

  return allProducts;
}
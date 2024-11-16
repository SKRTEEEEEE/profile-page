import { readRoleUC } from "@/core/application/usecases/entities/role";
import { connectToDB } from "@/core/infrastructure/connectors/mongo-db";
import { LenguajesModel } from "@/models/tech-schema";
import { Web3ProjectModel } from "@/models/web3_project-schema";
// import { AdminModel, UserModel } from "@/models/user-schema";


export const fetchWeb3Projects = async () => {
  await connectToDB();
  const web3projects = await Web3ProjectModel.find();
  return web3projects;
}
export const fetchLenguajes = async () => {
  await connectToDB();
  const lenguajes = await LenguajesModel.find();
  return lenguajes;
}


// ver si necesito fetchAdmins, yo creo que no es necesario!

export const fetchAdmins = async () => {
  try {
    const roles = await readRoleUC()
    const admins = roles?.filter(role => role.permissions === "ADMIN")
    return admins
  } catch (error) {
    console.error("Error al obtener los admins: ", error);
    throw new Error('No se pudieron obtener los administradores');
  }
}
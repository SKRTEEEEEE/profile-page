import { connectToDB } from "@/core/infrastructure/connectors/mongo-db";
import { LenguajesModel } from "@/models/lenguajes-schema";
import { RoleModel } from "@/models/user-role-schema";
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



// export const fetchUsers = async () => {
//   try {
//     await connectToDB(); 
//     const users = await UserModel.find();
//     return users;
//   } catch (error) {
//     console.error('Error al obtener usuarios:', error);
//     throw new Error('No se pudieron obtener los usuarios');
//   }
// };

export const fetchRoles = async () => {
  try {
    await connectToDB();
    const roles = await RoleModel.find()
    return roles;
  } catch (error) {
    console.error("Error al obtener los roles: ", error);
    throw new Error('No se pudieron obtener los roles');
  }
}
export const fetchAdmins = async () => {
  try {
    const roles = await fetchRoles()
    const admins = roles.find(role => role.permission === "ADMIN")
    return admins
  } catch (error) {
    console.error("Error al obtener los admins: ", error);
    throw new Error('No se pudieron obtener los administradores');
  }
}
import { LenguajesModel } from "@/models/lenguajes-schema";
import { AdminModel, UserModel } from "@/models/user-schema";
import { Web3ProjectModel } from "@/models/web3_project-schema";
import { connectToDB } from "@/utils/db-connect";


export const fetchWeb3Projects = async () => {
  connectToDB();
  const web3projects = await Web3ProjectModel.find();
  return web3projects;
}
export const fetchLenguajes = async () => {
  connectToDB();
  const lenguajes = await LenguajesModel.find();
  return lenguajes;
}

// export const fetchAdmins = async () =>{
//   connectToDB()
//   const admins = await AdminModel.find();
//   return admins;
// }

export const fetchUsers = async () => {
  try {
    await connectToDB(); // Asegúrate de llamar a la función para conectar a la DB
    const users = await UserModel.find();
    return users;
  } catch (error) {
    console.error('Error al obtener usuarios:', error);
    throw new Error('No se pudieron obtener los usuarios');
  }
};

export const fetchAdmins = async () => {
  try {
    await connectToDB();
    const admins = await AdminModel.find()
    return admins;
  } catch (error) {
    console.error("Error al obtener los admins: ", error);
    throw new Error('No se pudieron obtener los administradores');
  }
}
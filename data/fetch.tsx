import { Web3ProjectModel } from "@/models/web3_project-schema";
import { connectToDB } from "@/utils/db-connect";


export const fetchWeb3Projects = async () => {
  connectToDB();
  const web3projects = await Web3ProjectModel.find();
  return web3projects;
}
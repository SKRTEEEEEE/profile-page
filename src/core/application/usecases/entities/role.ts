// import { Role, RoleType } from "@/core/domain/entities/Role";
// import { RoleRepository } from "@/core/domain/repositories/role-repository";

import { Role, RoleBase } from "@/core/domain/entities/Role";
import { roleRepository } from "@/core/infrastructure/entities/mongoose-role";
import { RoleRepository } from "../../interfaces/entities/role";
import { FilterQuery, QueryOptions, UpdateQuery } from "mongoose";
// import { UpdateQuery } from "mongoose";

//⬇️⛔🆘 No sera necesario usar CreateRole, o otros usecases parecidos ya que eso seran services, al utilizar User y Role
//🙋‍♂️⚠️➡️ Aquí solo pondremos usecases como ListRole, ListRolesByPermission, etc...: Solo utilizan el Role

export const createRoleUC = async(newRole: Omit<RoleBase, "id">) => {
    return await roleRepository.create(newRole)
  }
// class DeleteRole {
//     constructor(private roleRepository: RoleRepository) {}
  
//     async execute(id: string): Promise<void> {
//       await this.roleRepository.delete(id)
      
//     }
//   }
// export const deleteRoleUC = async (id:string) => {
//   const dr = new DeleteRole(roleRepository)
//   return await dr.execute(id)
// }
export const deleteRoleByIdUC = async (id:string) => {
  return await roleRepository.delete(id)
}
export const findOneRoleAndDeleteUC = async (filter?: FilterQuery<any> | null | undefined, options?: QueryOptions<any> | null | undefined):Promise<Role|undefined> => {
  return await roleRepository.findDelete(filter,options)
}
// 🧠⚠️➡️ Podemos crear los "use-cases" agrupados, como hemos hecho en services. Esto nos ahorrara tener que inicializar siempre en mismo constructor.
// Se comentan ya que de momento no se utilizan
class ListRole {
constructor(private roleRepository: RoleRepository) {}
async execute(id: string): Promise<Role|null> {
    const findedRole = await this.roleRepository.readById(id)
    return findedRole;
}
}
export const listRoleUC = async (id:string) =>{
  const lr = new ListRole(roleRepository)
  return lr.execute(id)
}
class UpdateRole{
  constructor(private roleRepository:RoleRepository){}
  async execute(id:string, role?: Partial<RoleBase> | undefined){
    return await this.roleRepository.updateById(id, role)
  }
}
export const updateRoleUC = async(id:string, role?: UpdateQuery<RoleBase> | undefined) => {
  const ur = new UpdateRole(roleRepository)
  return ur.execute(id, role)
}

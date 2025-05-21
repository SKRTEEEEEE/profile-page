// import { Role, RoleType } from "@/core/domain/entities/Role";
// import { RoleRepository } from "@/core/domain/repositories/role-repository";

import { Role, RoleBase } from "@/core/domain/entities/Role";
import { RoleRepository } from "../../interfaces/entities/role";
import { MongooseRoleRepository } from "@/core/infrastructure/mongoose/entities/role.repository";
import { MongooseDeleteProps } from "@/core/infrastructure/mongoose/types/implementations";

const roleRepository = new MongooseRoleRepository()

export const createRoleUC = async(newRole: Omit<RoleBase, "id">) => {
    return await roleRepository.create(newRole)
  }
export const readRoleUC = async () => {
  return await roleRepository.read({})
}
// 🧠⚠️➡️ Podemos crear los "use-cases" agrupados, como hemos hecho en services. Esto nos ahorrara tener que inicializar siempre en mismo constructor.
// Se comentan ya que de momento no se utilizan
class ListRole {
  constructor(private roleRepository: RoleRepository<RoleBase>) {}
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
    constructor(private roleRepository:RoleRepository<RoleBase>){}
    async execute(id:string, role?: Partial<RoleBase> | undefined){
      return await this.roleRepository.updateById({id, updateData:role})
    }
  }
  export const updateRoleUC = async(id:string, role?: Partial<RoleBase> | undefined) => {
    const ur = new UpdateRole(roleRepository)
    return ur.execute(id, role)
  }
export const deleteRoleByIdUC = async (id:string) => {
  return await roleRepository.deleteById(id)
}
export const findOneRoleAndDeleteUC = async (props: MongooseDeleteProps<RoleBase>):Promise<Role|undefined> => {
  return await roleRepository.delete(props)
}



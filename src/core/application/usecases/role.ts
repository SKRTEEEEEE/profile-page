import { Role, RoleType } from "@/core/domain/entities/Role";
import { RoleRepository } from "@/core/domain/repositories/role-repository";

//⬇️⛔🆘 No sera necesario usar CreateRole, o otros usecases parecidos ya que eso seran services, al utilizar User y Role
//🙋‍♂️⚠️➡️ Aquí solo pondremos usecases como ListRole, ListRolesByPermission, etc...: Solo utilizan el Role

// export class CreateRole {
//   constructor(private roleRepository: RoleRepository) {}

//   async execute(rol: Role): Promise<Role> {
//     const createdRole = await this.roleRepository.create(rol)
//     return createdRole;
//   }
// }
// export class DeleteRole {
//     constructor(private roleRepository: RoleRepository) {}
  
//     async execute(id: string): Promise<void> {
//       await this.roleRepository.delete(id)
      
//     }
//   }

// 🧠⚠️➡️ Podemos crear los "use-cases" agrupados, como hemos hecho en services. Esto nos ahorrara tener que inicializar siempre en mismo constructor.
export class ListRole {
constructor(private roleRepository: RoleRepository) {}

async execute(id: string): Promise<Role|null> {
    const findedRole = await this.roleRepository.findById(id)
    return findedRole;
}
}
export class UpdateRole{
  constructor(private roleRepository:RoleRepository){}
  async execute(id:string, permissions: RoleType){
    return await this.roleRepository.update(id, permissions)
  }
}

// export class RoleUse {
//   constructor(private roleRepository: RoleRepository){}
//   async listRole(id: string): Promise<Role|null> {
//     const findedRole = await this.roleRepository.findById(id)
//     return findedRole;
// }
//   async updateRole(id:string, permissions: RoleType){
//     return await this.roleRepository.update(id, permissions)
//   }
// }

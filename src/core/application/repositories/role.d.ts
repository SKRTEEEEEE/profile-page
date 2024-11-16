// src/core/domain/repositories/RoleRepository.ts

import { Role, RoleBase, RoleType } from "@/core/domain/entities/Role";
import { MongooseBaseRepository } from "./mongoose";


export type RoleRepository = MongooseBaseRepository<RoleBase,Role> & {

}
// export type RoleRepository = {
//   create(role: Omit<RoleBase, 'id'>): Promise<Role>;
//   findById(id: string): Promise<Role | null>;
//   update(id:string, role: UpdateQuery<any> | undefined): Promise<Role>;
//   delete(id: string): Promise<void>;
// }
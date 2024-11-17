import { Role, RoleBase, RoleDocument, RoleType } from "@/core/domain/entities/Role";
import { MongooseBaseI, MongooseDeleteByIdI, MongooseReadI } from "../../../infrastructure/types/mongoose";
import { MongooseDeleteI } from "@/core/infrastructure/mongoose/types/implementations";

// ⚠️🧠❕❗ -> ESTA PARTE HA DE SER COMO LA BIBLIA DE LA "APLICACIÓN" -> Aquí irán definidas las reglas de la app -> Estas reglas jamas utilizaran tipos de la infrastructura sino que estaran basadas en las entidades(domain) y errores de ahí. -> Esto se hace para el dia que se utilize otro tipo de infrastructure(repos distintos), esta parte sea independiente. 😀



export type RoleRepository<
  TBase,
  TPrimary extends TBase & MongooseBase,
  TDocument extends TBase & MongooseDocument,
> = MongooseBaseI<TBase, TPrimary> & 
  MongooseDeleteByIdI & 
  MongooseReadI<TPrimary> & 
  MongooseDeleteI;
// export type RoleRepository = MongooseBaseI<RoleBase,Role>&MongooseDeleteI<RoleDocument>&MongooseReadI<Role>

// export type RoleRepository = {
//   create(role: Omit<RoleBase, 'id'>): Promise<Role>;
//   readById(id: string): Promise<Role | null>;
//   read(filter?: Partial<Role>,
//     projection?: any | null,
//     options?: any | null): Promise<Role[]|[]|any>
//   updateById(
//     id:string, 
//     updateData: Partial<RoleType>|undefined,
//     options?: any|null|undefined
  
//   ): Promise<Role>;
//   update(
//     filter?: Partial<Role> | undefined,
//     update?: Partial<RoleBase> | undefined, 
//     options?: any | null | undefined
//   )
//   deleteById(id: string): Promise<void>;

// }
// export type RoleRepository = {
//   create(role: Omit<RoleBase, 'id'>): Promise<Role>;
//   findById(id: string): Promise<Role | null>;
//   update(id:string, permissions: RoleType): Promise<Role>;
//   delete(id: string): Promise<void>;
// }
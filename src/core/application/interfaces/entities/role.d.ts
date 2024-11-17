// src/core/domain/repositories/RoleRepository.ts

import { Role, RoleBase, RoleDocument, RoleType } from "@/core/domain/entities/Role";
import { MongooseBaseI, MongooseDeleteByIdI, MongooseReadI } from "../../../infrastructure/types/mongoose";
import { MongooseDeleteI } from "@/core/infrastructure/mongoose/types/implementations";


export type RoleRepository<
  TBase,
  TPrimary extends TBase & MongooseBase,
  TDocument extends TBase & MongooseDocument,
> = MongooseBaseI<TBase, TPrimary> & 
  MongooseDeleteByIdI & 
  MongooseReadI<TPrimary> & 
  MongooseDeleteI;
// export type RoleRepository = MongooseBaseI<RoleBase,Role>&MongooseDeleteI<RoleDocument>&MongooseReadI<Role>
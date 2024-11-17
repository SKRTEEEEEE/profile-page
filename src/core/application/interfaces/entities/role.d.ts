// src/core/domain/repositories/RoleRepository.ts

import { Role, RoleBase, RoleDocument, RoleType } from "@/core/domain/entities/Role";
import { MongooseBaseI, MongooseDeleteI, MongooseReadI } from "../../../infrastructure/types/mongoose";


export type RoleRepository<
TBase,
TPrimary extends TBase & MongooseBase,
TDocument extends TBase & MongooseDocument,
> = MongooseBaseI<TBase,TPrimary> & MongooseDeleteI & MongooseReadI<TPrimary> 
// export type RoleRepository = MongooseBaseI<RoleBase,Role>&MongooseDeleteI<RoleDocument>&MongooseReadI<Role>
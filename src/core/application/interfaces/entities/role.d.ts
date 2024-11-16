// src/core/domain/repositories/RoleRepository.ts

import { Role, RoleBase, RoleType } from "@/core/domain/entities/Role";
import { MongooseBaseRepository } from "../../../infrastructure/types/mongoose";


export type RoleRepository = MongooseBaseRepository<RoleBase,Role> & {}

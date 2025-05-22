import { RoleBase } from "@/core/domain/entities/Role";
import { LengBase } from "@/core/domain/entities/tech";
import { MongooseBase } from "@/core/infrastructure/mongoose/types";

export type Role = RoleBase & MongooseBase
export type Leng = LengBase & MongooseBase
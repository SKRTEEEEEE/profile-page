import { RoleRepository } from "@/core/application/interfaces/entities/role";
import { RoleBase } from "@/core/domain/entities/role";
import { RoleModel } from "@/core/infrastructure/mongoose/schemas/user-role-schema";
import { MongooseRolePattern } from "../patterns/role.pattern";



export class MongooseRoleRepository extends MongooseRolePattern<RoleBase> implements RoleRepository<RoleBase> {
    constructor() {
      super(RoleModel);
    }
  }

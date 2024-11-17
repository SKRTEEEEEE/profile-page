import { RoleRepository } from "@/core/application/interfaces/entities/role";
import { Role, RoleBase, RoleDocument } from "@/core/domain/entities/Role";
import { RoleModel } from "@/models/user-role-schema";
import { MongooseRolePattern } from "../patterns/role.pattern";



export class MongooseRoleRepository extends MongooseRolePattern<RoleBase, Role, RoleDocument> implements RoleRepository<RoleBase, Role, RoleDocument> {
    constructor() {
      super(RoleModel);
    }
  }

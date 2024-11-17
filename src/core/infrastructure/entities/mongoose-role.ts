import { RoleRepository } from "@/core/application/interfaces/entities/role";
import { Role, RoleBase, RoleDocument } from "@/core/domain/entities/Role";
import { RoleModel } from "@/models/user-role-schema";
import { MongooseRolePattern } from "./mongoose-base";
import { FilterQuery, Query, QueryOptions } from "mongoose";



export class MongooseRoleRepository extends MongooseRolePattern<RoleBase, Role, RoleDocument> implements RoleRepository<RoleBase, Role, RoleDocument> {
    constructor() {
      super(RoleModel);
    }
        async findDelete(filter?: FilterQuery<any> | null | undefined, options?: QueryOptions<any> | null | undefined): Query<any, any, {}, any, "findOneAndDelete", {}> {
        await this.connect()
        return await this.Model.findOneAndDelete(filter, options)
    }
  }

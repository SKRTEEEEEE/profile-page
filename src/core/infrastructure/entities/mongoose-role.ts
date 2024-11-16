import { RoleRepository } from "@/core/application/interfaces/entities/role";
import { Role, RoleBase, RoleDocument } from "@/core/domain/entities/Role";
import { RoleModel } from "@/models/user-role-schema";
import { MongooseRepository } from "./mongoose-base";
import { FilterQuery, Query, QueryOptions } from "mongoose";

export class MongooseRoleRepository extends MongooseRepository<RoleBase, Role, RoleDocument> implements RoleRepository {
    constructor() {
      super(RoleModel);
    }
        async findDelete(filter?: FilterQuery<any> | null | undefined, options?: QueryOptions<any> | null | undefined): Query<any, any, {}, any, "findOneAndDelete", {}> {
        await this.connect()
        return await this.Model.findOneAndDelete(filter, options)
    }
  }

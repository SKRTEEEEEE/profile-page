import { RoleRepository } from "@/core/application/repositories/role";
import { MongoDbConnection } from "../connectors/mongo-db";
import { Role, RoleBase, RoleType } from "@/core/domain/entities/Role";
import { RoleDocument, RoleModel } from "@/models/user-role-schema";
import { FilterQuery, Query, QueryOptions, UpdateQuery } from "mongoose";

class MongooseRoleRepository extends MongoDbConnection implements RoleRepository{
    async create(role: Omit<RoleBase, "id">): Promise<Role> {
        await this.connect()
        const newRole = new RoleModel(role)
        const savedRole = await newRole.save()
        return this.documentToRole(savedRole)
    }
    async findById(id: string): Promise<Role | null> {
        this.connect()
        const role = await RoleModel.findById(id)
        return role ? this.documentToRole(role):null
        
    }
    async update(id:string, role?: UpdateQuery<any> | undefined): Promise<Role> {
        await this.connect()
        const updatedRole = await RoleModel.findByIdAndUpdate(id, role)
   
        return this.documentToRole(updatedRole)
    }
    async delete(id: string): Promise<void> {
        await this.connect()
        await RoleModel.findByIdAndDelete(id)
    }
    async findDelete(filter?: FilterQuery<any> | null | undefined, options?: QueryOptions<any> | null | undefined): Query<any, any, {}, any, "findOneAndDelete", {}> {
        await this.connect()
        return await RoleModel.findOneAndDelete(filter, options)
    }
    private documentToRole(doc: RoleDocument): Role {
        return {
            id: doc._id.toString(),
            address: doc.address,
            permissions: doc.permissions as RoleType,
            createdAt: doc.createdAt.toISOString(),
            updatedAt: doc.updatedAt.toISOString(),
            stripeCustomerId: doc.stripeCustomerId,
            subscriptionId: doc.subscriptionId,
            subscriptionStatus: doc.subscriptionStatus
        }
    }
}
export const roleRepository = new MongooseRoleRepository()
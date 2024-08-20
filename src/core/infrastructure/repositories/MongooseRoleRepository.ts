import { RoleRepository } from "@/core/domain/repositories/RoleRepository";
import { MongoDbConnection } from "../adapters/mongo-db-connection";
import { Role, RoleType } from "@/core/domain/entities/Role";
import { RoleDocument, RoleModel } from "@/models/user-role-schema";

export class MongooseRoleRepository extends MongoDbConnection implements RoleRepository{
    async create(role: Role): Promise<Role> {
        await this.connect()
        const newRole = new RoleModel(role)
        const savedRole = await newRole.save()
        console.log("saved role: ", savedRole)
        return this.documentToRole(savedRole)
    }
    async findById(id: string): Promise<Role | null> {
        this.connect()
        const role = await RoleModel.findById(id)
        return role ? this.documentToRole(role):null
        
    }
    async update(id: string, permissions: RoleType): Promise<Role> {
        await this.connect()
        const role = await RoleModel.findById(id)
        role.permissions = permissions
        const updatedRole = await role.save()
        return this.documentToRole(updatedRole)
    }
    async delete(id: string): Promise<void> {
        await this.connect()
        await RoleModel.findByIdAndDelete(id)
    }
    private documentToRole(doc: RoleDocument): Role {
        return {
            id: doc._id.toString(),
            name: doc.name,
            permissions: doc.permissions as RoleType,
            createdAt: doc.createdAt.toISOString(),
            updatedAt: doc.updatedAt.toISOString()
        }
    }
}
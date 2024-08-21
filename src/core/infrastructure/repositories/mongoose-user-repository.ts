import { User, UserBase } from '@/core/domain/entities/User';
import { UserRepository } from '@/core/domain/repositories/user-repository';
import { UserDocument, UserModel } from '@/models/user-role-schema';
import { MongoDbConnection } from '../adapters/mongo-db-connection';


export class MongooseUserRepository extends MongoDbConnection implements UserRepository {

    async create(user: User): Promise<User> {
        await this.connect();
        const newUser = new UserModel(user)
        const savedUser = await newUser.save()
        console.log("savedUser: ",savedUser)
        return this.documentToUser(savedUser)

    }
    async findById(id: string): Promise<User | null> {
        await this.connect()
        const user = await UserModel.findById(id)
        return user ? this.documentToUser(user) : null
    }
    async update(user: UserBase): Promise<User> {
        await this.connect(); // Asegúrate de que la conexión esté establecida
        const userF = await UserModel.findById(user.id);
        if (!userF) throw new Error("Error al encontrar el usuario");
    
        // Actualiza los campos necesarios
        userF.address = user.address;
        userF.isAdmin = user.isAdmin;
        userF.solicitudAdmin = user.solicitudAdmin;
        userF.nick = user.nick !== undefined ? user.nick : userF.nick
        userF.roleId = user.roleId !== null ? user.roleId : userF.roleId; // Mantiene el valor actual si roleId no se proporciona
        console.log("update user: ", user)
        // Guarda los cambios en la base de datos
        const updatedUser = await userF.save();
        console.log("updated user: ",updatedUser)
        return this.documentToUser(updatedUser); // Convierte el documento actualizado a la entidad User
    }
    async delete(id:string):Promise<void> {
        await this.connect()
        const result = await UserModel.deleteOne({_id:id})
        if (result.deletedCount === 0) throw new Error(`User with id ${id} not found`);
    }
    async findAll(): Promise<User[] | null> {
        await this.connect()
        const users = await UserModel.find()
        return users.length > 0 ? users.map(this.documentToUser):null
    }
    async deleteRoleId(id: string): Promise<void> {
        await this.connect()
        const result = await UserModel.updateOne({ _id: id }, { $set: { roleId: null } });
        if (result.matchedCount === 0) throw new Error(`User with id ${id} not found`);
    }
    private documentToUser(doc: UserDocument): User {
        return {
          id: doc._id.toString(),
          address: doc.address,
          nick: doc.nick,
          roleId: doc.roleId,
          isAdmin: doc.isAdmin,
          solicitudAdmin: doc.solicitudAdmin,
          createdAt: doc.createdAt.toISOString(),
          updatedAt: doc.updatedAt.toISOString()
        };
      }

}
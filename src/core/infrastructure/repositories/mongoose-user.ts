import { User, UserBase } from '@/core/domain/entities/User';
import { UserRepository } from '@/core/application/repositories/user';
import { UserDocument, UserModel } from '@/models/user-role-schema';
import { MongoDbConnection } from '../connectors/mongo-db';
import { DatabaseOperationError } from '@/core/domain/errors/main';
import { FilterQuery, Query, QueryOptions, UpdateQuery } from 'mongoose';


class MongooseUserRepository extends MongoDbConnection implements UserRepository {

    async create(user: User): Promise<User> {
        await this.connect();
        const newUser = new UserModel(user)
        const savedUser = await newUser.save()
        return this.documentToUser(savedUser)

    }
    async findById(id: string): Promise<User | null> {
        await this.connect()
        try {
            const user: UserDocument | null = await UserModel.findById(id);
            return user ? this.documentToUser(user) : null;
        } catch (error) {
            console.error("Error buscando usuario por ID:", error);
            return null; // O lanza un error, según lo que necesites.
        }
    }
    async findByAddress(address: string): Promise<User | null> {
        await this.connect()
        const user = await UserModel.findOne({address})
        return user ? this.documentToUser(user) : null        
    }
    async update(user: UserBase): Promise<User> {
        await this.connect(); // Asegúrate de que la conexión esté establecida
        const updateFields: any = { ...user };
        const unsetFields: any = {};

        // Recorre los campos del objeto y si están indefinidos, agrega un campo para eliminar
        for (const key in user) {
            if (user[key as keyof UserBase] === undefined) {
                unsetFields[key] = "";
                delete updateFields[key]; // Elimina el campo de updateFields para evitar conflictos con $set
            }
        }

        const updatedUser = await UserModel.findByIdAndUpdate(
            user.id,
            {
                ...(Object.keys(updateFields).length && { $set: updateFields }),
                ...(Object.keys(unsetFields).length && { $unset: unsetFields }),
            },
            { new: true }
        );
        // Construir los datos a actualizar
        //  const updateData: any = {
        //     ...user,
        //     ...(user.verifyToken === undefined && { verifyToken: null }),
        //     ...(user.verifyTokenExpire === undefined && { verifyTokenExpire: null }),
        // };

        // const updatedUser = await UserModel.updateOne(
        //     { _id: user.id },
        //     updateData,
        //     { new: true }
        // );
        return this.documentToUser(updatedUser); // Convierte el documento actualizado a la entidad User
    }
    async updateById(id:string, user?: UpdateQuery<any> | undefined): Promise<User|null> {
        await this.connect()
        console.log("user info in updateByID :",user)
        return await UserModel.findByIdAndUpdate(id, user)
    }
    async findAndUpdate(filter?: FilterQuery<any> | undefined, update?: UpdateQuery<any> | undefined, options?: QueryOptions<any> | null | undefined){
        await this.connect()
        return await UserModel.findOneAndUpdate(filter, update, options)
    }
    async delete(id:string):Promise<void> {
        await this.connect()
        const result = await UserModel.deleteOne({_id:id})
        if (result.deletedCount === 0) throw new DatabaseOperationError(`User with id ${id} not found`);
    }
    async findAll(): Promise<User[] | null> {
        await this.connect()
        const users = await UserModel.find()
        return users.length > 0 ? users.map(this.documentToUser):null
    }
    async deleteRoleId(id: string): Promise<void> {
        await this.connect()
        const result = await UserModel.updateOne({ _id: id }, { $set: { roleId: null } });
        if (result.matchedCount === 0) throw new DatabaseOperationError(`User with id ${id} not found`);
    }
    private documentToUser(doc: UserDocument): User {
        return {
          id: doc._id.toString(),
          address: doc.address,
          nick: doc.nick,
          roleId: doc.roleId?.toString() || null,
          role: doc.role,
          solicitud: doc.solicitud,
          img: doc.img,
          email: doc.email,
          isVerified: doc.isVerified,
          verifyToken: doc.verifyToken,
          verifyTokenExpire: doc.verifyTokenExpire,
          createdAt: doc.createdAt.toISOString(),
          updatedAt: doc.updatedAt.toISOString(),
        };
      }

}
export const userRepository = new MongooseUserRepository()
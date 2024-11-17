import { User, UserBase, UserDocument } from '@/core/domain/entities/User';
import { UserModel } from '@/models/user-role-schema';
import { DatabaseOperationError } from '@/core/domain/errors/main';
import { UserRepository } from '@/core/application/interfaces/entities/user';
import { MongooseUserPattern } from '../patterns/user.pattern';

interface UserTransformOptions {
    roleId?: (value: any) => string | null;
  }

export class MongooseUserRepository extends MongooseUserPattern<UserBase, UserTransformOptions> implements UserRepository<UserBase>{
    constructor(){
        super(UserModel, {
            roleId: (value) => value?.toString() || null,
          })
    }
        async deleteRoleId(id: string): Promise<void> {
        await this.connect()
        const result = await this.Model.updateOne({ _id: id }, { $set: { roleId: null } });
        if (result.matchedCount === 0) throw new DatabaseOperationError(`User with id ${id} not found`);
        }
        async findByAddress(address: string): Promise<User | null> {
        await this.connect()
        const user = await this.Model.findOne({address})
        return user ? this.documentToPrimary(user) : null        
        }
}
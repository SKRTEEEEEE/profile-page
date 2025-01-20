import { User, UserBase } from "@/core/domain/entities/User";
import { MongooseUserRepository } from "@/core/infrastructure/mongoose/entities/user.repository";
import { MongooseUpdateProps } from "@/core/infrastructure/mongoose/types/implementations";

// 🧠👨‍🎓💡 Vamos a hacer la inyección aquí, SIN hacer EXPORT -> Así: nos aseguramos de solo utilizar la infra aquí(application)
// 🧠🚧⚠️ En el futuro -> trataremos de solo usar tipos de domain - PROHIBIDO usar tipos de mongoose aquí ya
const userRepository = new MongooseUserRepository()


export const listUsersByIdUC = async (id: string) => {
    return await userRepository.readById(id)
}

export const listUserByAddressUC = async (address: string) => {
    return await userRepository.findByAddress(address)
}

export const listUsersUC = async () => {
    return await userRepository.read({})
}

export const createUserUC = async (data: Omit<UserBase, "id">) => {
    return await userRepository.create(data)
}

export const findUserAndUpdateUC = async (
    props: MongooseUpdateProps<User>
) => {
    return await userRepository.update(props)
}
export const updateUserByIdUC = async (id: string, user?: Partial<UserBase> | undefined) => {
    return await userRepository.updateById({id, updateData:user})
}
export const deleteUserByIdUC = async (id: string) => {
    return await userRepository.deleteById(id)
}



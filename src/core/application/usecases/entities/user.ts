import { MongooseUserRepository } from "@/core/infrastructure/mongoose/entities/user.repository";
import { MongooseBase } from "@/core/infrastructure/mongoose/types";
import { MongooseUpdateProps } from "@/core/infrastructure/mongoose/types/implementations";

// 🧠👨‍🎓💡 Vamos a hacer la inyección aquí, SIN hacer EXPORT -> Así: nos aseguramos de solo utilizar la infra aquí(application)
// 🧠🚧⚠️ En el futuro -> trataremos de solo usar tipos de domain - PROHIBIDO usar tipos de mongoose aquí ya
const monUserRepository = new MongooseUserRepository()



export const listUsersByIdUC = async (id: string) => {
    return await monUserRepository.readById(id)
}

export const listUserByAddressUC = async (address: string) => {
    return await monUserRepository.findByAddress(address)
}

export const listUsersUC = async () => {
    return await monUserRepository.read({})
}

export const createUserUC = async (data: Omit<UserBase, "id">) => {
    return await monUserRepository.create(data)
}

export const findUserAndUpdateUC = async (
    props: MongooseUpdateProps<User<MongooseBase>>
) => {
    return await monUserRepository.update(props)
}
export const updateUserByIdUC = async (id: string, user?: Partial<UserBase> | undefined) => {
    return await monUserRepository.updateById({id, updateData:user})
}
export const deleteUserByIdUC = async (id: string) => {
    return await monUserRepository.deleteById(id)
}



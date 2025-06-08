import { RoleType } from "@/core/domain/entities/role.type";
import { ApiUserRepository } from "@/core/infrastructure/api/user.repository";
import { MongooseUserRepository } from "@/core/infrastructure/mongoose/entities/user.repository";
import { MongooseBase } from "@/core/infrastructure/mongoose/types";
import { MongooseUpdateProps } from "@/core/infrastructure/mongoose/types/implementations";
import { UserUpdateNodemailer } from "../../interfaces/entities/user";
import { LoginPayload, VerifyLoginPayloadParams } from "thirdweb/auth";

// 🧠👨‍🎓💡 Vamos a hacer la inyección aquí, SIN hacer EXPORT -> Así: nos aseguramos de solo utilizar la infra aquí(application)
// 🧠🚧⚠️ En el futuro -> trataremos de solo usar tipos de domain - PROHIBIDO usar tipos de mongoose aquí ya
const monUserRepository = new MongooseUserRepository()
const apiUserRepository = new ApiUserRepository()


export const mongooseListUsersByIdUC = async (id: string) => {
    return await monUserRepository.readById(id)
}//✅⚠️🚧

export const apiReadUserByIdUC = async (id: string) => {
    return await apiUserRepository.readById(id)
}//✅⚠️🚧

export const mongooseListUserByAddressUC = async (address: string) => {
    return await monUserRepository.findByAddress(address)
}//✅

export const apiReadUsersUC = async () => {
    return await apiUserRepository.readAll()
}//✅

export const mongooseListUsersUC = async () => {
    return await monUserRepository.read({})
} // ✅

export const mongooseCreateUserUC = async (data: Omit<UserBase, "id">) => {
    return await monUserRepository.create(data)
} // ✅
export const apiLoginUserUC = async (data:{payload: VerifyLoginPayloadParams}) => {
    return await apiUserRepository.login(data)
} // ✅

export const mongooseFindUserAndUpdateUC = async (
    props: MongooseUpdateProps<User<MongooseBase>>
) => {
    return await monUserRepository.update(props)
} // 🚧 -> used for pay - agora

export const mongooseUpdateUserByIdUC = async (id: string, user?: Partial<UserBase> | undefined) => {
    return await monUserRepository.updateById({id, updateData:user})
}// ✅
export const apiUpdateUserByIdSolicitudUC = async (id: string, solicitud: RoleType ) => {
    return await apiUserRepository.updateByIdSolicitud(id, solicitud)
}// ✅
export const apiUpdateUserByIdUC = async (props: UserUpdateNodemailer<MongooseBase>) => {
    return await apiUserRepository.update(props)    
}// ✅
export const mongooseDeleteUserByIdUC = async (id: string) => {
    return await monUserRepository.deleteById(id)
} // ✅
export const apiDeleteUserUC = async (props: {    payload: {
  signature: `0x${string}`;
  payload: LoginPayload;
}, id: string, address: string})=>{
    return await apiUserRepository.deleteById(props)
} // ✅
export const apiGiveRoleToUserUC = async (props: {payload: {
  signature: `0x${string}`;
  payload: LoginPayload;
}, id: string, solicitud: RoleType.ADMIN}) => {
    return await apiUserRepository.giveRole(props)
} 
export const apiVerifyEmailUC = async (props: { id: string, verifyToken: string}) => {
    return await apiUserRepository.verifyEmail(props)
} 


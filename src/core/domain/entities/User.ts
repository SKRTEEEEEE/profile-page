import { RoleType } from "./Role"

export class User implements UserBase {
    constructor(
        public id: string,
        public address: string,
        public roleId: string | null,
        public role: RoleType | null,
        public solicitud: RoleType | null,
        public img: string | null,
        public email: string | null,
        public createdAt: string,
        public updatedAt: string,
        public nick?: string,
        
    ){}
}
export type UserBase = {
    id: string,
    address: string,
    roleId: string | null,
    role: RoleType | null,
    solicitud: RoleType | null,
    img: string | null,
    email: string | null,
    nick?: string,

}
export type TUser = InstanceType<typeof User>
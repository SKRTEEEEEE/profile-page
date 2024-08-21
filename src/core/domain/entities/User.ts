export class User implements UserBase {
    constructor(
        public id: string,
        public address: string,
        public roleId: string | null,
        public isAdmin: boolean,
        public solicitudAdmin: boolean,
        public createdAt: string,
        public updatedAt: string,
        public nick?: string,
        
    ){}
}
export type UserBase = {
    id: string,
    address: string,
    roleId: string | null,
    isAdmin: boolean,
    solicitudAdmin: boolean,
    nick?: string,
}
export type TUser = InstanceType<typeof User>
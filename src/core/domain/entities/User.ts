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
    address: string,
    isAdmin: boolean,
    solicitudAdmin: boolean,
    roleId: string | null,
    nick?: string,
}
export type TUser = InstanceType<typeof User>
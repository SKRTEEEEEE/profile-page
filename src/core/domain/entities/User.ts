export class User {
    constructor(
        public id: string,
        public address: string,
        public isAdmin: boolean,
        public solicitudAdmin: boolean,
        public createdAt: string,
        public updatedAt: string,
        public nick?: string,
        public roleId?: string,
    ){}
}
export type TUser = InstanceType<typeof User>
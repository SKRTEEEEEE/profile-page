//auth.ts
export type FlattenAdmin = {
    userId: string;
    address: string;
  }
//users.ts
export type FlattenUsers = {
    nick?:string,
    address: string,
    isAdmin: boolean,
    solicitudAdmin: boolean,
    img?: string,
}
export enum RoleType {
    ADMIN = 'ADMIN',
    STUDENT = 'STUDENT',
    STUDENT_PRO = "STUDENT_P",
    //Ahora en beta
    PROF_TEST = "PROF_TEST",
    PROF = "PROF",
    PROF_PRO = "PROF_PRO"
    // Añade aquí más tipos de roles según sea necesario
  }
export class Role implements RoleBase {
    constructor(
      public id: string,
      public address: string,
      public permissions: RoleType,
      public createdAt: string,
      public updatedAt: string,
      public stripeCustomerId?: string,
      public subscriptionId?: string,
      public subscriptionStatus?: string,
    ) {}
  }
export type RoleBase = {
  id: string,
  address: string,
  permissions: RoleType,
  stripeCustomerId?: string;
  subscriptionId?: string;
  subscriptionStatus?: string;
}
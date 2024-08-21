export enum RoleType {
    ADMIN = 'ADMIN',
    STUDENT = 'STUDENT',
    STUDENT_PRO = "STUDENT_PRO",
    // Añade aquí más tipos de roles según sea necesario
  }
export class Role {
    constructor(
      public id: string,
      public address: string,
      public permissions: RoleType,
      public createdAt: string,
      public updatedAt: string
    ) {}
  }
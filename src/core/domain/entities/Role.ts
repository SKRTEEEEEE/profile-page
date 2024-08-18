export enum RoleType {
    ADMIN = 'ADMIN',
    USER = 'USER',
    STUDENT = 'STUDENT',
    STUDENT_PRO = "STUDENT_PRO",
    // Añade aquí más tipos de roles según sea necesario
  }
export class Role {
    constructor(
      public id: string,
      public name: string,
      public permissions: RoleType,
      public createdAt: Date,
      public updatedAt: Date
    ) {}
  }
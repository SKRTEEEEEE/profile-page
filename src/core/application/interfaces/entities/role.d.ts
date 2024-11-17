import { Role, RoleBase, RoleDocument, RoleType } from "@/core/domain/entities/Role";
import { MongooseBaseI, MongooseDeleteByIdI, MongooseDeleteI, MongooseReadI } from "@/core/infrastructure/mongoose/types/implementations";

// ⚠️🧠❕❗ -> ESTA PARTE HA DE SER COMO LA BIBLIA DE LA "APLICACIÓN" -> Aquí irán definidas las reglas de la app -> Estas reglas jamas utilizaran tipos de la infrastructura sino que estaran basadas en las entidades(domain) y errores de ahí. -> Esto se hace para el dia que se utilize otro tipo de infrastructure(repos distintos), esta parte sea independiente. 😀



export type RoleRepository<
  TBase,
  TPrimary extends TBase & MongooseBase,
  TDocument extends TBase & MongooseDocument,
> = MongooseBaseI<TBase, TPrimary> & 
  MongooseReadI<TPrimary> & 
  MongooseDeleteByIdI & 
  MongooseDeleteI;

# Migration Backend to NestJS
## Description
Migración de la parte de Backend de la aplicación - Clean Architecture, creada en NextJS, a NestJS.
## NestJS Clean Architecture 

```
src/
├── domain/
│   ├── entities/ -> types - .entitie.d.ts
│   └── errors/ -> 'manual' - .err.ts
│
├── infrastructure/
│   ├── connectors/ -> 'manual' - .conn.ts
│   ├── mongoose/
│   │   ├── types/ -> types - .d.ts -> 'folder based name' - patterns.d.ts, main.d.ts, implementations.d.ts
│   │   ├── entities/ -> ❓ provider - ❓ .provider.ts ❓.mongoose.ts -> 'entitie based name' - pre-tech.mongoose.ts, tech.mongoose.ts, ... 
│   │   ├── patterns/ -> 'manual' - .pattern.ts
│   │   ├── schemas/ -> schema - .schema.ts
│   │   └── implementations/ -> ❓ provider - ❓ .provider.ts ❓ .mongoose.ts -> 'CRUD function based name' - base.mongoose.ts, delete.mongoose.ts, ...
│   └── services/ -> ❓ provider - ❓
│
├── application/
│   ├── interfaces/ -> types - ❓ .d.ts
│   ├── use-cases/  -> service - ❓.service.ts ❓.use-case.ts
│   │   ├── entity/
│   │   │   ├── user/       // Seguramente no se utilizara carpeta
│   │   │   │   ├── create-user.use-case.ts
│   │   │   │   ├── find-user-by-id.use-case.ts
│   │   │   │   └── ...
│   │   │   └── role/
│   │   │       └── ...
│   │   └── service/
│   │       ├── email/
│   │       │   ├── send-welcome-email.use-case.ts
│   │       │   └── ...
│   │       └── ...
│   │
│   └── dtos/ -> 'manual' - .dtos.ts
│
├── presentation/            // Similar a tu interface-adapters/controllers
│   └── controllers/         // Orquestadores de casos de uso
│       ├── user.controller.ts
│       ├── role.controller.ts
│       └── ...
│
└── modules/                 // Organización por módulos (específico de Nest.js)
    ├── user.module.ts
    ├── role.module.ts
    └── app.module.ts
```

### Ventajas de este enfoque

1. **Mantiene casos de uso atómicos**: Cada caso de uso tiene una única responsabilidad
2. **Facilita las pruebas**: Los casos de uso pequeños son más fáciles de probar
3. **Mejora la reutilización**: Los casos de uso pueden combinarse de diferentes maneras
4. **Respeta tu arquitectura actual**: Mantiene la separación que ya has establecido
5. **Aprovecha las características de Nest.js**: Inyección de dependencias, decoradores, etc.


### Partes reutilizables entre Next.js y Nest.js
En cuanto a qué partes de tu arquitectura Clean podrías reutilizar entre tu backend Nest.js y frontend Next.js, tienes razón en tu intuición: el Domain es la capa principal que se puede reutilizar, pero con algunas consideraciones importantes.

#### 1. Capa de Dominio (Parcialmente reutilizable)

La capa de dominio es la más reutilizable, pero requiere adaptaciones:

- **Entidades base**: Las definiciones básicas de las entidades pueden compartirse, especialmente usando TypeScript.
- **Validaciones**: Si usas Zod para validaciones, puedes compartir los esquemas básicos de validación.
- **Errores de dominio**: La jerarquía de errores puede ser común.

```typescript
// Compartido entre frontend y backend
export interface UserEntity {
  id: string;
  name: string;
  email: string;
  role: string;
}

// Esquemas Zod compartidos
export const userSchema = z.object({
  id: z.string(),
  name: z.string().min(2),
  email: z.string().email(),
  role: z.string(),
});
```

Sin embargo, hay diferencias importantes:
- El backend necesita manejar todos los campos de la entidad (incluso sensibles como passwords)
- El frontend solo necesita los campos relevantes para la UI
- El backend incluirá reglas de negocio más complejas

#### 2. Data Transfer Objects (Parcialmente reutilizables)

Los DTOs para comunicación entre cliente y servidor pueden compartirse:

```typescript
// Compartido entre frontend y backend
export interface CreateUserDto {
  name: string;
  email: string;
  password: string;
}

export interface UpdateUserDto {
  name?: string;
  email?: string;
}

export interface UserResponseDto {
  id: string;
  name: string;
  email: string;
  role: string;
  createdAt: string;
}
```

#### 3. Constantes y Enumeraciones (Totalmente reutilizables)

```typescript
// Compartido entre frontend y backend
export enum UserRole {
  ADMIN = 'admin',
  USER = 'user',
  GUEST = 'guest',
}

export const PAGINATION_LIMITS = {
  DEFAULT: 10,
  MAX: 100,
};
```

#### 4. Utilidades (Parcialmente reutilizables)

Algunas funciones utilitarias pueden ser compartidas:

```typescript
// Compartido entre frontend y backend
export function formatDate(date: string | Date): string {
  return new Date(date).toLocaleDateString();
}

export function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^\w-]+/g, '');
}
```

#### Implementación práctica para compartir código

Para reutilizar código entre Next.js y Nest.js, puedes considerar estas opciones:

##### 1. Monorepo con paquetes compartidos

```
my-project/
├── packages/
│   ├── shared/              // Código compartido
│   │   ├── domain/
│   │   │   ├── entities/
│   │   │   └── errors/
│   │   ├── dtos/
│   │   ├── utils/
│   │   └── constants/
│   │
│   ├── frontend/            // Next.js frontend
│   │   └── ...
│   │
│   └── backend/             // Nest.js backend
│       └── ...
```

##### 2. Paquete npm privado

Crear un paquete npm privado con el código compartido e instalarlo en ambos proyectos.

##### 3. Git submodule

Utilizar un sub modulo de Git para el código compartido.

#### 🧠 App/interfaces
Esta parte también puede ser interesante compartirla.

## Autentificación

### RESUMEN - keys

#### HS256 vs RS256
-> En nuestro caso utilizamos RS256.
_Si no he entendido mal, Thirdweb prefiere RS256. Por lo tanto en el caso de pasar ambos se utilizara RS256. En el caso de utilizar createAuth({adminAccount: privateKeyToAccount(...)}), utilizamos RS256. En el caso de RS256, para comprobar el token necesitamos la LLAVE PUBLICA DE DICHA CUENTA_ 

### ✅ Enfoque propuesto

#### 🔁 Flujo general:

1. En Next.js (cliente + API):

   * Usas **Thirdweb para login y generación de JWT**
   * El JWT contiene el `address` y posiblemente `role`, firmado por Thirdweb (o por ti con su SDK)
2. En NestJS:

   * **Recibes ese JWT en las peticiones (Authorization header)**
   * Verificas ese JWT en tus endpoints (middleware o guard)
   * Si el token es válido, extraes `address` y `role`, y usas esa info

---

### 🎯 Qué necesitas para que esto funcione

#### 1. **Tener acceso a la `secretKey` o `publicKey` usada para firmar el JWT en Next.js**

* Si Thirdweb genera el JWT por ti, necesitas saber **cómo verificarlo en NestJS**.

  * Puede ser con una secret (`HS256`) o con una key pública (`RS256`)
  * El SDK de Thirdweb permite configurar esto si firmas el JWT tú

#### 2. **En NestJS: Verificar ese JWT**



#### 3. **Roles en el JWT**



### ✅ Conclusión

**Puedes perfectamente dejar que Thirdweb gestione todo el login en Next.js** y mantener NestJS como un backend que simplemente **verifica los JWTs**. Es un enfoque muy pragmático que:

* Te ahorra la lógica de nonce y firma en el backend
* Te da libertad de evolucionar más adelante
* Es seguro y controlado si manejas las claves correctamente


### ✅ Resumen de lo que **sí** necesitas y lo que **no**

#### 🔹 1. ¿Necesitas instalar Thirdweb en NestJS?

**❌ No.**
NestJS solo necesita **verificar** los JWT que han sido generados en Next.js usando Thirdweb (o firmados por ti con el SDK de Thirdweb). Esa verificación se puede hacer con `jsonwebtoken` o Passport-JWT en NestJS. Ejemplo:

```bash
npm install @nestjs/passport passport-jwt jsonwebtoken
```

Y luego simplemente usas la **misma `secret` o `publicKey`** para verificar, sin usar el SDK de Thirdweb.

---

#### 🔹 2. ¿Tienes que mantener la base de datos en Next.js?

**❌ Tampoco.**

Lo ideal es que toda la lógica de negocio, incluida la persistencia, esté **en NestJS** (dentro de la infraestructura de tu arquitectura clean). Lo que pasa es que **como Thirdweb gestiona el login en Next.js**, allí puedes manejar el primer guardado del usuario si no existe (por ejemplo, justo después del login).

Pero una vez autenticado, cualquier lógica de usuario puede ir al backend (NestJS). Ejemplo:

* Thirdweb genera el JWT tras el login (con `address` y posiblemente `role`)
* El frontend hace `fetch` a NestJS con el token en `Authorization: Bearer <token>`
* NestJS valida el token, y ahí puedes acceder a la base de datos para buscar info del usuario, actualizar roles, etc.

---

### 🔁 ¿Qué se mantiene en Next.js y qué pasa a NestJS?

| Parte                              | Se queda en Next.js (con Thirdweb) | Pasa a NestJS                 |
| ---------------------------------- | ---------------------------------- | ----------------------------- |
| Login con wallet / Thirdweb        | ✅                                  | ❌ (no necesario ahora)        |
| Firma y generación del JWT         | ✅                                  | ❌                             |
| Verificación del JWT               | ❌                                  | ✅ con `jsonwebtoken`          |
| Base de datos: gestión completa    | ❌ (opcional si ya lo haces ahí)    | ✅ (ideal a largo plazo)       |
| Roles, permisos, lógica de negocio | ❌                                  | ✅ (en NestJS con Guards, etc) |

---


## ✅ **Correspondencia entre tu estructura actual para NestJS y las plantillas de NestJS**

| 📁 Tu carpeta (NEXTJS)                          | 📁 Destino en NestJS             | 🧩 Plantilla CLI equivalente                | ✅ Comando CLI NestJS                                                    |
| ----------------------------------------------- | -------------------------------- | ------------------------------------------- | ----------------------------------------------------------------------- |
| `core/domain/entities/`                         | `domain/entities/`               | ❌ No tiene plantilla oficial                | ➜ Lo creas tú manualmente                                               |
| `core/domain/errors/`                           | `domain/errors/`                 | ❌ No tiene plantilla oficial                | ➜ Manual (puedes meter clases `extends Error`)                          |
| `core/infrastructure/connectors/`               | `infrastructure/connectors/`     | ❌ No tiene plantilla oficial                | ➜ Manual (por ejemplo, `mongo-db.ts`)                                   |
| `core/infrastructure/mongoose/schemas/`         | `mongoose/schemas/`              | ✅ `schema` (cuando usas `@nestjs/mongoose`) | `nest g schema nombre --no-spec`                                        |
| `core/infrastructure/mongoose/entities/`        | `mongoose/entities/`             | ✅ `provider` o solo interfaces              | `nest g provider nombre.repository --flat --no-spec`                    |
| `core/infrastructure/mongoose/implementations/` | `mongoose/implementations/`      | ✅ `provider`                                | `nest g provider nombre --flat --no-spec`                               |
| `core/infrastructure/mongoose/patterns/`        | `mongoose/patterns/`             | ❌ No tiene plantilla oficial                | ➜ Manual (utils de Mongo o clase base de repos)                         |
| `core/infrastructure/services/`                 | `infrastructure/services/`       | ✅ `provider`                                | `nest g provider email.service --flat --no-spec`                        |
| `core/application/interfaces/`                  | `application/interfaces/`        | ❌ No tiene plantilla oficial                | ➜ Manual (interfaces puras `.d.ts`)                                     |
| `core/application/use-cases/entity/`            | `application/use-cases/entity/`  | ✅ `service` (aunque sea use-case)           | `nest g service nombre --flat --no-spec`                                |
| `core/application/use-cases/service/`           | `application/use-cases/service/` | ✅ `service`                                 | `nest g service send-welcome-email --flat --no-spec`                    |
| `core/application/dtos/`                        | `application/dtos/`              | ❌ No tiene plantilla oficial                | ➜ Manual (clases con `@IsString`, `@IsEmail` si usas `class-validator`) |
| `core/interface-adapters/controllers/`          | `presentation/controllers/`      | ✅ `controller`                              | `nest g controller nombre --flat --no-spec`                             |
| (no existe en Next)                             | `modules/`                       | ✅ `module`                                  | `nest g module nombre --flat`                                           |

---

### 🧠 Notas útiles

* Nest te obliga a **pensar por módulos**, lo que puedes mapear muy bien con tu estructura: cada `controller` y `use-case` de una entidad podría estar en un módulo propio (`UserModule`, `RoleModule`, etc).
* Si tu `mongoose/implementations/` implementa repositorios concretos, esos se consideran **`providers`** en Nest, y los inyectas como dependencias en los use-cases (`services`) o controladores.
* Los DTOs en Nest suelen ser clases decoradas con `class-validator`, aunque tú podrías seguir usando Zod y validarlo en los controladores manualmente.


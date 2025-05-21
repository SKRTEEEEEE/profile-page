```
core/
├── domain/
│   ├── entities/               // Tipos base puros (también zod schemas)
│   │   ├── base.entity.ts       
│   │   ├── user.entity.ts
│   │   ├── role.entity.ts
│   │   └── leng.entity.ts
│   │
│   └── errors/                 // Tipos base de errores
│       └── domain.error.ts
│
├── infrastructure/
│   ├── connectors/             // "Client" de las infraestructuras -> base que se extiende
│   │   └── mongo-db.ts
│   │
│   ├── mongoose/               // Infraestructura de base de datos
│   │       ├── types/          // Base types
│   │       │   ├── implementations.d.ts        
│   │       │   ├── index.d.ts     
│   │       │   └── patterns.d.ts   
│   │       │
│   │       ├── entities/                  // Clase para tipar la infraestructura de cada entidad
│   │       │   ├── base.repository.ts
│   │       │   ├── user.repository.ts
│   │       │   ├── role.repository.ts
│   │       │   └── leng.repository.ts
│   │       │
│   │       ├── patterns/                 // Patrones de funciones re utilizables
│   │       │   ├── crruud1.pattern.ts    // Repository base pattern --> Create, ReadAll, ReadById, Update, UpdateById, DeleteById
│   │       │   ├── crruud2.pattern.ts
│   │       │   ├── pre-tech.pattern.ts   //❌ No debería tener patrones para entities específicos
│   │       │   └── role.pattern.ts         
│   │       │
│   │       ├── schemas/                 // Esquema de mongoose
│   │       │   ├── base.schema.ts       
│   │       │   ├── user.schema.ts
│   │       │   ├── role.schema.ts
│   │       │   └── leng.schema.ts
│   │       │
│   │       └── implementations/          // Implementaciones concretas de funciones re-utilizables
│   │           ├── base.repository.ts
│   │           ├── cru.repository.ts
│   │           ├── delete.repository.ts
│   │           └── [...] populate.repository.ts
│   │
│   └── services/                // Infraestructura de 'servicios' (otras funciones de backend externas diferentes a bdd - API, SDK,    etc.. -)
│       ├── email.service.ts
│       ├── payment.service.ts
│       └── [...] authentication.service.ts
│
├── interface-adapters/
│   └── controllers/              // Casos de uso generales (varias entities, services) - 'implementación final'
│       └── [...] user.controller.ts - or - user.ts
│
└── application/
    ├── interfaces/              // Interfaces atómicas (de métodos)
    │   ├── entity/              // Para entidades
    │   └── service/             // Para 'servicios' (otras funciones de backend externas diferentes a bdd - API, SDK, etc.. -)
    │       └── [...] auth.d.ts
    │
    ├── use-cases/              // Casos de uso atómicos - específicos, 'individuales' (no mezclan lógica de otras entities o servicios) 
    │   ├── entity/              // Para entidades - puede ser 'implementación final'
    │   └── service/             // Para 'servicios' (otras funciones de backend externas diferentes a bdd - API, SDK, etc.. -)
    │       └── [...] auth.ts
    │
    └── dtos/                   // ❌ -NOT STILL USED- DTOs para la capa de aplicación
        ├── user.dto.ts
        ├── role.dto.ts
        └── leng.dto.ts

```
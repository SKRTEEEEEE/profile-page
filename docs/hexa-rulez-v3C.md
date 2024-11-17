```
project_root/
├── domain/
│   ├── entities/
│   │   ├── base.entity.ts       // Interfaces base puras
│   │   ├── user.entity.ts
│   │   ├── role.entity.ts
│   │   └── leng.entity.ts
│   │
│   ├── repositories/            // Interfaces de repositorio puras
│   │   ├── base.repository.ts
│   │   ├── user.repository.ts
│   │   ├── role.repository.ts
│   │   └── leng.repository.ts
│   │
│   └── errors/
│       └── domain.error.ts
│
├── infrastructure/
│   ├── connectors/              // Mantenemos tu nomenclatura actual
│   │   └── mongo-db.ts
│   │
│   ├── entity/
│   │   └── mongoose/           // Mantenemos la estructura mongoose
│   │       ├── types/
│   │       │   ├── base.types.ts        // MongooseBase, TimestampBase
│   │       │   ├── document.types.ts     // MongooseDocument
│   │       │   └── operations.types.ts   // Tipos de operaciones
│   │       │
│   │       ├── mappers/                  // NUEVO: Capa de mappers
│   │       │   ├── base.mapper.ts
│   │       │   ├── user.mapper.ts
│   │       │   ├── role.mapper.ts
│   │       │   └── leng.mapper.ts
│   │       │
│   │       ├── patterns/                 // Mantenemos patterns pero simplificados
│   │       │   ├── base.pattern.ts       // Repository base pattern
│   │       │   ├── user.pattern.ts
│   │       │   ├── role.pattern.ts
│   │       │   └── leng.pattern.ts
│   │       │
│   │       └── implementations/          // Implementaciones concretas
│   │           └── repositories/         // Unificamos los repos en uno
│   │               ├── base.repository.ts
│   │               ├── user.repository.ts
│   │               ├── role.repository.ts
│   │               └── leng.repository.ts
│   │
│   └── services/                // Mantenemos la estructura de servicios
│       ├── email.service.ts
│       ├── payment.service.ts
│       └── authentication.service.ts
│
└── application/
    ├── interfaces/              // Mantenemos tu estructura de interfaces
    │   ├── entity/
    │   │   └── repositories/   // Pero solo para casos específicos de aplicación
    │   │       └── custom.repository.ts
    │   └── service/
    │       └── services/
    │
    ├── use-cases/              // Casos de uso específicos
    │   ├── user/
    │   ├── role/
    │   └── leng/
    │
    └── dtos/                   // DTOs para la capa de aplicación
        ├── user.dto.ts
        ├── role.dto.ts
        └── leng.dto.ts

```
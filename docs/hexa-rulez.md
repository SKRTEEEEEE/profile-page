# Hexa rulez

# Hexagonal rules
_Updated 01.09 - branch `hexa-v2`_

## Introducción
Este repositorio tiene como objetivo definir las mejores prácticas posibles para una aplicación hexagonal realizada con NextJs

Aqui intentare definir:

- Estructura carpetas definida
- Reglas y objetivos apartados definidos
- Dudas surgidas durante el proceso y,
- Formas de abordar las dudas
- Información sobre arquitectura hexagonal
    - Importancia de la separación
    - Uso de apartados


## Clean architecture
### Reglas y objetivos v2
**Resumen en español:**

**¿Qué es la Arquitectura Limpia (Clean Architecture) y cuáles son sus beneficios?**

- La Arquitectura Limpia es un conjunto de reglas que te ayudan a estructurar tu aplicación de manera que sea fácil de mantener y probar, y que su código sea predecible.
- Funciona como un "lenguaje común" que los desarrolladores entienden, sin importar su lenguaje de programación.
- Su objetivo principal es la separación de responsabilidades, introduciendo "capas" que agrupan código similar.
- Las capas permiten que el código sea independiente de la interfaz de usuario (UI), de la base de datos y de cualquier entidad externa. Además, facilita la testabilidad del código.
- Esto se logra definiendo una jerarquía de dependencias, donde las capas solo dependen de las capas inferiores, pero no de las superiores.
**¿Cómo estructura el código la Arquitectura Limpia?**

- La Arquitectura Limpia divide la base de código en las siguientes capas:
    1. **Frameworks & Drivers**: Contiene toda la funcionalidad del framework de UI. Por ejemplo, en Next.js, esto incluye los manejadores de rutas, acciones del servidor, componentes, etc.
    2. **Adaptadores de Interfaz**: Define los controladores (que orquestan los casos de uso) y los presentadores (que convierten los resultados de los controladores en un formato adecuado para la UI). Los controladores manejan la validación de entrada antes de pasarla a los casos de uso específicos.
    3. **Aplicación**: Contiene la lógica de negocio de la aplicación, incluyendo los "Casos de Uso", que definen operaciones específicas y gestionan la autorización.
    4. **Entidades**: Mantiene las definiciones de los modelos, errores y cualquier cosa que defina la forma de los datos.
    5. **Infraestructura**: Implementa las interfaces de la capa de Aplicación, incluyendo servicios compartidos, implementaciones de base de datos y servicios externos.
### Estructura carpetas core ⚠️🖊️
#### app/use-cases
- **atomic**
    - Aqui van use-cases de func con "entitie" y el use-case solo utiliza su "infra/repo"
    - Nombre de la "entitie"
        - ejemplo: `User -> **user.ts**`
    - **< **`**entitie**`** .ts >**
- **compound**
    - Aqui van use-cases de func con "entitie" y utilizan varios "infra/repo"
    - Nombre de la "entitie" principal
        - ejemplo: `User -> **user.ts**`
    - **< **`**entitie**`** .ts >**
- **services**
    - Aqui van use-cases de func de services y el use-case solo utiliza su "infra/service"
    - Nombre del "infra/service" el cual usa 
        - ejemplo: `uploadthing-img -> **img.ts**`
    - **< **`**service**`** .ts >**
#### app/services
- Tipado de funciones que proveerá el servicio, ?¿ y otros tipos de tipado proveniente del servicio¿?
- Nombre del servicios el cual es el principal 
    - ejemplo: `auth, usecase/auth, auth-repo, etc...-> **auth.ts**`⚠️🧑‍💻FALTA TERMINAR‼️
- ** < **`**service**`** .d.ts >**
#### app/repos
- Nombre de la entidad la cual se utilizara 
    - ejemplo: `para User -> **user.d.ts**`
- **< **`**entitie**`** .d.ts >**
#### domain/entities
- Nombre de la entidad, en **mayusculas**
    - ejemplo entidad: `usuarios-> **User.ts**
- **< **`**Entitie**`** .ts >**
#### domain/errors
- Nombre de los errores, agrupación por archivos por definir
#### infra/repos
- Nombre de el proveedor, junto con el nombre del "app/repo",
    - ejemplo: `user.ts -> **mongoose-user.ts**`
- **< **`**provider**`**-**`**app/repo**`** .ts >**
#### infra/services
- Nombre de el proveedor, junto con el nombre del "app/service",
    - ejemplo: `img-> **uploadthing-img.ts**
- **< **`**provider**`**-**`**app/service**`** .ts >**
#### infra/conn (adapters)
- Nombre del proveedor, junto con tipo de servicio separado por "-"
    - ejemplo: `uploadthing-img -> **uploadthing-st.ts**`
- **`types`**
    - `st` -> Storage (used for big files)
    - `db` -> Databases
    - `auth` -> Authentication
    - `comm` -> Communications
    - Other... 
- **< **`**provider**`** - **`**type**`**  .ts >**


## Graficos


![Clean Arch](./img/clean-arch-export-1-9-2024-12_20_53.png)

![image.png](https://eraser.imgix.net/workspaces/IWxmuP747p51TzWwWeQp/tPNoyguwX4NkLJrSfkArLhioXeN2/8ePB4gUcbJh19zEemYtJl.png?ixlib=js-3.7.0 "image.png")



***

## Page folders 🖊️⚠️⬇️
- (navbar) -> (about-me)
    - /about-me -> `/especialidades` 
    - /portfolio -> `/open-source` 
    - /services -> `/mis-estudios` 
    - /code -> `/desarrollos-blockchain` 
- (routes) -> (?main?)
    - /dashboard/config, /dashboard, etc.. ✅
    - /admin/users, /admin, etc... ✅
    - /projects -> `/proyectos-desplegados` 
    - .
    - `/academia` 
    - pg presentación academia, con ultimos ej
        - `/ejercicios` 
        - pg con varios ejercicios y selector por temas
        - _ejercicios para realizar y aprender sobre temas concretos_
            - `/[...slug]` 
            - pg con un ej en concreto
        - `/temas-ejercicios` 
        - pg con todos los temas
            - `/[tema]` 
            - pg con los ej de un tema en concreto





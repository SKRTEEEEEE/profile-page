# Información detallada

## Propósito general

Crear un landing page vinculado y que se auto actualize junto con mi perfil de Github cuando se añada o modifique:
- Alguna tecnología usada, _y su info relacionada_.
- Algún curso realizado, _y su info relacionada_.
- Algún proyecto, _y su info relacionada_.

### v00 -> Basic Frontend

### v01 -> Badges techs

Crear tres _badges_ interactivos (sobre las tecnologías utilizadas), que al modificar-se la información en la BDD (desde la pagina web) se modifique la información de los _badges_. Los tres _badges_ serán:

> - Afinidad: 5 palabras, HARDCODEADO

> - Experiencia: 1-5, con estrellas si es posible, HARDCODEADO 

> - Uso: %, con la api de github se detectara al crear un proyecto
>   - OPCIÓN 1 -> Buscar las "etiquetas" del repositorio y que estas sean las techs usadas
>   - OPCIÓN 1 -> Crearse una petición en el admin para que hardcodee los datos de las techs usadas
>   - Con las techs usadas, hacer el % que se ha usado dentro de todos los proyectos, _p.ej: Si hay 15 repos y se ha utilizado una tech 5, tendrá un 30%_.

> Los _badges_ se intentara, en este orden, que sean:
>   1. Badges del estándar de [shields.io](https://shields.io/) 
>   2. Tres _graphics cards_ 
>   3. Una _graphic card_ para toda la información

#### v01.01 -> test/create afinidad y experiencia

Creación del test del badge con la info de la afinidad y la experiencia. Y tratar de enviar-lo a un repositorio de prueba en Github a traves de la api rest.

##### CRUD "techs" -> cambios en markdown y bdd
#### v01.02 -> fix revalidate refresh
##### Searching the bug
##### Clean code and better docs
#### v01.03 -> test/create users y admins
Creación de la lógica de autentificación usando JWT, blockchain y bdd. Principalmente para limitar las acciones para los administradores.
- thirdweb sdk5 -> for login with blockchain(embadded wallet incl. using FB, email, GOOGLE, APPLE)
- useIsAdmin() -> personalized hook for manage blockchain and bdd users/admins, in the CLIENT
- adminOnlyAction() -> personalized function for limit actions (SSR) to admins, using blockchain validation and bdd validation
##### JWT with Thirdweb auth
##### CRUD "admins" 
##### CRUD "users"


## [Esquemas](resum.md)
### [Esquema arquitectura web](resum.md/#arquitectura-web)

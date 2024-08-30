<img src="https://user-images.githubusercontent.com/73097560/115834477-dbab4500-a447-11eb-908a-139a6edaec5c.gif">

# Next-hexa-test
<a href="https://github.com/SKRTEEEEEE">
<div align="center">
  <img  src="https://github.com/SKRTEEEEEE/SKRTEEEEEE/blob/main/resources/img/grid-snake.svg"
       alt="snake" />
</div>
</a>

<dialog>
  <p>Greetings, one and all!</p>
</dialog>

## Información
Test de arquitectura hexagonal con NextJs 14
### Tecnologías y herramientas utilizadas
- [**nextjs**](https://nextjs.org/)
- [**tailwindcss**](https://tailwindcss.com/)
- [**shadcn ui**](https://ui.shadcn.com/)
- [**mongo db**](https://www.mongodb.com/docs/)
- [mongodb atlas](https://www.mongodb.com/docs/atlas/getting-started/)
- [mongoose](https://mongoosejs.com/docs/guide.html)
- [**velite**](https://velite.js.org/)
- [next-themes](https://github.com/pacocoursey/next-themes)
- [github-slugger](https://www.npmjs.com/package/github-slugger/v/1.2.1)
- [tailwindcss typography](https://github.com/tailwindlabs/tailwindcss-typography)


## Proceso

### 1. Estructura app (back)
#### `npx create-next-app@latest`
#### Estructura hexagonal
#### Creación domain y app
### 2. Users (back)
#### Creación _infrastructure/domains_ "in-memory"
#### "Create" user & "Read" users
#### "Update" user
#### "Delete" user
### 3. Rol (back)
#### "Create" rol
#### "Update" rol
### 4. MongoDb (back)
#### Instalación dependencias
#### Creación _infrastructure/domains_
#### Adaptación a mejor app (bdd/backend)
### 5. Thirdweb (back)
#### Creación arquitectura hexagonal
- [ ] Revisar las funciones limitadas en [`thirdweb-auth-repository`](/src/core/infrastructure/repositories/thirdweb-auth-repository.ts)
#### Modificar "jwt" cuando el user modifica su info
#### El Usuario puede eliminar su perfil
- [x] Se traspasa la lógica de deleteUserAccount de actions a application
#### El Administrador puede conceder la Administración a otros usuarios, que lo solicitan previamente.
### 6. Uploadthing (back)
#### Funciones con arq hexagonal para update and upload image y integración para user.img
#### Usuario puede no subir imagen y modificar sus datos
#### Rename name files and document it
### 7. Velite (front)
#### Configurar rutas principales y documentar
#### Configurar navegador `(main)`
#### Configurar switch themes
#### Utilizar velite para mostrar ejercicios
**ACTUALIDAD**
**FUTURO**
#### El Administrador puede eliminar un usuario
- _Directamente se optara por la opción de vetar ya que no tiene lógica que elimine sin notificar ni nada._
- [ ] El Administrador puede vetar de la app ciertas carteras/users

## [Recursos](https://github.com/SKRTEEEEEE/markdowns)
### [Project rules 🖊️🧑‍💻](/docs/hexa-rulez.md)

## Contacto

### Agradecimientos

### Licencia

### Información de Contacto

#### [Envíame un mensaje](mailto:adanreh.m@gmail.com)

### Contribuciones y Problemas

Si encuentras problemas o deseas contribuir al proyecto, por favor, crea un issue en el repositorio.

<img src="https://user-images.githubusercontent.com/73097560/115834477-dbab4500-a447-11eb-908a-139a6edaec5c.gif">

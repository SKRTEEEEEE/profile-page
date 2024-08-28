<img src="https://user-images.githubusercontent.com/73097560/115834477-dbab4500-a447-11eb-908a-139a6edaec5c.gif">

# Next-hexa-test
<a href="https://github.com/SKRTEEEEEE">
<div align="center">
  <img  src="https://github.com/SKRTEEEEEE/SKRTEEEEEE/blob/main/resources/img/grid-snake.svg"
       alt="snake" />
</div>
</a>

<dialog open>
  <p>Greetings, one and all!</p>
</dialog>


Test de arquitectura hexagonal con NextJs 14

## Proceso

### 1. Estructura app
#### `npx create-next-app@latest`
#### Estructura hexagonal
#### Creación domain y app
### 2. Users
#### Creación _infrastructure/domains_ "in-memory"
#### "Create" user & "Read" users
#### "Update" user
#### "Delete" user

### 3. Rol
#### "Create" rol
#### "Update" rol

### 4. MongoDb
#### Instalación dependencias
#### Creación _infrastructure/domains_
#### Adaptación a mejor app (bdd/backend)
### 5. Thirdweb
#### Creación arquitectura hexagonal
- [ ] Revisar las funciones limitadas en [`thirdweb-auth-repository`](/src/core/infrastructure/repositories/thirdweb-auth-repository.ts)
#### Modificar "jwt" cuando el user modifica su info
#### El Usuario puede eliminar su perfil
- [x] Se traspasa la lógica de deleteUserAccount de actions a application
#### El Administrador puede conceder la Administración a otros usuarios, que lo solicitan previamente.
**ACTUALIDAD**
### 6. Uploadthing
**FUTURO**
#### El Administrador puede eliminar un usuario
- Directamente se optara por la opción de vetar ya que no tiene lógica que elimine sin notificar ni nada.
- [ ] El Administrador puede vetar de la app ciertas carteras

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

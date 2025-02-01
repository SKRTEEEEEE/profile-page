# Proceso
[Link a actualidad](#actualidad)
## 1. Estructura app (back)
### `npx create-next-app@latest`
### Estructura hexagonal
### Creación domain y app
## 2. Users (back)
### Creación _infrastructure/domains_ "in-memory"
### "Create" user & "Read" users
### "Update" user
### "Delete" user
## 3. Rol (back)
### "Create" rol
### "Update" rol
## 4. MongoDb (back)
### Instalación dependencias
### Creación _infrastructure/domains_
### Adaptación a mejor app (bdd/backend)
## 5. Thirdweb (back)
### Creación arquitectura hexagonal
- [ ] Revisar las funciones limitadas en [`thirdweb-auth-repository`](/src/core/infrastructure/services/thirdweb-auth.ts)
### Modificar "jwt" cuando el user modifica su info
### El Usuario puede eliminar su perfil
- [x] Se traspasa la lógica de deleteUserAccount de actions a application
### El Administrador puede conceder la Administración a otros usuarios, que lo solicitan previamente.
## 6. Uploadthing (back)
### Funciones con arq hexagonal para update and upload image y integración para user.img
### Usuario puede no subir imagen y modificar sus datos
### Rename name files and document it
## 7. Velite (front)
### Configurar rutas principales y documentar
### Configurar navegador `(main)`
### Configurar switch themes
### Utilizar velite para mostrar ejercicios
### Dar estilos a los archivos mdx utilizando plugins
## 8. Mailchamp (back)
### Configurar mailchamp y sus repositorios
### Configurar updateUser para que cuando configure su correo se verifique
### Crear verifyUser para que verifique el token
- [ ] Comprobar si el hash se debe utilizar así
- _Estamos usando **mailtrap** de momento_
- [ ] Configurar correos en un entorno real
## 9. Reestructurar arquitectura hexagonal (back)
## 10. Mejora lógica validation y role (full)
### El usuario se le envía un correo de verificación cuando pone un correo en el formulario
- [x] Hay que manejar cuando el usuario se le pasa el tiempo de validación
- [x] Hay que notificar al usuario que se le ha enviado un correo que ha de verificar en menos de media hora
- [x] Hay que notificar al usuario cuando no haya validado su correo aun
### Modificar el botón login para que sea mas funcional
- [x] Mostrar un cuadrado en el layout de (main): _se puede hacer aun mas personalizado pasando-le el render como props opcionales_
### Modificar la lógica de ser Admin/Profesor
- [x] El admin o profesor se puede solicitar una vez configurado el correo en la configuración del usuario
## 11. Saas students (full)
- _Actualmente: El usuario solicita ser student en el formulario, y si este a configurado el correo se le aprueba el student_
### Modificar la lógica de ser Student
- [x] El usuario introducirá su tarjeta para ser Student o Student_pro, el primer mes gratis luego mensualidad.
- [x] Al aver pagado se modificara los datos en la bdd por stripe webhooks
- [x] Aplicar los botones para pagar en el dialog
    - [x] Detectar el plan actual y mostrar botones acorde
## 12. Reestructuración y importar web antigua (full) [merge-old]
### Importar web "antigua/actual"
- [x] Agrupar componentes en carpetas
<details><summary><h4>Dependencias</h4></summary>

```bash
npm i @tsparticles/react @tsparticles/slim
```

```bash
npm i framer-motion
```

```bash
npm install react-type-animation
```

```bash
npm install react-icons --save
```

```bash
npm i swiper
```

```bash
npm i react-countup
```

```bash
npm i @octokit/rest
```
- **nextui** -> *uninstalled*

    ```bash
    npm i @nextui-org/react
    ```

    ```bash
    npm i @react-stately/data
    ```

```bash
npm i react-countup
```
</details>

#### Eliminar NextUi
- [x] Terminar de eliminar NextUI y desinstalar-lo
#### Techs form
- [x] Incluir upload imágenes
- [x] Permitir ver el formulario aunque no se haya iniciado session (pero no accionar el delete)
- [x] Mejorar frontend:
    - [x] Mejorar/usar mayus en el name
    - [x] Mejorar autocomplete p1 (faltaria hacer un personalizado para el name)
    - [x] Mejorar color y prefe (poner cuadrado input mas peque y al lado del title)
    - [x] Mejorar expe y afinidad (poner input mas peque al lado del title y al lado el total escojido)


## 13. Reestructurar clean arch v3 p1 (back) 
### Pasar backend techs a clean
- [x] Pasar techs functionalities to clean arch
### Crear parte "about me" de markdowns
- [x] Mirar si se puede hacer con md en vez de mdx
### Migrar a NextJs 15
- [Información](https://nextjs.org/blog/next-15)
- 💡 Optamos por el comando de codemods: `npx @next/codemod@canary upgrade latest`
- [x] Ejecutar el comando de migración y esperar que nada pete 🫠
- [x] Solucionar el error de re-hidratación de next-themes: esta en [theme-provider switch component](../src/components/oth/theme-provider.tsx) probablemente 🧎‍♂️‍➡️💨
- [x] Solucionar el error de re-hidratación de third-web 


## 14. Frontend & fix
### next-themes
- [x] Cuando se modifique next-themes: 
    - [x] **Hay que fijar-se/solucionar en el error de re-hidratación**

        Este ocurre cuando entramos directamente a **cualquier ruta**, excepto [la principal / root](http://localhost:3000)
- [x] Mejorar el frontend, mejorando los temas, y comprobando la correcta utilización de tailwind en todos los componentes **p1**
- [x] Traducir todo a Español
- [ ] Unificar lógica del main(grid-layout)
    - [x] mínimo: Las partes que utilizan el `site-header` component
### Oth
#### Tech table
- [x] Terminar parte mobile
#### Migración 15.1
- [x] Migrar Nextjs a la version 15.1 con React en version estable
#### Tech dialog
- [x] Tratar de encontrar el causante del problema del id
    - Era un error de un elemento vacío (<></>) que envuelve una función componente 
- [x] Responder acciones del servidor con `toast()`
### Internalization (en/es/de/ca) `i18n`
- [x] Pasar la parte de web3 a la i18n (asi eliminamos la parte de bdd que no tiene clean arch)
- [x] Hay que arreglar los links de academia y admin page-parts
## Fix
- [x] Arreglar error estructura md
    - [Para ello seguir el patron de este md](https://github.com/SKRTEEEEEE/markdowns/blob/main/about/techs.md?plain=1)
- [x] Arreglar mal performance en tech-dialog, que cuando el usuario introduce un dato incorrecto solo se muestra en la pantalla correspondiente y debería aparecer en la parte común también
## 15. Reestructurar techs (full)
**Tener en cuenta los siguientes puntos(clean arch v3 p2)**
- [x] Adoptar enfoque DB/Redis, para recuperar la lista de techs-simpleicons -> creando SimpleIconsTechRepository etc, con getTechList y updateTechList
- [x] Reestructurar el modelo de la bdd para en la futura UI y mejorar UX
- [x] Rehacer el tech-dialog
    - [x] Hacer el auto-incremental de la preferencia (tech)
    - [x] Añadir en el step 1 el fetch de pre-tech, permitiendo al usuario cambiar la web y mostrando el color (no hace falta mostrar el nameBadge)
    - [x] Comprobar el uso de update
    - [x] Mejorar el form de update -> v1 - no permitir cambiar el nombre, tampoco cambiar la cat -> se ha de eliminar para eso
    - [x] Limitar la ultima acción al administrador
    - [x] Terminar el updateTech: incluir el re-fetch pretechs button
    - [x] **En el step-two** hay que limitar la **imagen a 1mb**
    - [x] En el deleteImg, hay que eliminar todas las img de los techs anidados
##### **ACTUALIDAD**
### fix
- [x] Arreglar updateMd
    - [x] Problema con el SHA en updateMd
- [x] Comprobar el uso de nameBadge/nameId con los badges (actualizarJson)
#### volver a comprobar el CRUD de techs
- [ ] Se eliminan correctamente varios?
- [x] **edit:** libs
- [x] **updateMd:** creo que al hacer update de la bdd no se elimina el espacio en el badge principal poreso no se ve correctamente el nombre, cosa que al crear no pasa

### refactor
- [❓] Campo web, ??seguramente haremos que el usuario pueda tener un campo web especifico, pero sera distinto al web del pretech
#### func tech -> delete.controller.ts
- [x] Hacer que se borren todas las imágenes en el caso de eliminar un leng o fw
## 16. Upgrade de parte projects
### Empezar a guardar los datos en la base de datos

## 1x. Mejorar frontend  (Clean Code, estructura, metadatos) 
- [ ] Definir estructura types del frontend --donde los pondremos, cuando debemos crear uno, etc..
- [ ] Definir estructura lib, unificar archivos, mejorar nombres, etc...
- [ ] Empezar a trabajar la parte de metadatos de la sección de 'sobre mi'
- [❓] Cambiar el nombre de ceo a admin?

## 1x. Reestructurar clean arch v3 p2 (back)
- [x] **REVISAR ERROR CON LOS STATE DE LA IMG** en el form de techs
### Revisar connectors
- [ ] Mirar que hacer con las **funciones de los connectors que se utilizan en el Framework**, como client de thirdweb o ourFileRouter de uploadthing que creo que ni se utiliza.
- [x] Traspasar octokit a clean arch

### Manejar correctamente los UC, C y acciones

- [ ] Utilizar e unificar un mensaje de respuesta correctamente
- [ ] **Acción de DAR ADMIN** es un muy buen ejemplo de aver que pasa

- [ ] Documentar lógica UC y C: _Los UC serán los individuales y los C los compound_

- [ ] Manejar correctamente los estados de todos los componentes
- [ ] Manejar correctamente los redirect y revalidate(en revalidate cuando sea necesario revalidate la pagina actual, que sea dinámico según la pagina en la que esta)
#### Techs
- [ ] Revisar que no se ejecute dos veces el updateMd y updateJson 
#### Utilizar un mensaje de respuesta unificado
- [ ] Responder a las acciones del servidor con `toast`
    - [ ] Aplicar toast en el tech-form (tech-dialog)
- [ ] Utilizar toast para manejar los estados
    - [ ] En el caso de que el usuario configure un perfil se le ha de mostrar toast
    - [ ] Si el usuario configura el correo mostrar otro toast conforme se le ha enviado o ha habido error
    - [ ] En el caso de cerrar session
##### Ejemplo mensaje unificado backend
**OPCIÓN A**
```ts
type Mensaje<T> = {
    success: boolean
    message?: string
    data?: T
}
```
**OPCIÓN B**
```ts
type Mensaje<T> = {
    success: true
    data?: T
    message?: string
} | {
    success: false
    message?: string
}
```
#### Mejorar errores correctamente


### Regresar a la web al poner tarjeta
    - [ ] Si se ha efectuado correctamente hay que modificar el jwt, ?haciendo-le firmar?
    - [ ] Manejar los casos con toast()


### Despliegue
- [x] Hay que cambiar el ATLAS env secret para que apunte a la nueva colección, en el despliegue de next-hexa-test, para que funcione con los datos de profile-page(actual), igual que en el local.

## 1x. Documentar toda la nueva arquitectura de la app (frontend, clean arch, backend)(names, folders, func-folders..)
## 1x. Comprobar uso stripe en despliegue (back)

<br/><br/>


<br/>

> **EXTRA: FUTURO**
> ---
> #### El Administrador puede eliminar un usuario
> - _Directamente se optara por la opción de vetar ya que no tiene lógica que elimine sin notificar ni nada._
> - [ ] El Administrador puede vetar de la app ciertas carteras/users

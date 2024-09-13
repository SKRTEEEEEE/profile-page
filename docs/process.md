# Proceso
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
- [x] Mostrar un cuadradito en el layout de (main): _se puede hacer aun mas personalizado pasando-le el render como props opcionales_
### Modificar la lógica de ser Admin/Profesor
- [x] El admin o profesor se puede solicitar una vez configurado el correo en la configuración del usuario
**ACTUALIDAD**
## 11. Saas students (full)
- _Actualmente: El usuario solicita ser student en el formulario, y si este a configurado el correo se le aprueba el student_
- [ ] Modificar la lógica de ser Student
    - [ ] El usuario introducira su tarjeta para ser Student o Student_pro, el primer mes gratis luego mensualidad.
    - [ ] Al aver pagado se modificara los datos en la bdd por stripe webhooks
- [ ] Al regresar a la web de poner tarjeta, se volvera a /academia?stipe=
    - [ ] Si se ha efectuado correctamente hay que modificar el jwt, ?haciendo-le firmar?
    - [ ] Manejar los casos con toast()
## 1x. Reestructuración acciones (full)
- [ ] Manejar correctamente las acciones
    - [ ] Utilizar un mensaje de respuesta correctamente
    - [ ] Utilizar toast para manejar los estados
    - [ ] Manejar correctamente los estados de todos los componentes
- [ ] Manejar correctamente los redirect y revalidate(en revalidate cuando sea necesario revalidate la pagina actual, que sea dynamico segun la pagina en la que esta)

- [ ] Mirar que hacer con las **funciones de los connectors que se utilizan en el Framework**, como client de thirdweb o ourFileRouter de uploadthing que creo que ni se utiliza.

- [ ] Mejorar el frontend, mejorando los temas, y comprobando la correcta utilización de tailwind en todos los componentes

<br/><br/>


<br/>

> **EXTRA: FUTURO**
> ---
> #### El Administrador puede eliminar un usuario
> - _Directamente se optara por la opción de vetar ya que no tiene lógica que elimine sin notificar ni nada._
> - [ ] El Administrador puede vetar de la app ciertas carteras/users

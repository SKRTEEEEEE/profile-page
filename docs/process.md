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
## 1x. Reestructuración acciones, core y componentes (full)
**ACTUALIDAD**
- [ ] Traducir todo a Español
- [x] Agrupar componentes
### Migrar a web antigua
### Dependencias
- [`tsparticles`](https://github.com/tsparticles/react/#readme)

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

```bash
npm i react-countup
```
```bash
npm i react-countup
```
```bash
npm i react-countup
```


- [ ] Manejar correctamente los UC y C
    - [ ] Documentar lógica UC y C: _Los uc serán los individuales y los C los compound_
### Responder a las acciones del servidor con `toast`
### Manejar correctamente las acciones
- [ ] Utilizar un mensaje de respuesta correctamente
- [ ] **Acción de DAR ADMIN** es un muy buen ejemplo de aver que pasa
- [ ] Utilizar toast para manejar los estados
    - [ ] En el caso de que el usuario configure un perfil se le ha de mostrar toast
    - [ ] Si el usuario configura el correo mostrar otro toast conforme se le ha enviado o ha habido error
- [ ] Manejar correctamente los estados de todos los componentes
- [ ] Manejar correctamente los redirect y revalidate(en revalidate cuando sea necesario revalidate la pagina actual, que sea dinámico según la pagina en la que esta)
#### Regresar a la web al poner tarjeta
    - [ ] Si se ha efectuado correctamente hay que modificar el jwt, ?haciendo-le firmar?
    - [ ] Manejar los casos con toast()

- [ ] Mirar que hacer con las **funciones de los connectors que se utilizan en el Framework**, como client de thirdweb o ourFileRouter de uploadthing que creo que ni se utiliza.

- [ ] Mejorar el frontend, mejorando los temas, y comprobando la correcta utilización de tailwind en todos los componentes
## 1x. Comprobar uso stripe en despliegue (back)
## xx. Migrar a web real/antigua

<br/><br/>


<br/>

> **EXTRA: FUTURO**
> ---
> #### El Administrador puede eliminar un usuario
> - _Directamente se optara por la opción de vetar ya que no tiene lógica que elimine sin notificar ni nada._
> - [ ] El Administrador puede vetar de la app ciertas carteras/users

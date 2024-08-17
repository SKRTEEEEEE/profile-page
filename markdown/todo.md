# ToDo
## Remembers
### Remember 07.2024 (Actual)
#### Other
- [ ] **CLEAN CODE**
    - [ ] **Actions**
    - [ ] Unificar lógica 'Github sha' en la parte del deleteTech() + extraer doDelete()    _FALTA TEST_
    - [ ] **Components**
    - [ ] Unificar lógica de los nombres y documentarlo: 
        - [ ] MAIN: Hay que terminar el componente autoplay-slider-techs y eliminar el de prueba si es necesario
        - [x] ROUTES
    - [x] **Utils** 
    - [x] Rename badges file
    - [x] **Types** v.01.04.1
    - [x] Search a logical structure for the project, use it and document it in Readme files

#### Backend
- [ ] **Unificar lógica techs (Data y BDD)**
    - [ ] Hay que actualizar la bdd de los techs para incluir la información de la data (hard-cdd)
    - [ ] También unificar la lógica de las imágenes/logos
    - [ ] Actualizar el formulario de las techs para recoger la nueva información
- [x] **uploadthing** terminar crud imagenes techs
    - [x] Hacer el create image
    _de momento se queda asi_
    - [ ] Falta adaptar a upload
        - [ ] Falta mostrar la imagen o algo cuando se ha subido?
    - [x] Hacer el delete image
    - [x] Hacer el read
- [ ] **uploadthing** terminar crud imagenes user
    - [x] create
    - [ ] update, ⚠️ FALTA hacer la logica de borrar imagen y subir la nueva
- [ ] Borrar user
    - [ ] delete, imagen user!!
#### Frontend 
- [ ] **Actualizar Admin Page**
    - [x] Hacer Techs Admin Page (para el update, delete) TERMINAR CRUD
    - [ ] Actualizar Users Admin Page 
- [ ] **Actualizar Dashboard Page**
    - [ ] Actualizar config page
- [ ] **Empezar Frontend techs (about-me page)**
    - [ ]Empezar el Read del CRUD de las techs en la pagina web.
#### Documentación
#### Test

### Dudas/buggs
#### Switch Account button -> "revalidate" JWT
Al utilizar la acción del botón Switch Account del botón de Login, no se actualiza correctamente el JWT
#### Aceptación usuario nuevo admin, -> "revalidate" info and JWT
Creo, ? al aceptar un nuevo usuario como admin, y este iniciarse, nose si recoje correctamente la info de que ahora es Admin(revalidatePath?)???



***

## Versions
###  v02
#### Make a parallax 3d welkome page
- [ ] Separar el navbar actual y ponerlo solo para (navbar) pages "folder"

#### "name" Formulario-tech
- [ ] Configurar "Switch" para en el Formulario-techs, en el name (titulo) poder marcar cuando nuestra tech no tiene logo
- [ ] Crear botón actualizar ListOfIcons
    - [ ] Update createListOfIcons fetch from online page?.

## Others Versions/Ideas

### Make option to create your own profile and techs etc markdowns offering it as SAAS using web3 aventajes

***

## Template
### Estructura "to-do's" v01
#### Documentación
#### Frontend 
#### Backend
#### Other
#### Test

***
## Remember meses antiguos
### Nuevo mes _primero_

### Remember 05.2024
#### Documentación
- [x] Terminar documentación ¿v01.01?
#### Frontend 
- [x] Poner el favicon ? [x] Test?
- [x] Mejorar Frontend main("/") page
##### - [x] Mejorar Frontend projects & projectDyn page
- [x] Mejorar/crear botones projectDyn & projects pages
    - [x] Para ir a la pagina web del proyecto
        - [x] Si el proyecto es /# (osea que aun no esta desplegado, o esta en la misma pagina, etc..) no mostrar botón
    - [x] Para ir al github del proyecto
        - [x] Si el proyecto es /# osea que aun no esta desplegado no mostrar botón
- [x] Mejorar Frontend projectDyn page
    - [x] Objetivos a de ocupar menos visualmente, sobretodo en xl
    - [x] Crear botones para proyectos (parte superior)
#### Backend
#### Other
- [x] Crear handlers errors
- [x] Llamar a las funciones por separado desde el cliente
#### Test
##### - [x] Test v01.01.01 Backend techs CRUD
- [x] Update ->Librería, Framework y Lenguaje
- [x] Create ->Librería, Framework y Lenguaje
- [x] Delete cascada ->Lenguaje y Framework 
- [x] Delete ->Librería, Framework y Lenguaje
### Remember 06.2024
#### Test
- [x] **Test de los revalidatePath() y redirect()**
    - [ ] En la accion de hacer Admin a un usuario, no hace falta redirigir a la ruta principal solo refrescar
    - [x] Revisar uso en el cliente, en las funciones (NO-BADGES): _"En todas las funciones (MENOS LAS CREATE) se hace uso de revrd() functions"_
    - [x] Es necesario✅ hacer uso de revalidatePath() en los "fetch data":   _/?Creo que ya esta_
    - [x] Falta comprobar las funciones de auth: _?Creo, no es necesario ya que estas manejan el jwt y no 'acciones'?_ 
#### Documentación
- [x] Actualizar documentación v01.02
#### Other
- [x] **Averiguar porque no hace el Create desde el móvil**
    - El create, y el Delete no funcionan en VERCEL
    - Esta fallando por tiempo de ejecución superior a 10sec (Limite para funciones SINCRÓNICAS)
    - No se actualizaba automáticamente por el uso del `revalidatePath()` y del `redirect()`:
        - En muchas funciones no se utilizaba y ¿en las que si se utilizaba mal?
        - [x] Test que la función updateMd() y updateJson() no sea necesario el uso de redirect(), ya que esta en medio de las ejecuciones y no al final.
- [x] **Configurar el analytics de Vercel!!!**    _FALTA TEST_


*** 

## Random things

### Badges techs "label":

#### Afinidad: 
%F0%9F%92%97Afinidad
#### Experiencia:
%F0%9F%8F%85Experiencia
#### Uso en Github:
%F0%9F%98%BBUso%20en%20github
##### Words uso Github por %
0 - Sin uso -> 0 huecos
0 - 0.05%: Ínfimo
0.05 - 0.2%: Minúsculo -> 1 hueco
0.2 - 0.5%: Bajo 
0.5 - 1.0%: Reducido -> 2 huecos
1.0 - 1.5%: Menor 
1.5 - 2.5%: Moderado - 3 huecos
2.5 - 4.0%: Notable 
4.0 - 6.0%: Alto - 4 huecos
6.0 - 9.0%: Elevado
9.0 - 14.0%: Superior
>14.0%: Dominante -> 5 huecos

### Redondas para marcar la cantidad (sin uso)
14%: 🟡🔘🔘🔘🔘
13%: 🟡🟡🔘🔘🔘
12%: 🟡🟡🟡🔘🔘
11%: 🟡🟡🟡🟡🔘
10%: 🟡🟡🟡🟡🟡

### Lista bdd techs:

#### name
Nombre de la tecnología.
#### afinidad
Afinidad de la tecnología.
#### badge
Badge(o titulo, en caso de no aver) estandard de la tecnología.
<!-- descripcion: Descripción breve de la tecnología (opcional). -->
#### preferencia: 
Numero correspondiente al orden dentro de su "categoria"
#### "categoria"
Objeto (con nombre) que describen la categoría o tipo de la tecnología que contiene _(por ejemplo, [Framework->"NextJS"]>[Libreria->"NextUI"] para JavaScript)_.

#### Json vercel
- func para darle mas tiempo pero no lo consigo ejecutar correctamente
```json
  // "functions": {
  //   "admin/techs": {
  //     "maxDuration": 60
  //   },
  //   "admin/techs/new": {
  //     "maxDuration": 60
  //   }
  // },
```







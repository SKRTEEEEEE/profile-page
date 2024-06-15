# ToDo
## Remembers
### Remember 05.2024 (Actual)

#### Documentación
- [ ] Terminar documentación v01.02

#### Frontend 

- [ ] Hacer AdminPages Sections
    - [x] Hacer Techs Admin Page (para el update, delete) TERMINAR CRUD


##### - [ ] Empezar Frontend techs (about-me page)
Empezar el Read del CRUD de las techs en la pagina web.
#### Other
##### - [x] Averiguar porque no hace el Create desde el móvil
- El create, y el Delete no funcionan en VERCEL
- Esta fallando por tiempo de ejecución superior a 10sec (Limite para funciones SINCRÓNICAS)
- No se actualizaba automáticamente por el uso del `revalidatePath()` y del `redirect()`:
    - En muchas funciones no se utilizaba y ¿en las que si se utilizaba mal?
    - [ ] Test que la función updateMd() y updateJson() no sea necesario el uso de redirect(), ya que esta en medio de las ejecuciones y no al final.


##### - [ ] Unificar lógica techs (Data y BDD)?
##### - [ ] Configurar el analytics de Vercel!!!
#### Test



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
### Estructura "todos" v01
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







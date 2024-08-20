<img src="https://user-images.githubusercontent.com/73097560/115834477-dbab4500-a447-11eb-908a-139a6edaec5c.gif">

# Next-hexa-test
<a href="https://github.com/SKRTEEEEEE">
<div align="center">
  <img  src="https://github.com/SKRTEEEEEE/SKRTEEEEEE/blob/main/resources/img/grid-snake.svg"
       alt="snake" />
</div>
</a>
Test de arquitectura hexagonal con NextJs 14

## Proceso

### 1. Estructura user + "in memory repos"
#### `npx create-next-app@latest`
- Iniciar la aplicación usando el comando de NextJs, usando la carpeta "src".
#### Estructura hexagonal
- Definir las carpetas de una arquitectura hexagonal, en una carpeta llamada "core".
#### Creación domain y app
- Para esta aplicación tendremos que cumplir estas reglas:
  - Usuarios con: id(único, puedes generarlo con la fecha + nombre), nombre, roleId (id que lo vincula a otra tabla con su rol, el cual podrá no existir, con lo cual significara que es un usuario normal), createdAt(timestamp de creación) y updatedAt(timestamp de edit).
  - Roles con: id(único, puedes generarlo con la fecha + nombre), nombre(nombre del usuario), permissions (tipo de permiso, definido en un enum, con las opciones: "ADMIN", "STUDENT", "STUDENT_PRO"), createdAt(timestamp de creación) y updatedAt(timestamp de edit).
  - 🙋‍♂️💡⏫ Para este caso puedes utilizar tipos "string" para las fechas, ya que no usaremos persistencia para nuestro primer repositorio de infraestructura.
  - Para los repositorios, necesitaremos definir funciones para "CRUD", en el caso del "Read", buscaremos por id y también todos en el caso de los usuarios. En el caso de los roles definiremos una función para devolver todos los "roles" con un permissions especifico (por ejemplo, todos los administradores)
  - Creación de los use-cases necesarios.
#### `InMemoryUserRepository`, "Create" user and "Read" users
- Crear `InMemoryUserRepository`.
- En "actions", crearemos funciones para "Create" usuarios, utilizando SSR.
- En nuestra pagina, implementaremos un componente con un formulario para crear el usuario. Puedes utilizar estos template para empezar:
```html 
  <!-- Componente -->
  <div>
    <h2 className="text-2xl font-bold mb-4">Create User</h2>
    <form className="space-y-4">
      <div>
        <label htmlFor="name" className="block font-medium text-gray-700">
          Name
        </label>
        <input
          type="text"
          id="name"
          name="name"

          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
        />
      </div>
      <button
        type="submit"
        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
      >
        Create User
      </button>
    </form>
  </div>
```
```tsx
  <!-- Pagina -->
  <main  className="container mx-auto py-8 px-4 sm:px-6 lg:px-8">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
    <UserForm/>
    <!-- <UsersTable/> Componente para el "Read" -->
    </div>
  </main>
```

- Haremos lo mismo con el "Read", el cual deberá devolver todos los usuarios. Puedes utilizar este template:

```html
  <div>
    <h2 className="text-2xl font-bold mb-4">Users</h2>
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Name
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Action
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          <!--por cada usuario-->
            <tr>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">Pepe</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  <a
                    className="text-primary hover:text-primary-dark mr-4"
                  >
                    Edit
                  </a>
                  
                </div>
              </td>
            </tr>
          <!--💡🙋‍♂️⏫ Ten en cuenta que esto solo es un template HTML 😉 -->
        </tbody>
      </table> 
    </div>
  </div>
```
#### "Update" user
- Crearemos la acción de hacer update en actions, implementando-la en una pagina dinámica, la cual utilizara el componente del formulario del usuario.
- ⚠️➡️ Solo tendremos un formulario para el usuario, el cual se utilizara para crear y hacer update.
- Implementaremos un botón en la tabla de usuarios, que al hacer click nos lleve al formulario para hacer update del usuario escogido (en el template de la tabla puedes encontrar unos estilos para utilizarlo).
#### "Delete" user
- Crearemos la acción de hacer delete, implementando-la en un componente, el cual utilizaremos en la tabla de usuarios. Para el botón puedes utilizar este template:
```html
  <button className="text-red-500 hover:text-red-700">
            Delete
  </button>
```
#### Estructura rol
- Para este punto deberías tener hecho ya la estructura hexagonal de los rol. Incluido el repositorio `InMemoryRoleRepository`. Si hay alguna parte que aun no has hecho deberías terminarla en esta parte.
- 💡🧠 ➡️ En este punto, piensa que use-cases serán necesarios y usarán solo el repositorio `InMemoryRoleRepository`.
#### "Create" rol
- Creamos la funcionalidad de crear un rol, al necesitar modificar el user para asignarle el id del su rol, recomendamos crear un "service", al utilizar ambos repositorios.
#### "Update" rol
- Creamos a la funcionalidad de modificar un rol, recomendamos en "services" también.
- 🧠⚠️⏫ Recuerda que en el caso de que es usuario se modifique para ser de nuevo un usuario corriente, habrá que marcar como null su roleId.



## [Recursos](https://github.com/SKRTEEEEEE/markdowns)

## Contacto

### Agradecimientos

### Licencia

### Información de Contacto

#### [Envíame un mensaje](mailto:adanreh.m@gmail.com)

### Contribuciones y Problemas

Si encuentras problemas o deseas contribuir al proyecto, por favor, crea un issue en el repositorio.

<img src="https://user-images.githubusercontent.com/73097560/115834477-dbab4500-a447-11eb-908a-139a6edaec5c.gif">

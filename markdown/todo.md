# ToDo
## Remembers
### Remember 05.2024 (Actual)

- [ ] Mejorar/crear botones projectDyn & projects pages
    - [x] Para ir a la pagina web del proyecto
        - [ ] Si el proyecto es /# osea que aun no esta desplegado no mostrar botón
    - [ ] Para ir al github del proyecto
        - [ ] Si el proyecto es /# osea que aun no esta desplegado no mostrar botón

- [ ] Mejorar Frontend main("/") page
- [x] Mejorar Frontend projects page
- [ ] Mejorar Frontend projectDyn page
    - [ ] Objetivos a de ocupar menos visualmente, sobretodo en xl

#### - [ ] Configurar el analytics de Vercel!!!


### Remember meses antiguos
## Versions
###  v02

#### Make a parallax 3d welkome page
- [ ] Separar el navbar actual y ponerlo solo para (navbar) pages "folder"

## Others Versions/Ideas

### Make option to create your own profile and techs etc markdowns offering it as SAAS using web3 aventajes






## Random things

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






##### IDK
github.com/SKRTEEEEEE/markdowns/blob/profile-page/sys/techs-test.json

##### JS
![Afinidad](https://img.shields.io/badge/dynamic/json?url=https://raw.githubusercontent.com/SKRTEEEEEE/markdowns/profile-page/sys/techs-test.json&query=$[?(@.name=='Javascript')].value&label=Afinidad&color=F7DF1E&style=flat&logo=Javascript)![Afinidad %](https://img.shields.io/badge/dynamic/json?url=https://raw.githubusercontent.com/SKRTEEEEEE/markdowns/profile-page/sys/techs-test.json&query=$[?(@.name=='Javascript')].afinidad&color=F7DF1E&style=flat&label=%20&suffix=%25)



## Typescript
![Typescript Afinidad](https://img.shields.io/badge/dynamic/json?url=https://raw.githubusercontent.com/SKRTEEEEEE/markdowns/profile-page/sys/techs-test.json&query=$[?(@.name=='Javascript')].afinidad&suffix=%25&label=Afinidad%20|%20$[0].value&color=blue&style=flat&logo=javascript&logoColor=white)





```js
- ${proyecto.name} (Afinidad: ${proyecto.afinidad})`).join('\n')}\n- Express (Afinidad: ${afinidad})
```
```js
    const newMdContent = 
`# Tecnologías y Lenguajes de Programación\n_Documentación de lenguajes, tecnologías (frameworks, librerías...) de programación que utilizo._\n\n
<p align="center">
<a href="#">
    <img src="https://skillicons.dev/icons?i=solidity,ipfs,git,github,md,html,css,styledcomponents,tailwind,js,ts,mysql,mongodb,firebase,vercel,nextjs,nodejs,express,react,redux,threejs,py,bash,powershell,npm,vscode,ableton,discord&perline=14" />
</a>
</p>\n\n\n***\n\n<br>\n${proyectosDB.map((proyecto) => {
const colorAfinidad = afinidadColores[proyecto.afinidad];
return(`- [![${proyecto.name}](https://img.shields.io/badge/-${proyecto.name}-F7DF1E?style=for-the-badge&logo=${proyecto.name.toLowerCase()}&logoColor=black)](${proyecto.web}) ![Afinidad ${proyecto.afinidad}](https://img.shields.io/badge/dynamic/json?url=https://raw.githubusercontent.com/SKRTEEEEEE/markdowns/profile-page/sys/techs-test.json&query=$[?(@.name=='${proyecto.name}')].afinidad&label=Afinidad&color=${colorAfinidad}&style=flat)
`)})}\n
- [![${name}](https://img.shields.io/badge/-${name}-F7DF1E?style=for-the-badge&logo=${name.toLowerCase()}&logoColor=black)](${web}) ![Afinidad ${afinidad}](https://img.shields.io/badge/dynamic/json?url=https://raw.githubusercontent.com/SKRTEEEEEE/markdowns/profile-page/sys/techs-test.json&query=$[?(@.name=='${name}')].afinidad&label=Afinidad&color=blue&style=flat)
`;
```
# ToDo

## Remember 05.2024 (Actual)

- [ ] Mejorar/crear botones projectDyn & projects pages
    - [x] Para ir a la pagina web del proyecto
        - [ ] Si el proyecto es /# osea que aun no esta desplegado no mostrar botón
    - [ ] Para ir al github del proyecto
        - [ ] Si el proyecto es /# osea que aun no esta desplegado no mostrar botón

- [ ] Mejorar Frontend main("/") page
- [x] Mejorar Frontend projects page
- [ ] Mejorar Frontend projectDyn page
    - [ ] Objetivos a de ocupar menos visualmente, sobretodo en xl

## Remember v02

### Make a parallax 3d welkome page
- [ ] Separar el navbar actual y ponerlo solo para (navbar) pages "folder"

## Remember meses antiguos



## Random things

github.com/SKRTEEEEEE/markdowns/blob/profile-page/sys/techs-test.json

##### JS

![JavaScript Afinidad](https://img.shields.io/badge/dynamic/json?url=https://raw.githubusercontent.com/SKRTEEEEEE/profile-page/v01/data/techs.json&query=$[?(@.name=='Javascript')].afinidad&suffix=%25&label=Afinidad&color=blue&style=flat)
![JavaScript Afinidad](https://img.shields.io/badge/dynamic/json?url=https://raw.githubusercontent.com/SKRTEEEEEE/markdowns/profile-page/sys/techs-test.json&query=$[?(@.name=='Javascript')].afinidad&suffix=%25&label=Afinidad&color=blue&style=flat)
![Afinidad](https://img.shields.io/static/v1?label=Afinidad&message=|||||&color=blue&style=flat)
![Afinidad](https://img.shields.io/badge/dynamic/json?url=https://raw.githubusercontent.com/SKRTEEEEEE/profile-page/v01/data/techs.json&query=$[?(@.name=='Javascript')].afinidad&label=Afinidad&colorA=blue&colorB=green&style=progress)
![Afinidad](https://img.shields.io/badge/dynamic/json?url=https://raw.githubusercontent.com/SKRTEEEEEE/profile-page/v01/data/techs.json&query=$[?(@.name=='Javascript')].afinidad&label=Afinidad&colorA=blue&colorB=green&style=progress)
![Progreso](https://progress-bar.dev/75/?title=Progreso&width=200&color=green)

## Typescript
![Typescript Afinidad](https://img.shields.io/badge/dynamic/json?url=https://raw.githubusercontent.com/SKRTEEEEEE/markdowns/profile-page/sys/techs-test.json&query=$[?(@.name=='Typescript')].afinidad&suffix=%25&label=Afinidad&color=blue&style=flat)




![Afinidad afinidad](https://img.shields.io/badge/dynamic/json?url=https://raw.githubusercontent.com/SKRTEEEEEE/markdowns/profile-page/sys/techs-test.json&query=$[?(@.name=='Javascript')].afinidad&suffix=%25&label=Afinidad&color=blue&style=flat)



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
# Rulez
## Bazik
### typez
- *Analizar según las reglas que se vayan definiendo donde debe estar actual `app/interfaces/entities`*
#### Domain
- Solo utilizar tipos de ts
- *Como excepción temporal:* se permite utilizar `zod`
#### App
- Utilizar tipos del core y app, y de ts

- *En el futuro:* Eliminar el uso de tipos provenientes de la infrastructure

### general
- Hay que mejorar/crear unos `app/interfaces/entities` bien pensado para diferentes `infra` que de alguna manera se adapten a las diferentes infra/[tech]/entities
#### Infra
- **Hay que cambiar los nombres de los pattern:** 
    - De: nombre de la entitie *(a la que se le aplica)* -> a -> un nombre general 
    - Ya que cada pattern se podra usar para varias entitie en la carpeta/seccion `infra/mongoose/entities`

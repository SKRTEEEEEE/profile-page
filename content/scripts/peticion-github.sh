#!/bin/bash

# Reemplaza con el nombre de usuario que quieres consultar
USERNAME="SKRTEEEEEE"

# Hacer la petición a la API de GitHub
echo "Obteniendo repositorios para el usuario: $USERNAME"
curl -s "https://api.github.com/users/$USERNAME/repos" > repos.json

# Usando grep para buscar los nombres y el estado de archivado
echo "Repositorios y su estado de archivado:"
grep -E '"name"|"archived"' repos.json | paste - - | sed 's/"name": "//g' | sed 's/"archived": //g' | sed 's/",//g' | sed 's/}//g'

# Buscar repositorios archivados
echo -e "\nRepositorios archivados:"
grep -B 1 '"archived": true' repos.json | grep "name" | sed 's/"name": "//g' | sed 's/",//g'
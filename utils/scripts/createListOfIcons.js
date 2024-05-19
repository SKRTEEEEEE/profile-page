"use server"


import fs from "fs"
// const path = require('path');

export const createListOfIcons = () => {
// Leer el archivo markdown
const mdFilePath = "./data/slugs.md"
const mdFileContent = fs.readFileSync(mdFilePath, 'utf-8');
// console.log(mdFileContent);
// Extraer los datos de la tabla
const lines = mdFileContent.split('\n');
const slugs = [];
// console.log(lines);

for (let i = 9; i < lines.length; i++) {  // Empezar desde la tercera línea
    const line = lines[i];
    
    const match = line.match(/\| (.+?) \| (.+?) \|/);
    if (match) {
      const [, , slug] = match;
      
      const cleanedSlug = slug.replace(/`/g, '');
      slugs.push({ name: cleanedSlug });
    }
  }
// return slugs;

//   // Crear el contenido del archivo TypeScript sin los backticks
const tsContent = `// Auto-generated file

const techBadges: {name: string}[] = [
  ${slugs.map(slug => `{ name: "${slug.name}" }`).join(',\n  ')}
];

export default techBadges;
`;
// // Escribir el archivo TypeScript
const tsFilePath =  './data/slugs.ts';
fs.writeFileSync(tsFilePath, tsContent, 'utf-8');

console.log('Archivo TypeScript generado correctamente.');
}



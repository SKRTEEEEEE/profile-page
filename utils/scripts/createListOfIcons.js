"use server"

import https from "https";
import fs from "fs";

export const createListOfIcons = () => {
    const url = 'https://raw.githubusercontent.com/simple-icons/simple-icons/master/slugs.md';

    https.get(url, (res) => {
        let mdFileContent = '';

        res.on('data', (chunk) => {
            mdFileContent += chunk;
        });

        res.on('end', () => {
            // Extraer los datos de la tabla
            const lines = mdFileContent.split('\n');
            const slugs = [];

            // Empezar desde la décima línea (índice 9)
            for (let i = 9; i < lines.length; i++) {
                const line = lines[i];

                const match = line.match(/\| (.+?) \| (.+?) \|/);
                if (match) {
                    const [, , slug] = match;

                    const cleanedSlug = slug.replace(/`/g, '');
                    slugs.push({ name: cleanedSlug });
                }
            }

            // Crear el contenido del archivo TypeScript sin los backticks
            const tsContent = `// Auto-generated file

const techBadges: {name: string}[] = [
${slugs.map(slug => `{ name: "${slug.name}" }`).join(',\n  ')}
];

export default techBadges;
`;

            // Escribir el archivo TypeScript
            const tsFilePath = './data/slugs.ts';
            fs.writeFileSync(tsFilePath, tsContent, 'utf-8');

            console.log('Archivo TypeScript generado correctamente.');
        });

    }).on('error', (err) => {
        console.error('Error al obtener el archivo de GitHub:', err.message);
    });
};



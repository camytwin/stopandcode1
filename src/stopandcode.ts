import fs from 'node:fs';
import path from 'node:path';
import {DateTime} from "luxon";
import chalk from "chalk";



//CREO FUNZIONE PER STAMPARE STRUTTURA DELLA CARTELLA DOCUMENTI:

export const printDirectoryStructure = (documentiPath:string, indent:string = ' '): void => {

    
    
    const entities = fs.readdirSync(documentiPath, { withFileTypes: true }); //legge la directory del path e mi specifica il tipo di file

    for (const entity of entities) {
        const fullPath = path.join(documentiPath, entity.name);
        const stats = fs.statSync(fullPath);
        const lastModifiedDate = DateTime.fromJSDate(stats.mtime).toFormat('dd/MM/yyyy HH:mm');

        console.log(`${indent}${entity.isDirectory() ? '|--📁' : '|--📄'} ${entity.name} ${!entity.isDirectory() ? `(ultima modifica: ${lastModifiedDate})` : ''}`);


        if (entity.isDirectory()) {
            printDirectoryStructure(fullPath, indent + '|   ');
        }
    };     

}




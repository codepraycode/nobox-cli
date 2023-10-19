import { readFile } from "fs/promises";

// Load Token
export const loadToken = async() =>{

    const filePath = './config.json';
    const content = await readFile(filePath, { encoding: 'utf8' });

    const config = JSON.parse(content)
    
    return config.token
}

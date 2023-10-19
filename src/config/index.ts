
// Environment variable parser
const isDevelopment =  process.env.NODE_ENV === 'development';

const api_url = process.env.API_URL || 'https://api.nobox.cloud';


export {
    isDevelopment, api_url  
}
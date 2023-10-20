
// Environment variable parser
const isDevelopment =  process.env.NODE_ENV === 'development';

const api_url = process.env.API_URL || 'https://api.nobox.cloud';
const env_token = process.env.NOBOX_TOKEN || '';

export {
    isDevelopment, api_url, env_token
}
import 'dotenv/config'


export default {
    mongo_url: process.env.MONGO_CONNECTION,
    endpoint: process.env.API_URL,
    tokenKey: process.env.JWT_TOKEN_KEY,
    port: process.env.PORT,
    session_secret: process.env.SESSION_SECRET,
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
    GOOGLE_CALLBACK_URL: process.env.GOOGLE_CALLBACK_URL,
}

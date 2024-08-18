import express from 'express'
import dotenv from 'dotenv'
dotenv.config()
import con from './Db/connection.js'
import web from './routes/web.js'
const app = express()
const port = process.env.PORT
const db_url = process.env.DATABASE_URL

import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

con(db_url)
app.use(express.urlencoded({extended:false}))

app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use('/',web)

app.listen(port,()=>{
    console.log(`port run on http://localhost:${port}`)
})
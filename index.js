import express from 'express'
import dotenv from 'dotenv'
dotenv.config()
import con from './Db/connection.js'
import web from './routes/web.js'
const app = express()
const port = process.env.PORT
const db_url = process.env.DATABASE_URL

con(db_url)
app.use(express.urlencoded({extended:false}))

app.set('view engine','ejs')
app.use('/',web)

app.use((req, res, next) => {
    res.setHeader("Content-Security-Policy", "default-src 'self'; img-src 'self' data:; media-src 'self' data:; script-src 'self'; style-src 'self'");
    next();
});


app.use(express.static('public'))

app.listen(port,()=>{
    console.log(`port run on http://localhost:${port}`)
})
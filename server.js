import express from 'express'
import logger from 'morgan'
import connectMongoDB from './config/db.js'
import authRoute from './routes/authRoute.js'

const app = express()
const PORT = process.env.PORT || 4000

connectMongoDB()//Connectd to MongoDb
//Middleware
app.use(logger('dev')) //Logging middleware
app.use(express.json()) //Middleware to parse JSON data
app.use(express.urlencoded({ extended: true })) //parse application/x-www-formurlencoded, string and array

app.get('/', (req, res) => {
    return res.status(200).json({ message: 'API Mobile-App' })
})

app.use('/api/auth', authRoute) //Auth router

app.listen(PORT, () => {
    console.log(`SERVER running on http://localhost:${PORT}`)
})
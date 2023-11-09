import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import { db } from "./config/database.js"
import router from "./routes/router.js"
import bodyParser from "body-parser"

const app = express()

app.use(cors())
app.use(bodyParser.json({ limit: '30mb', extended: true }))
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }))
dotenv.config()
db()

 
app.use('/', router);

const PORT = process.env.PORT;


app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
})


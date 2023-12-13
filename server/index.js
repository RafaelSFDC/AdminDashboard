import express from "express"
import mongoose from "mongoose"
import cors from "cors"
import bodyParser from "body-parser"
import morgan from "morgan"
import dotenv from "dotenv"
import helmet from "helmet"

import clientRoutes from "./routes/client.js"
import generalRoutes from "./routes/general.js"
import manegementRoutes from "./routes/manegement.js"
import salesRoutes from "./routes/sales.js"

// ===============================================================
// CONFIG
// ===============================================================
dotenv.config()
const app = express()
app.use(express.json())
app.use(helmet())
app.use(helmet.crossOriginResourcePolicy(({
    policy: "cross-origin"
})))
app.use(morgan("common"))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cors())

// ===============================================================
// ROUTES
// ===============================================================
app.use("client", clientRoutes)
app.use("general", generalRoutes)
app.use("management", manegementRoutes)
app.use("sales", salesRoutes)

// ===============================================================
// MONGOOSE SETUP
// ===============================================================
const mongoDB = process.env.MONGO_URL
mongoose
    .connect(mongoDB)
    .then(() => {
        console.log("Connected to MongoDB")
    })
    .catch((err) => {
        console.log(err)
    })

// ===============================================================
// SERVER
// ===============================================================
const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`Server started on port ${PORT}`))

// const __filename = fileURLToPath(import.meta.url)
// const __dirname = path.dirname(__filename)


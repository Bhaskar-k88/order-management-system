import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import connectDB from "./config/db.js"
import router from "./routes/authRoutes.js"
import errorHandler from "./middleware/errorMiddleware.js"
import orderRouter from "./routes/orderRoutes.js"

dotenv.config()

const app = express()
 
app.use(express.json())   

app.use(cors({
  origin: "https://order-tracker-562774.netlify.app/", // your Netlify URL
  credentials: true
}));

const port = process.env.PORT

app.use("/api/auth",router)

app.use("/api/orders",orderRouter)

app.use(errorHandler)

const startServr = async()=>{
  try {

   await connectDB()

     app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
  } catch (error) {
    console.log(error)
    process.exit(1)
  }
}

startServr()

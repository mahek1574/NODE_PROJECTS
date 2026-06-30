require("dotenv").config()

const express = require("express")
const cors = require("cors")
const cookieParser = require("cookie-parser")

const connectDB = require("./config/db")
const authRoutes = require("./routes/authRoutes")
const songRoutes = require("./routes/songRoutes")

connectDB()

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use(cookieParser());

app.use(cors({
    origin:"http://localhost:5173",
    credentials:true,
}))

app.use("/api/auth",authRoutes)
app.use("/api/songs",songRoutes)

app.get("/",(req,res)=>{
    res.status(200).json({
        success:true,
        mesaage:"musicapi is runnign..."
    })
})

const port = process.env.PORT || 5000;

app.listen(port,()=>{
    console.log(`server running on port ${port}`)
})

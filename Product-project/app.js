const express = require("express")

const app = express();

const productRoute = require("./routes/productRoutes")
app.set("view engine","ejs")
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"))

app.use("/",productRoute)



app.listen(3000,()=>{
    console.log("server running on 3000");
})


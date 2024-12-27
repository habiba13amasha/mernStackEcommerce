const express = require("express");
const app=express()
require('./connection')
const User=require("./models/User")
const Product=require("./models/Product")
const userRoutes=require("./routes/userRoutes")
const productRoutes=require("./routes/productRoutes")
const imageRoutes=require("./routes/imageRoutes")
const cors=require("cors")
const http = require("http");
const server=http.createServer(app);
const{Server}=require("socket.io")
const io=new Server(server,{
    cors: {
        origin: "*",
        methods: ["GET", "POST", "PUT", "DELETE"],
    }
})



app.use(cors())
app.use(express.urlencoded({extended:true}))
app.use(express.json())

//routes
app.use("/users",userRoutes)
app.use("/products",productRoutes)
app.use("/images",imageRoutes)

server.listen(8080,()=>{
    console.log("Server is running on port 8080")
})
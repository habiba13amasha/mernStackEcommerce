const mongoose = require("mongoose");

const ProductSchema=mongoose.Schema({
    name:{
        type:String,
        required:[true,"Can`t be blank"]
    },
    description:{
        type:String,
        required:[true,"Can`t be blank"]
    },
    price:{
        type:Number,
        required:[true,"Can`t be blank"]
    },
    category:{
        type:String,
        required:[true,"Can`t be blank"]
    },
    pictures:{
        type:Array,  // هنا الصور تُحفظ كـ Array من الروابط (URLs)
        required:true
    }
},{minimize:true})



const Product=mongoose.model("Product",ProductSchema)

module.exports=Product;

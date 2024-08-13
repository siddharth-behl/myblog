import {Schema,model} from 'mongoose'
import auth from './auth.js'
import mongoose from 'mongoose'
const add_schema=new Schema({
    
    content:{
        type:String,
        required:true,

       
    },
    blog_type:{
        required:true,
        type:String
    },
    title:{
        required:true,
        type:String
    },
    background_image:{
        required:true,
        type:String
    },
    shortid:{
        type:String,
        required:true
    },
    createdBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:auth
    }
    
   
})

const add_blog=model("addBlog",add_schema)
export default add_blog
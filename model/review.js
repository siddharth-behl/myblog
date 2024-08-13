import {Schema,model} from 'mongoose'
import auth from './auth.js' 
import add_blog from './add.js'
import mongoose from 'mongoose'

const review_schema=new Schema({
    comments:{
        type:String,
        required:true
    },
    blog:{
        type:mongoose.Schema.Types.ObjectId,
        ref:add_blog
    },
    createdBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:auth
    
    
    }          
})

const comments=model("comment",review_schema)
export default comments
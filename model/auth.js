import {Schema,model} from 'mongoose'
import {createHmac,randomBytes} from 'crypto'

const auth_schema=new Schema({
    fullname:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        required:true,
        type:String
    },
    salt:{
        type:String,
       
    },
    profile_image:{
        type:String,
        default:'Public//data//man.jpg'
    },
    role:{
        type:String,
        enum:['ADMIN','USER'],
        default:'USER'
    }
})
auth_schema.pre('save',function(next){
    let user=this
    let salt= randomBytes(20).toString()
    user.salt=salt
    let hashed_pass=createHmac('sha512',salt).update(user.password).digest('binary')
    user.password=hashed_pass
    
    next()
    
})
const auth=model("authentication",auth_schema)
export default auth


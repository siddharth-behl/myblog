import express from "express";
import multer from 'multer'
import path from 'path'
import { login_signup_get, login_signup_post } from "../controllers/authblog.js";
const auth_router=express.Router()
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './Public/data')
    },
    filename: function (req, file, cb) {
      
        cb(null, 'image'+'_'+Date.now()+ path.extname(file.originalname))
    }
})

const upload = multer({ storage: storage })


auth_router.get('/login',login_signup_get)
auth_router.post('/login',upload.single('profile_image'),login_signup_post)

export default auth_router

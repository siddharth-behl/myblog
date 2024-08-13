import express from "express";
import { admin, homepage, logout_user, myblogs, preview_get, preview_post, sitelink, write_blog, write_blog_post,comments_post } from "../controllers/blog.js";
import multer from 'multer'
import path from 'path'
import { restrictToLoggedInUserOnly } from "../Middlewares/auth.js";
import { authorise } from "../Middlewares/authorization.js";
const blog_router = express.Router()
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './Public/data')
    },
    filename: function (req, file, cb) {
      
        cb(null, 'image'+'_'+Date.now()+ path.extname(file.originalname))
    }
})

const upload = multer({ storage: storage })




blog_router.get('/favicon.ico',(req,res)=>res.send(''))
blog_router.get('/', homepage)
blog_router.post('/comment/:id',comments_post) 
blog_router.get('/write_blog', restrictToLoggedInUserOnly,write_blog)
blog_router.post('/write_blog',upload.single('background_image'), write_blog_post)
blog_router.post('/preview', preview_post)
blog_router.get('/preview', preview_get)
blog_router.get('/logout',logout_user)
blog_router.get('/myblogs',restrictToLoggedInUserOnly,myblogs)
blog_router.get('/admin',authorise(['ADMIN']),admin)
blog_router.get('/:id',sitelink)


export default blog_router

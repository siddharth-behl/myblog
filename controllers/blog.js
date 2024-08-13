let users_data = []
let write_blog_data = {}
import ShortUniqueId from 'short-unique-id';


const shortid = new ShortUniqueId({ length: 10 });
import add_blog from '../model/add.js'
import { space_rem } from '../services/space_clear.js'
import auth from '../model/auth.js'

import comments from '../model/review.js'




export async function myblogs(req, res) {

    const blogs = await add_blog.find({ createdBy: req.user_data?._id })

    if (!blogs) {
        res.send("<h1>Create some fascinating blogs to see them here !</h1>")
    }
    else {

        res.render('homepage', { url: req.base_url, user_data: req.user_data, alluser: blogs })
    }
}
export async function logout_user(req, res) {

    res.clearCookie('uid')
    res.redirect('/')
}
export async function homepage(req, res) {
    const all_datas = await add_blog.find({})

    res.render("homepage", { url: req.base_url, alluser: all_datas, user_data: req.user_data })
}
export async function write_blog(req, res) {


    if (JSON.stringify(write_blog_data) != JSON.stringify({})) {
        res.render("addblog", { url: req.base_url, ...write_blog_data, user_data: req.user_data })
        write_blog_data = {}
    }
    else if (JSON.stringify(users_data) != JSON.stringify([])) {

        add_blog.create({
            shortid: shortid.rnd(),
            blog_type: users_data[0].selected_option,
            title: users_data[0].title,
            background_image: users_data[0].background_image,
            content: users_data[0].html_data,
            createdBy: req.user_data._id

        })
        users_data = []
        res.redirect('/')


    }
    else {
        res.render("addblog", { url: req.base_url, user_data: req.user_data })
    }
}






export async function write_blog_post(req, res) {


    req.body.background_image = req.file?.path;

    const { html_data, selected_option, title, background_image } = space_rem(req.body)


    if (selected_option == 'none' || !title || !background_image) {

        if (selected_option == 'none') {

            write_blog_data.no_select = 1
        }
        if (title == '') {

            write_blog_data.no_title = 2
        }
        if (!background_image) {

            write_blog_data.no_image = 3
        }
        res.json({ done: 1 })
    }
    else {
        users_data = []

        users_data.push(req.body)
            /
            res.json({ done: true })

    }


}

export async function preview_post(req, res) {
    users_data = []
    users_data.push(req.body)
    res.json({ done: true })
}
export async function preview_get(req, res) {


    res.render(`preview`, { url: req.base_url, data: users_data[0] })
}

export async function sitelink(req, res) {

    let data = await add_blog.findOne({ shortid: req.params.id }).populate('createdBy')




    if (!data) {
        res.send('404 Not found')
    }
    else {
        let blog_comments= await comments.find({blog:data._id}).populate('createdBy')
       
        res.render('website', { data, url: req.base_url, user_data: req.user_data,comments_data:blog_comments })
    }

}



export async function admin(req, res) {
    res.send('I am Admin')

}


export async function comments_post(req, res) {

    try {

        const user_comment = await comments.create({
            comments: req.body.comment,
            blog: req.params?.id,
            createdBy: req.user_data._id

        })
        res.redirect('back')
    }
    catch (err) {
        console.log(err)
        res.redirect('back');
    }
}



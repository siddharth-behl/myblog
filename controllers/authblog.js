import auth from "../model/auth.js"
import path from 'path'
import { createHmac } from 'crypto'
import { v4 as session_id } from 'uuid'
import { setUser } from "../services/session_id.js"
import { expiry_maker } from "../services/cookie_expire.js"
export async function login_signup_get(req, res) {

    if (req.user_data) {

        res.redirect('/')
    }

    res.render("login_signup", { url: req.base_url, user_data: req.user_data })
}
export async function login_signup_post(req, res) {
    let frontend_userdata = req.body

    if (frontend_userdata.fullname && frontend_userdata.email && frontend_userdata.password) {


        try {
            const user_data = await auth.create({
                fullname: frontend_userdata.fullname,
                password: frontend_userdata.password,
                email: frontend_userdata.email,
                profile_image: req.file ? req.file.path : undefined
            })


            const token = setUser(user_data)
            res.cookie("uid", token, {
                expires: expiry_maker()
            })
            res.redirect('/')
            // res.json({ token })
        }
        catch (err) {
            console.log(err)
            res.render('login_signup', { duplicate: true, url: req.base_url, user_data: req.user_data })
        }

    }

    else if (frontend_userdata.login_email && frontend_userdata.login_password) {
        let user_credentials = req.body
        let user_data = await auth.findOne({ email: user_credentials.login_email })
        if (!user_data) {
            res.render('login_signup', { url: req.base_url, no_email: true, user_data: req.user_data })
        }
        else {

            let hash_pass = createHmac('sha512', user_data.salt).update(user_credentials.login_password).digest('binary')

            if (hash_pass == user_data.password) {
                const token = setUser(user_data)

                res.cookie("uid", token, {
                    expires: expiry_maker()  // Make sure expiry_maker() returns a Date object
                });
                res.redirect('/')
                // res.json({ token })
            }
            else {

                res.render('login_signup', { url: req.base_url, wrong_pass: true, user_data: req.user_data })
            }
        }
    }

    else {
        res.render('login_signup', { no_data: true, url: req.base_url, user_data: req.user_data })
    }
}





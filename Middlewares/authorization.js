export function authorise(roles = []) {
    return function auth(req, res, next) {
        console.log(req.user_data)
        if (!req.user_data) res.redirect('/login')
        else if (!roles.includes(req.user_data.role)) {
            res.send('UnAuthorised Access')

        }
        else{
            next()
        }
    }
}
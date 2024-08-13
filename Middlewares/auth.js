import { getUser } from "../services/session_id.js"

export async function restrictToLoggedInUserOnly(req,res,next){
    
    const uid=req.cookies?.uid
  
    if(!uid){
    
        res.redirect('/login')
    }
    
    else if(!getUser(uid)){
        
        
        res.redirect('/login')

    }
    else{
        
        let user_data=getUser(uid)
        req.user_data=user_data
        next()
    }

}
export async function LoggedInUserOnly(req,res,next){
    
    const uid=req.cookies?.uid
    // const uid=req.headers?.authoriztion
   
  
    if(!uid){
        next()
    }
    
    else if(!getUser(uid)){
        next()
    }
    else{
        
        let user_data=getUser(uid) 
        req.user_data=user_data
        next()
    }

}

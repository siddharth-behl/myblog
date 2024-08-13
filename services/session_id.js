import jwt from 'jsonwebtoken'
export function setUser(user_data){
    let payload={
        _id:user_data._id,
        email:user_data.email,
        fullname:user_data.fullname,
        profile_image:user_data.profile_image,
        role:user_data.role
    }
  return jwt.sign(payload,process.env.secret)
   
   

}
export function getUser(token){
    if(!token) return null;
    
    try{
    return jwt.verify(token,process.env.secret)
    }
    catch(err){
        console.log(err)
    }

}



import mongoose from 'mongoose'
export function connect(url){
    return mongoose.connect(url)
}
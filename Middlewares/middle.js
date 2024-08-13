import cookieParser from 'cookie-parser'
import express from 'express'
import path from 'path'

export function urlencoded(){
    return express.urlencoded({ limit: '500mb' ,extended:false})
}
export function json(){
    return express.json({ limit: '500mb' })
}

export function urladd(req,res,next){
    const url=req.protocol+"://"+req.get('host')
    req.base_url=url
    next()
    
}
export function static_css(){
    return express.static('./css')
    
    
}
export function static_js(){
    return express.static(path.resolve('./javascript'))
    
    
}
export function static_html(){
    return express.static(path.resolve('./html'))
    
    
}
export function static_image(){
    return express.static(path.resolve('./Public'))
    
    
}
export function cookie_parser(){
    return cookieParser()
    
    
}

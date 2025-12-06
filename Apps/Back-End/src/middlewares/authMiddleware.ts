import jwt  from 'jsonwebtoken';
import { Request, Response, NextFunction } from "express";



const JWT_SECRET = process.env.JWT_SECRET ||  'secret'

export const authenticate = (req:Request,res:Response,next:NextFunction)=>{
    const token = req.headers.authorization?.split(' ')[1]
    if(!token) return res.status(400).json({error:'Token não Fornecido'})
    
        try {
            const tokenValid = jwt.verify(token,JWT_SECRET)
            req.user = tokenValid
            next()
        } catch (error) {
            console.log(error);
            res.status(401).json({error:'Token Invalido'})
        }
}
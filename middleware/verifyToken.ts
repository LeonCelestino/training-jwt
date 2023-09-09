import {Request, Response, NextFunction} from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

interface AuthenticatedRequest extends Request {
    user?: any; // Replace 'any' with the actual type of your user object
  }
  

export async function verifyToken(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    try {
        const token = req.header('Authorization')?.replace('Bearer ', '');

        if (!token) return res.status(403).send({message: "Permission denied. Please Login"});

        const decoded = jwt.verify(token, process.env.SECRET_TOKEN_KEY as string);

        req.user = decoded;

        next();
        
    } catch (error) {
        res.status(401).send(error)

    }



}
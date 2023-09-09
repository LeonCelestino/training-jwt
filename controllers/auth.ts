import {Request, Response} from 'express'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import userModel, {User} from '../models/user.model'
import dotenv from 'dotenv'
dotenv.config();

export async function signin(req: Request, res: Response) {
    try {
        const {email, hash_password} = req.body;
        const user: User | null = await userModel.findOne({email: email});
        const secret = process.env.SECRET_TOKEN_KEY;

        if (!user) return res.status(500).send({ message: "User not found" });

        const matchPasswords = bcrypt.compareSync(hash_password, user.hash_password)

        if (!matchPasswords) return res.status(500).send({message: "Invalid password"});

        const token = jwt.sign({username: user.username}, process.env.SECRET_TOKEN_KEY as string, {expiresIn: "1h"} )

        res.header("Authorization", `Bearer ${token}`);

        res.status(200).send({user: user});
    
      } catch (err) {
        console.error(err);
        return res.status(500).send({message: "Something went wrong when sending sampleData to your mongoDB: " + err})
      }

}


import {User} from '../models/Users'
import {Request, Response, ErrorRequestHandler} from 'express'
import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import logging from '../config/logging'

class Auth {
   constructor() {
      dotenv.config()
   }

   static async register(req: Request, res: Response, err: ErrorRequestHandler) {
      const name:string = req.body.name
      const username:string = req.body.username
      const email:string = req.body.email
      const password: string = req.body.password
      
      try {
         if (name && username && email && password) {
            const newUser = await User.create({
               name: name,
               username: username,
               email: email,
               password: bcrypt.hashSync(password, 8)
            })
            logging.info('AUTH REGISTER', `METHOD: [${req.method}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}]`);
            res.status(201).json({message: 'Succsess create account..', data: newUser})
         } else {
            logging.warn('AUTH REGISTER', `METHOD: [${req.method}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}]`);
            res.status(500).json({message: err})
         }
      } catch (err) {
         logging.warn('AUTH REGISTER', `METHOD: [${req.method}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}]`);
         res.status(500).json({ err, data: 'Error' })
         console.log(err)
      }
   }

   static login(req:Request, res:Response){
      User.findOne({ email: req.body.email })
      .then((result) => {
        if (!result) {
          return res.status(401).json({success: false,msg: 'Users with this email and password is wrong',});
        }
         
        let passwordIsValid = bcrypt.compareSync(req.body.password, result.password);
        if (!passwordIsValid) {
          return res.status(401).json({success: false,msg: 'Users with this email and password is wrong',});
        }
         
         const secretKey: string = (process.env.SECRET_KEY as string)

        let token:any = jwt.sign({ id: result.id }, secretKey , {
          expiresIn: '1hr',
        });
         logging.info('AUTH LOGIN', `METHOD: [${req.method}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}]`);
         res.status(200).json({ msg: `Welcome ${result.name}..`, data: result, accessToken: token });
      })
      .catch((err) => {
         logging.warn('AUTH LOGIN', `METHOD: [${req.method}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}]`);
         res.status(500).json({ msg: 'Failed login', data: err });
      });
   }
   
}

export default Auth
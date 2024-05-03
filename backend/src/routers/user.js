import express from 'express'
import User from '../models/user.js'
import sendWelcomeEmail, { sendCancellationEmail } from '../email/account.js'
import auth from '../middleware/auth.js'

const router = express.Router();


router.post('/signup', async (req, res)=>{
    const userModel = new User(req.body)
    try{
        const user = await userModel.save()
        sendWelcomeEmail(req.body.email, req.body.firstName)
        const token = await userModel.generateAuthToken()
        res.send({user, token})
    }catch(err){
        res.status(400).send({error:err.message})
    }
   
})

router.post('/login', async (req, res)=>{
    
    try{
       const user = await User.findByCredentials(req.body.email, req.body.password)
       const token = await user.generateAuthToken()
       res.send({user, token})
    }catch(err){
        res.status(400).send({error:err.message})
    }
   
})

router.post('/logout', auth, async (req, res)=>{
    
    try{
        req.user.tokens = req.user.tokens.filter((token)=> req.token !== token.token)
        await req.user.save()
        res.send({"message":"User logged out successfully."})
    }catch(err){
        res.status(500).send({error:err.message})
    }
   
})

router.post('/logout/all', auth, async (req, res)=>{
    
    try{
        req.user.tokens = []
        await req.user.save()
        res.send()
    }catch(err){
        res.status(500).send({error:err.message})
    }
})

export default router
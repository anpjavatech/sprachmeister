import express from 'express'
import User from '../models/user.js'
import sendWelcomeEmail, { sendCancellationEmail } from '../email/account.js'
import auth from '../middleware/auth.js'
import multer from 'multer'
import sharp from 'sharp'

const router = express.Router();

const upload = multer({
    limits:{
        fileSize: 1000000
    },
    fileFilter: (req, file, cb)=>{
        if(!file.originalname.match(/\.(jpg|jpeg|png)$/)){
            return cb(new Error('Please upload an image.'))
        }
        cb(undefined, true)
    }
})

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

router.get('/users/me',auth, async (req, res)=>{
    res.send(req.user)
})

router.patch('/users/me', auth, async (req, res)=>{

    const requestBody = req.body
    const updates = Object.keys(req.body)
    const allowedupdates = ['firstName', 'lastName', 'profession', 'age', 'password']
    const isUpdateValid = updates.every((update)=> allowedupdates.includes(update))

    if(!isUpdateValid){
        return res.status(400).send({error:'Invalid Updates.'})
    }

    try{
        const user = req.user
        updates.forEach((update)=> user[update] = requestBody[update])
        await user.save()

        if(!user){
            return res.status(404).send()
        }

        res.send(user)
    }catch(err){
        res.status(400).send(err.message)
    }

})

router.delete('/users/me', auth, async (req, res)=>{

    try{
        const user = req.user
        await user.deleteOne()
        sendCancellationEmail(user.email, user.firstName)
        res.send(req.user)
    }catch(err){
        res.status(400).send(err.message)
    }

})

router.post('/users/me/avatar', auth, upload.single('avatar'), async (req, res)=>{

    req.user.avatar = await sharp(req.file.buffer).resize({width:300, height:300}).png().toBuffer()
    await req.user.save()
    res.send()
}, (error, req, res, next)=>{ // to handle the error to return in json format
    res.status(400).send({error:error.message})
})

router.get('/users/me/avatar', auth, async (req, res)=>{

    try{
        const avatar = req.user.avatar
        if(avatar === undefined){
            throw new Error('No avatar existing.')
        }
    
        res.set('Content-Type', 'image/jpg')
        res.send(avatar)
    }catch(err){
        res.status(400).send(err.message)
    }
    
})

router.delete('/users/me/avatar', auth, async (req, res)=>{

    req.user.avatar = undefined
    await req.user.save()
    res.send()
})


export default router
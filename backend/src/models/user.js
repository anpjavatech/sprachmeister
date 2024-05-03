import mongoose from '../db/mongoose.js'
import validator from 'validator';
import bcryptjs from 'bcryptjs'
import jwt from "jsonwebtoken"

const JWT_SECRET = process.env.JWT_SECRET

const UserSchema = mongoose.Schema({
    firstName:{
        type:String,
        required:true,
        trim:true
    },
    lastName:{
        type:String,
        required:false,
        trim:true
    },
    age:{
        type:Number,
        required:true,
        max:100,
        min:5
    },
    profession:{
        type:String,
        required:false
    },
    email:{
        type:String,
        required:true,
        trim: true,
        lowercase: true,
        unique: true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error('Email not valid.')
            }
        }
    },
    password:{
        type:String,
        required:true,
        trim: true,
        minlength: 7,
        validate(value){
            if(value.toLowerCase().includes('password')){
                throw new Error('Password as password is not allowed..')
            }
        }
    },
    tokens:[{
        token:{
            type: String,
            required: true
        }
    }],
    avatar:{
      type: Buffer
    }
  },{
    timestamps:true
  })

  UserSchema.methods.toJSON = function (){
    const userObject = this.toObject()
    delete userObject.password
    delete userObject.tokens
    delete userObject.avatar

    return userObject
  }

  UserSchema.methods.generateAuthToken = async function (){

    const token = jwt.sign({_id:this._id}, JWT_SECRET, {expiresIn:'1h'})
    this.tokens = this.tokens.concat({token})
    await this.save()

    return token

  }

  UserSchema.statics.findByCredentials = async function (email, password){

    const user = await User.findOne({email})
    if(!user){
        throw new Error('User not found, Plese signup.')
    }

    const isUserValid = await bcryptjs.compare(password, user.password)
    if(!isUserValid){
        throw new Error('Wrong credentials.')
    }

    return user
  }

  UserSchema.pre('save', async function (next){
    if(this.isModified('password')){
        this.password = await bcryptjs.hash(this.password, 8)
    }

    next()
  })

const User = mongoose.model('users', UserSchema)

export default User
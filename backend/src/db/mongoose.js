import mongoose from 'mongoose'

const MONGODB_URL = process.env.MONGODB_URL

mongoose
.connect(MONGODB_URL)
.then(()=>
console.log('MongoDB connected successfully !.')
).catch((err)=>
 console.log(`MongoDB connection failed : ${err.message}`)
)

export default mongoose
import express from 'express'
import userRouter from './src/routers/user.js'
import cors from 'cors'

const app = express()
const port = process.env.BACKEND_PORT

// Allow requests from specific origins
app.use(cors({
    origin: '*'
  }));

app.use(express.json())
app.use(userRouter)

app.get('/', (req, res)=>{
    res.send('<h1>Welcome to my german learning app..</h1>')
})

app.listen(port, ()=>{
    console.log(`Backend server is up and running in port : ${port}`)
})
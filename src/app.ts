
import express from "express";
// import createHttpError from "http-errors";
import { globalErrorHandler } from "./middleware/globalErrorHandler";
import { userRouter } from "./user/userRouter";
import cors from 'cors'
import { config } from "../config/config";
export const app = express();
app.use(cors(
  {
    origin: config.frontendDomain
  }
))
app.use(express.json());  

app.use('/api/users',userRouter)

app.get('/', (req,res)=>  {
  res.status(200).send({message:'success test api working'})
});


//Global error-handler
app.use(globalErrorHandler);
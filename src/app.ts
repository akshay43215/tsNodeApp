
import express from "express";
// import createHttpError from "http-errors";
import { globalErrorHandler } from "./middleware/globalErrorHandler";
import { userRouter } from "./user/userRouter";

export const app = express();
app.use(express.json());

app.use('/api/users',userRouter)

app.get('/', (req,res)=>  {
  res.status(200).send({message:'success test api working'})
});


//Global error-handler
app.use(globalErrorHandler);
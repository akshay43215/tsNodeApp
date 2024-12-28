
import express from "express";
// import createHttpError from "http-errors";
import { globalErrorHandler } from "./middleware/globalErrorHandler";
import { userRouter } from "./user/userRouter";

export const app = express();
//application-level middleware
app.use(express.json());

//Routes
app.use('/api/users',userRouter)

app.get('/', (req,res)=>  {
  //const error = createHttpError(400,'erroring');
  //throw error
  res.status(200).send({message:'success get route response'})
});


//Global error-handler
app.use(globalErrorHandler);

//mongodb+srv://akshaykrishna24996:pass24996@cluster0.5ku6c.mongodb.net/
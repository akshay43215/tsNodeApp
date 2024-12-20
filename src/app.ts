
import express from "express";
import createHttpError from "http-errors";
import { globalErrorHandler } from "./middleware/globalErrorHandler";

export const app = express();


//Routes
app.get('/', (req,res)=>  {
  const error = createHttpError(400,'erroring');
  throw error
  res.status(200).send({message:'success get route response'})
});

//Global error handler
app.use(globalErrorHandler);
// app.use((err: HttpError, req: Request, res: Response, next: NextFunction)=> {
//   const statsCode =  err.statusCode || 500;
//   return res.status(statsCode).json({
//     message : err.message,
//     errorStack : config.env === 'dev'? err.stack : ''
//   });
// });

//mongodb+srv://akshaykrishna24996:pass24996@cluster0.5ku6c.mongodb.net/
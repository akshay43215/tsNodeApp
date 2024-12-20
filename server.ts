import { config } from "./config/config";
import { connectDB } from "./config/db";
import { app } from "./src/app";


const startServer = async()=> {

    await connectDB();

    const port = config.port || 5001;
    app.listen(port,()=> console.log(`Server is running on port ${port}`))
};

startServer();       

console.log('app is running');

import mongoose from "mongoose";
import { config } from "./config";

export const connectDB = async()=> {
    try {
        mongoose.connection.on('connected',()=> console.log('mongo Atlass connected successfully 🥰🎉..!'));
        mongoose.connection.on('reconnected', () => console.log('reconnected'));
        mongoose.connection.on('open', () => console.log('open'));
        mongoose.connection.on('disconnected', () => console.log('disconnected'));
        mongoose.connection.on('reconnected', () => console.log('reconnected'));
        mongoose.connection.on('disconnecting', () => console.log('disconnecting'));
        mongoose.connection.on('close', () => console.log('close'));
        
        await mongoose.connect(config.databaseUrl as string)// make sure this connection below after all listeners
    } catch (error) {
        console.error(`failed to connect db url : ${error}`)
        process.exit(1);
    }
}
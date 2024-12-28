import mongoose from "mongoose";
import { User } from "./userTypes";

const userSchemaModel = new mongoose.Schema<User>({
    name: {
        type: String, //'String' shorthand-for {String} 
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
        unique: true
    }
}, 
 { timestamps: true }
);

export default mongoose.model<User>('User', userSchemaModel); //collection name will be 'users' in the database
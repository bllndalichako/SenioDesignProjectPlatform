import mongoose from "mongoose";

const registerSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: true
        },
        verification: {
            type: String,
            required: true
        }
        
    },
    { collection: 'register'}
);

export const Register = mongoose.model('Register', registerSchema);
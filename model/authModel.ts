import { Document, Schema, model } from "mongoose";
import type { AuthTypes } from "../types/authTypes";

/*
|--------------------------------------------------------------------------
| Schema Defination
|--------------------------------------------------------------------------
*/
export const authSchema = new Schema<AuthTypes & Document>({
    username: {
        type: String,
        required: true,
        unique:true,
        match:/^[a-zA-Z0-9]+$/
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        enum: ['admin', 'general'],
    }
}, {
    timestamps: true
});

/*
|--------------------------------------------------------------------------
| Schema Instance Methods
|--------------------------------------------------------------------------
*/
authSchema.methods = {
    findOneUser: function () {
        return this.findOne({});
    }
}

/*
|--------------------------------------------------------------------------
| Create Auth Model
|--------------------------------------------------------------------------
*/
export const AuthModel = model<AuthTypes & Document>('auth', authSchema);

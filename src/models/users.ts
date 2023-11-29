import mongoose, { Schema, model } from "mongoose";

interface IUser {
    username: string | null,
    email: string | null,
    authentication: {
        password: string | null,
        salt?: string | null,
        sessionToken?: string | null
    }
};

const userSchema = new Schema<IUser>({
    username: { type: String, required: true },
    email: { type: String, required: true },
    authentication: {
        password: { type: String, required: true, select: false },
        salt: { type: String, select: false },
        sessionToken: { type: String, select: false },
    }
});

export const UserModel = model<IUser>('users', userSchema);
import express, { Request, Response } from "express";
import { UserModel } from "../models/users";
import { random, authentication } from "../helpers";

export const registerUser = async (req: Request, res: Response) => {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
        return res.status(400).json({ success: false, message: 'Please fill the form' });
    }
    try {
        const existingUser = await UserModel.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ success: false, message: 'Email is already exist!' });
        }
        const salt = random();
        const hash = authentication(salt, password);
        const user = new UserModel({
            username,
            email,
            authentication: {
                salt,
                password: hash,
            }
        });
        await user.save();
        res.status(200).json({ success: true, data: user });
    } catch (error) {
        res.json({ success: false, message: error?.message });
    }
}

export const loginUser = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ success: false, message: 'Please fill out the form' });
    }
    try {
        const user = await UserModel.findOne({ email }).select('+authentication.salt +authentication.password')
        if (!user) {
            return res.status(400).json({ suceess: false, message: 'User not exist in the database' });
        };
        const expectedHash = authentication(user.authentication.salt, password);
        if (user.authentication.password !== expectedHash) {
            return res.status(403).json({ success: false, message: "Email or password is incorrect" });
        };
        const salt = random();
        user.authentication.sessionToken = authentication(salt, user._id.toString());
        await user.save();
        res.cookie('auth_token', user.authentication.sessionToken, { httpOnly: true });
        res.status(200).json({ success: true });
    } catch (error) {
        res.status(400).json({ success: false, message: error?.message });
    }
}
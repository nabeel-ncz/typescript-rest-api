import express, { Request, Response, NextFunction } from "express";
import { UserModel } from "models/users";
import { get, merge } from "lodash";

export const isAuthenticated = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.cookies['auth_token'];
        if (!token) {
            return res.status(400).json({ success: false, message: 'Authentication required!' });
        }
        const userExist = await UserModel.findOne({ "authentication.sessionToken": token });
        if (!userExist) {
            return res.status(400).json({ success: false, message: 'Authentication required!' });
        }
        merge(req, { identity: userExist });
        next();
    } catch (error) {
        res.status(400).json({ success: false, message: error?.message });
    };
};
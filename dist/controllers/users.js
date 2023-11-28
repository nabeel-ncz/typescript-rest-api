"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUser = exports.registerUser = void 0;
const users_1 = require("../models/users");
const helpers_1 = require("../helpers");
const registerUser = async (req, res) => {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
        return res.status(400).json({ success: false, message: 'Please fill the form' });
    }
    try {
        const existingUser = await users_1.UserModel.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ success: false, message: 'Email is already exist!' });
        }
        const salt = (0, helpers_1.random)();
        const hash = (0, helpers_1.authentication)(salt, password);
        const user = new users_1.UserModel({
            username,
            email,
            authentication: {
                salt,
                password: hash,
            }
        });
        await user.save();
        res.status(200).json({ success: true, data: user });
    }
    catch (error) {
        res.json({ success: false, message: error?.message });
    }
};
exports.registerUser = registerUser;
const loginUser = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ success: false, message: 'Please fill out the form' });
    }
    try {
        const user = await users_1.UserModel.findOne({ email }).select('+authentication.salt +authentication.password');
        if (!user) {
            return res.status(400).json({ suceess: false, message: 'User not exist in the database' });
        }
        ;
        const expectedHash = (0, helpers_1.authentication)(user.authentication.salt, password);
        if (user.authentication.password !== expectedHash) {
            return res.status(403).json({ success: false, message: "Email or password is incorrect" });
        }
        ;
        const salt = (0, helpers_1.random)();
        user.authentication.sessionToken = (0, helpers_1.authentication)(salt, user._id.toString());
        await user.save();
        res.cookie('auth_token', user.authentication.sessionToken, { httpOnly: true });
        res.status(200).json({ success: true });
    }
    catch (error) {
        res.status(400).json({ success: false, message: error?.message });
    }
};
exports.loginUser = loginUser;
//# sourceMappingURL=users.js.map
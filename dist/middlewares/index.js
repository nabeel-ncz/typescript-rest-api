"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAuthenticated = void 0;
const users_1 = require("models/users");
const lodash_1 = require("lodash");
const isAuthenticated = async (req, res, next) => {
    try {
        const token = req.cookies['auth_token'];
        if (!token) {
            return res.status(400).json({ success: false, message: 'Authentication required!' });
        }
        const userExist = await users_1.UserModel.findOne({ "authentication.sessionToken": token });
        if (!userExist) {
            return res.status(400).json({ success: false, message: 'Authentication required!' });
        }
        (0, lodash_1.merge)(req, { identity: userExist });
        next();
    }
    catch (error) {
        res.status(400).json({ success: false, message: error?.message });
    }
    ;
};
exports.isAuthenticated = isAuthenticated;
//# sourceMappingURL=index.js.map
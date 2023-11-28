"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const users_1 = require("../controllers/users");
exports.default = (router) => {
    router.post('/register', users_1.registerUser);
    router.post('/login', users_1.loginUser);
};
//# sourceMappingURL=users.js.map
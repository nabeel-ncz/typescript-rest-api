"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connect = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const connect = async () => {
    const MONGO_URL = `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@cluster0.6hfviyt.mongodb.net/?retryWrites=true&w=majority`;
    try {
        await mongoose_1.default.connect(MONGO_URL);
        console.log('connected to database');
    }
    catch (error) {
        console.log(error?.message);
        process.exit();
    }
    ;
};
exports.connect = connect;
//# sourceMappingURL=database.js.map
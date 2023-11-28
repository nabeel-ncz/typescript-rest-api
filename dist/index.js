"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config({ path: '../*.env' });
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const body_parser_1 = __importDefault(require("body-parser"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
const compression_1 = __importDefault(require("compression"));
const database_1 = require("./config/database");
const index_1 = __importDefault(require("./router/index"));
const app = (0, express_1.default)();
(0, database_1.connect)();
app.use((0, cors_1.default)({ credentials: true }));
app.use((0, compression_1.default)());
app.use((0, cookie_parser_1.default)());
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use('/', (0, index_1.default)());
const server = http_1.default.createServer(app);
const PORT = 3000 || process.env.PORT;
server.listen(PORT, () => {
    console.log(`server listening at ${PORT}`);
});
//# sourceMappingURL=index.js.map
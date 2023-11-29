import dotenv from "dotenv";
dotenv.config({ path: '../*.env' });
import express from "express";
import http from "http";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
import compression from "compression";
import { connect } from "./config/database";
import router from "./router/index";

const app: express.Application = express();
connect();

app.use(cors({ credentials: true }));
app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/', router());

const server = http.createServer(app);
const PORT: number | string = 3000 || process.env.PORT;
server.listen(PORT, () => {
    console.log(`server listening at ${PORT}`);
});
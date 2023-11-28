import express, { Router } from "express";
const router = Router();
import usersRouter from "./users";

export default (): Router => {
    usersRouter(router);
    return router;
};
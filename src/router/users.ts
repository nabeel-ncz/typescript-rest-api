import express, { Router } from "express";
import { registerUser, loginUser } from "../controllers/users";

export default (router: Router) => {
    router.post('/register', registerUser);
    router.post('/login', loginUser);
}
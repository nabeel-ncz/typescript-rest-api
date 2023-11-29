import express, { Router } from "express";
import { registerUser, loginUser } from "../controllers/users";
import { getAllBooks, getUserBooks, addBook, updateBook, deleteBook } from "controllers/books";
import { isAuthenticated } from "../middlewares/index";

export default (router: Router) => {
    router.route('/auth/register').post(registerUser);
    router.route('/auth/login').post(loginUser);
    router.route('/shop').get(isAuthenticated, getAllBooks);
    router.route('/books/my').get(isAuthenticated, getUserBooks);
    router.route('/books/add').post(isAuthenticated, addBook);
    router.route('/books/update').patch(isAuthenticated, updateBook);
    router.route('/books/remove').delete(isAuthenticated, deleteBook)
};
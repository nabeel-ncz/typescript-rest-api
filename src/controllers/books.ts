import { BooksModel } from "../models/books";
import { Request, Response } from "express";

export const getAllBooks = async (req: Request, res: Response) => {
    try {
        const data = await BooksModel.find({});
        res.status(200).json({ success: true, data });
    } catch (error) {
        res.status(400).json({ success: false, message: error?.message });
    }
}

export const getUserBooks = async (req: Request, res: Response) => {
    try {
        const userId: string = req.params?.id;
        const data = await BooksModel.find({ userId });
        res.status(200).json({ success: true, data });
    } catch (error) {
        res.status(400).json({ success: false, message: error?.message });
    }
}

export const addBook = async (req: Request, res: Response) => {
    try {
        const book = new BooksModel(req.body);
        await book.save();
        res.status(200).json({ success: true, data: book });
    } catch (error) {
        res.status(400).json({ success: false, message: error?.message });
    }
}

export const updateBook = async (req: Request, res: Response) => {
    try {
        const bookId: string = req.body?.bookId;
        const { name, author, description, price } = req.body;
        const book = await BooksModel.findById(bookId);
        if (!book) {
            return res.status(400).json({ success: false, message: 'Book not exist!' });
        }
        await book.updateOne({ name, author, description, price });
        await book.save();
        res.status(200).json({ success: true, data: book });
    } catch (error) {
        res.status(400).json({ success: false, message: error?.message });
    }
}

export const deleteBook = async (req: Request, res: Response) => {
    try {
        const bookId: string = req.params?.id;
        await BooksModel.findByIdAndDelete(bookId);
        res.status(200).json({ success: true });
    } catch (error) {
        res.status(400).json({ success: false, message: error?.message });
    }
}

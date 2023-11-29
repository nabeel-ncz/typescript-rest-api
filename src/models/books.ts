import mongoose, { Schema, model, ObjectId } from "mongoose";

interface IBook {
    userId: ObjectId,
    name: string | null,
    author: string | null,
    description?: string | null,
    price: number,
};

const bookSchema = new Schema<IBook>({
    userId: { type: Schema.Types.ObjectId, ref: "users", required: true },
    name: { type: String, required: true },
    author: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, default: 0 },
});

export const BooksModel = model<IBook>('books', bookSchema);
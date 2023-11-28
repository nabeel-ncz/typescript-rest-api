import mongoose from "mongoose";
export const connect = async (): Promise<void> => {
    const MONGO_URL: string = `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@cluster0.6hfviyt.mongodb.net/?retryWrites=true&w=majority`
    try {
        await mongoose.connect(MONGO_URL);
        console.log('connected to database');
    } catch (error){
        console.log(error?.message);
        process.exit();
    };
};



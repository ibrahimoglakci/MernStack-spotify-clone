import mongoose from "mongoose";

export const db = () => {
    mongoose.connect(process.env.DB_CONNECT, {})
        .then(() => {
            console.log("MongoDB Connect")
        })
}

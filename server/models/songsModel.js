import mongoose from "mongoose";

const SongsModel = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    artist: {
        type: String,
        required: true,
        trim: true
    },
    album: {
        type: String,
        required: true,
        trim: true
    },
    image: {
        type: String,
        required: true
    },
    duration: {
        type: String,
        required: false
    },
    created_at: {
        type: Date,
        default: new Date()

    }
});

export default mongoose.model("songs", SongsModel);
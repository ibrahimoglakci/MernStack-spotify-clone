import mongoose from "mongoose";
import SongsModel from "./songsModel.js";

const AlbumModel = new mongoose.Schema({
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
    count: {
        type: String,
        required: false,
        trim: true
    },
    image: {
        type: String,
        required: true
    },
    total_duration: {
        type: String,
        required: false
    },
    songs: [{
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'songs' 
    }],

    created_at: {
        type: Date,
        default: new Date()

    }
});

export default mongoose.model("albums", AlbumModel);
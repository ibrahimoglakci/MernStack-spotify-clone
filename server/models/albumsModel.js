import mongoose from "mongoose";
import SongsModel from "./songsModel.js";

const AlbumModel = new mongoose.Schema({
    platform: String,
    type: String,
    id: String,
    title: String,
    artist: String,
    artistLink: String,
    upc: String,
    releaseDate: Date, // Unix zaman damgası olarak saklanabilir.
    nbTracks: Number,
    albumLink: String,
    picture: String,
    addedDate: Date,
    shareUrls: [String],
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
import mongoose from "mongoose";

const SongsModel = new mongoose.Schema({

    platform: String,
    type: String,
    id: String,
    title: String,
    artist: String,
    artistLink: String,
    album: {
        type: mongoose.Schema.Types.Array,
        ref: 'albums'
    },
    albumLink: String,
    isrc: String,
    duration: Number,
    trackLink: String,
    preview: String,
    picture: String,
    addedDate: Date,
    position: Number,
    shareUrls: [String],
    image: {
        type: String,
    },
    duration: {
        type: String,
    },
    created_at: {
        type: Date,
        default: new Date()
    }
});

export default mongoose.model("songs", SongsModel);
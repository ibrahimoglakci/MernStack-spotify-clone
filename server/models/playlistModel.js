import mongoose from "mongoose";

const PlaylistModel = new mongoose.Schema({
    platform: String,
    type: String,
    id: String,
    title: String,
    artist: String,
    artistLink: String,
    album: String,
    albumLink: String,
    isrc: String,
    duration: Number,
    trackLink: String,
    preview: String,
    picture: String,
    addedDate: Date,
    position: Number,
    shareUrls: [String]
    
});


export default mongoose.model("playlists", ArtistModel);
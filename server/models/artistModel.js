import mongoose from "mongoose";

const ArtistModel = new mongoose.Schema({
    platform: String,
    type: String,
    id: String,
    name: String,
    fans: Number,
    genres: [String],
    artistLink: String,
    picture: String,
    shareUrls: [String]
  });
  

export default mongoose.model("artists", ArtistModel);
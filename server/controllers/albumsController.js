
import SongsModel from "../models/songsModel.js";
import AlbumModel from "../models/albumsModel.js"


const index = async (req, res) => {
    try {
        const albums = await AlbumModel.find().populate('songs');

        const albumsWithSongs = await Promise.all(albums.map(async album => {
            const songsInfo = await Promise.all(album.songs.map(async songId => {
                const song = await SongsModel.findById(songId);
                return {
                    id: song._id,
                    name: song.name,
                    artist: song.artist,
                    image: song.image,
                    created_at: song.created_at
                };
            }));

            return {...albums, songs: songsInfo};
        }));

        res.status(200).json({ albums: albumsWithSongs });

    } catch (error) {
        res.status(500).json({ error: "Server Error", message: error.message })
    }
}



const store = async (req, res) => {

    try {
        const albumname = req.body.name
        const album = await AlbumModel.findOne({ name: albumname })
        if (album) {
            res.status(409).json({ error: "Data Exists", message: "This Album is already exists" })
        }
        else {
            const create = await AlbumModel.create(req.body)
            const songs = req.body.songs
            if (songs) {
                const songsToUpdate = req.body.songs;
                await Promise.all(songsToUpdate.map(async songId => {
                    const song = await SongsModel.findById(songId);
                    if (song) {
                        song.album = create.name;
                        await song.save();
                    }
                }));
            }

            res.status(201).json({ success: "Created Data", message: "Successfully created album", song: create })
        }

    } catch (error) {
        res.status(500).json({ error: "Server Error", message: error.message })
    }
}

const show = async (req, res) => {

    try {
        const { id } = req.params
        const albums = await AlbumModel.findById(id)

        if (albums) {
        
            const songsInfo = await Promise.all(albums.songs.map(async songId => {
                const song = await SongsModel.findById(songId);
                return {
                    id: song._id,
                    name: song.name,
                    artist: song.artist,
                    image: song.image,
                    created_at: song.created_at
                };


               
            }));

            const data = {...albums, songs: songsInfo};



            res.status(201).json({ data })

        }
        else {
            res.status(404).json({ error: "Data Not Found", message: "Album not found" })
        }
    } catch (error) {
        res.status(500).json({ error: "Server Error", message: error.message })
    }
}

const update = async (req, res) => {

    try {
        const { id } = req.params
        const album = await AlbumModel.findByIdAndUpdate(id, req.body, { new: true })


        const songsToUpdate = album.songs;
        await Promise.all(songsToUpdate.map(async songId => {
            const song = await SongsModel.findById(songId);
            if (song) {
                song.album = album.name;
                await song.save();
            }
        }));


        res.status(201).json({ success: "Updated Data", message: "Successfully updated album", albums: album })

    } catch (error) {
        res.status(500).json({ error: "Server Error", message: error.message })
    }
}

const destroy = async (req, res) => {

    try {
        const { id } = req.params
        const album = await AlbumModel.findById(id)
        if (album) {
            const songsToUpdate = album.songs;
            await Promise.all(songsToUpdate.map(async songId => {
                const song = await SongsModel.findById(songId);
                if (song) {
                    song.album = []
                    await song.save();
                }
            }));
            const deleteAlbum = await AlbumModel.findByIdAndDelete(id)
            res.status(204).json({ success: "Deleted Data", message: "Successfully deleted album" })

        }
        else {
            res.status(404).json({ error: "Data Not Found", message: "Album Not Found" })

        }


    } catch (error) {
        res.status(500).json({ error: "Server Error", message: error.message })
    }
}

export { index, store, show, update, destroy }
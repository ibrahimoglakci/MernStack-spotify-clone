import SongsModel from "../models/songsModel.js"

const index = async (req, res) => {

    try {
        const songs = await SongsModel.find()
        res.status(200).json({ songs })

    } catch (error) {
        res.status(500).json({ error: "ServerError", message: error.message })
    }

}

const store = async (req, res) => {

    try {
        const create = await SongsModel.create(req.body)
        res.status(201).json({ success: "CreatedSong", message: "Successfully created song", song: create })
    } catch (error) {
        res.status(500).json({ error: "ServerError", message: error.message })
    }
}

const show = async (req, res) => {

    try {
        const {id} = req.params
        const song = await SongsModel.findById(id)
        res.status(201).json({ song })
    } catch (error) {
        res.status(500).json({ error: "ServerError", message: error.message })
    }
}

const update = async (req, res) => {

    try {
        const {id} = req.params
        const song = await SongsModel.findByIdAndUpdate(id, req.body, {new: true})
        res.status(201).json({ success: "UpdatedSong", message: "Successfully updated song", song: song })
    } catch (error) {
        res.status(500).json({ error: "ServerError", message: error.message })
    }
}

const destroy = async (req, res) => {

    try {
        const {id} = req.params
        const song = await SongsModel.findByIdAndRemove(id)
        res.status(200).json({ success: "DeletedSong", message: "Successfully deleted song"})
    } catch (error) {
        res.status(500).json({ error: "ServerError", message: error.message })
    }
}

const search = async (req, res) => {
    const {name, tag} = req.query
    
    try {
        const title = new RegExp(name, "i")
        const songs = await SongsModel.find({$or: [{title}], tag: {$in: tag.split(",")}})  
        
        res.status(200).json({songs})
    } catch (error) {
        res.status(500).json({ error: "ServerError", message: error.message })
    }
}

export {index, store, show, update, destroy, search}
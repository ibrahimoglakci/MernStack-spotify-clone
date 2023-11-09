
import ArtistModel from "../models/artistModel.js";


const index = async (req, res) => {
    try {
        const artist = await ArtistModel.find()

        res.status(200).json({ artist });

    } catch (error) {
        res.status(500).json({ error: "Server Error", message: error.message })
    }
}



const store = async (req, res) => {

    try {
        const artistname = req.body.name
        const artist = await ArtistModel.findOne({ name: artistname })
        if (artist) {
            res.status(409).json({ error: "Data Exists", message: "This Artist is already exists" })
        }
        else {
            const create = await ArtistModel.create(req.body)

            res.status(201).json({ success: "Created Data", message: "Successfully created artist", artists: create })
        }

    } catch (error) {
        res.status(500).json({ error: "Server Error", message: error.message })
    }
}

const show = async (req, res) => {

    try {
        const { id } = req.params
        if (id) {
            const artist = await ArtistModel.findById(id)

            if (artist) {
                res.status(201).json({ artist })

            }
            else {
                res.status(404).json({ error: "Data Not Found", message: "Artist not found" })
            }
        }
        else {
            res.status(404).json({ error: "Data Not Found", message: "Artist not found" })
        }

    } catch (error) {
        res.status(500).json({ error: "Server Error", message: error.message })
    }
}

const update = async (req, res) => {

    try {
        const { id } = req.params
        const artist = await ArtistModel.findByIdAndUpdate(id, req.body, { new: true })


        res.status(201).json({ success: "Updated Data", message: "Successfully updated artist", artist })

    } catch (error) {
        res.status(500).json({ error: "Server Error", message: error.message })
    }
}

const destroy = async (req, res) => {

    try {
        const { id } = req.params
        const artist = await ArtistModel.findById(id)
        if (artist) {

            const deleteArtist = await ArtistModel.findByIdAndDelete(id)
            res.status(204).json({ success: "Deleted Data", message: "Successfully deleted artist" })

        }
        else {
            res.status(404).json({ error: "Data Not Found", message: "Artist Not Found" })

        }


    } catch (error) {
        res.status(500).json({ error: "Server Error", message: error.message })
    }
}

export { index, store, show, update, destroy }
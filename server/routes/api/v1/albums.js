import express from "express"
import { destroy, index, show, store, update } from "../../../controllers/albumsController.js"
import auth from "../../../middleware/auth.js"

const albumRouter = express.Router()

albumRouter.get("/albums", index)
albumRouter.get("/album/:id", show)
albumRouter.post("/albums", auth, store)
albumRouter.patch("/album/:id", auth, update)
albumRouter.delete("/album/:id", auth, destroy)


export default albumRouter

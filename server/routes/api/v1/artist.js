import express from "express"
import { destroy, index, show, store, update } from "../../../controllers/artistController.js"
import auth from "../../../middleware/auth.js"

const artistRouter = express.Router()

artistRouter.get("/artists", index)
artistRouter.get("/artist/:id", show)
artistRouter.post("/artists", auth, store)
artistRouter.patch("/artist/:id", auth, update)
artistRouter.delete("/artist/:id", auth, destroy)


export default artistRouter

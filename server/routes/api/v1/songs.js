import express from "express"
import { index, store, show, update, destroy } from "../../../controllers/songsController.js"
import auth from "../../../middleware/auth.js"

const songRouter = express.Router()



songRouter.get("/songs", index)
songRouter.get("/song/:id", show)
songRouter.post("/songs", auth, store)
songRouter.patch("/song/:id", auth, update)
songRouter.delete("/song/:id", auth, destroy)

export default songRouter
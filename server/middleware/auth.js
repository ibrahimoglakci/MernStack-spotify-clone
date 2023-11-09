import jwt from "jsonwebtoken";

const auth = async (req, res, next) => {
    try {
        const token =  req.headers['authorization'].split(" ")[1]
        
        let decoded;

        if(token) {
            decoded = jwt.verify(token, process.env.JWT_TOKEN)

            req.userId = decoded?.id
        }
        else {
            decoded = jwt.decode(token)

            req.userId = decoded?.sub

        }
        next()
    } catch (error) {
        res.status(500).json({error: "ServerError", message: error.message})
    }
}

export default auth
import isValilEmail from "../config/helper.js"
import AuthModel from "../models/authModel.js"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"


const register = async (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    try {

        const { username, email, password, name_surname } = req.body

        const user = await AuthModel.findOne({ username })
        const checkEmail = await AuthModel.findOne({ email })

        if (user) {
            res.status(409).json({ error: "AccountExists", message: "This username is already exists" })
        }
        if (checkEmail) {
            res.status(409).json({ error: "AccountExists", message: "This email is already exists" })
        }
        if (password.length < 6) {
            res.status(400).json({ error: "InvalidPassword", message: "Password must be at least 6 characters long" })

        }
        if (!isValilEmail(email)) {
            res.status(400).json({ error: "InvalidEmail", message: "Invalid email address" })
        }

        const hashedPass = await bcrypt.hash(password, 12)

        const createdUser = await AuthModel.create({ name_surname, username, password: hashedPass, email })

        const token = jwt.sign({ id: createdUser.id }, process.env.JWT_TOKEN, { expiresIn: '1h' })

        res.status(201).json({ success: 'CreatedUser', message: 'Succesfully created user', user: createdUser, token: token })


    } catch (error) {
        res.status(500).json({ error: "ServerError", message: error.message })
    }
}

const login = async (req, res) => {

    try {
        const { email, password } = req.body

        const user = await AuthModel.findOne({email})
        if (!user) {
            res.status(404).json({ error: "UserNotFound", message: "User not found" })
        }
        const compare = await bcrypt.compare(password, user.password);
        if (!compare) {
            res.status(400).json({ error: "InvalidUser", message: "Invalid username or password" });
        }
        const token = jwt.sign({ id: user.id }, process.env.JWT_TOKEN, { expiresIn: '1h' })

        res.status(200).json({ success: 'Login', message: 'Succesfully loginned', user: user, token: token })
    } catch (error) {
        res.status(500).json({ error: "ServerError", message: error.message })

    }


}

export { register, login };
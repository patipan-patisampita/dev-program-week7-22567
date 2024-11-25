import User from "../models/userModel.js"
import jwt from 'jsonwebtoken'

//Generate JWT Token
export const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET_KEY, { expiresIn: process.env.JWT_EXPIRES_KEY })
}

//Register new user
export const registerUser = async (req, res) => {
    const { username, email, password, firstName, lastName } = req.body

    try {
        const userExist = await User.findOne({ email: email })
        if (userExist) {
            return res.status(400).json({ status: false, message: "User already exists" })
        }
        //Create new users
        const user = await User.create({ username, email, password, firstName, lastName })
        return res.status(201).json({
            _id: user.id,
            username: user.username,
            email: user.email,
            password: user.password,
            firstName: user.firstName,
            lastName: user.lastName,
        })

    } catch (error) {
        return res.status(500).json({ status: false, message: error.message })
    }
}

//Login new user
export const loginUser = async (req, res) => {
    const { email, password } = req.body
    try {
        const user = await User.findOne({ email })
        if (!user) {
            return res.status(400).json({ status: false, message: "User not found" })
        }

        if (user && (await user.matchPassword(password))) {
            return res.status(200).json({
                _id: user.id,
                username: user.username,
                email: user.email,
                password: user.password,
                firstName: user.firstName,
                lastName: user.lastName,
                token: generateToken(user._id)
            })
        } else {
            return res.status(401).json({ status: false, message: "Invalid email or password" })
        }

    } catch (error) {
        return res.status(500).json({ status: false, message: error.message })
    }
}

//Profile user
export const getUser = async (req, res) => {
    try {
        const id = req.params.id
        const user = await User.findById(id)
        const { password, __v, createdAt, ...userData } = user._doc
        return res.status(200).json({ ...userData })
    } catch (error) {
        return res.status(500).json({ status: false, message: error.message })
    }
}
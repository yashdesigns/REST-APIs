
const User = require("../models/user")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const keys = require("../config/keys")

exports.userRegister = async (req, res) => {

    try {
        const { name, email, password } = req.body

        if (!name) {
            return res.status(400).json({
                msg: "Name is required"
            })
        }
        if (!email) {
            return res.status(400).json({
                msg: "Email is required"
            })
        }
        if (!password || password.length < 4) {
            return res.status(400).json({
                msg: "Password is required and it should be of length 4 to 20"
            })
        }

        const user = await User.findOne({ email })
        if (user) {
            return res.status(400).json({
                msg: "User already exist with this email"
            })
        }

        let hashedPassword = await bcrypt.hash(password, 10)
        const newUser = await new User({
            name,
            email,
            password: hashedPassword
        })

        await newUser.save()
        return res.status(201).json({
            success: true,
            msg: "User created",
            data: newUser
        })


    } catch (error) {
        console.log("err in user signup")
        return res.status(500).json({
            msg: "Server Error"
        })
    }




}

exports.login = async (req, res) => {
    try {


        const { email, password } = req.body

        const user = await User.findOne({ email })
        if (!user) {
            return res.status(400).json({
                message: "No user found with this email"
            })
        }

        const isMatched = await bcrypt.compare(password, user.password)
        if (!isMatched) {
            return res.status(400).json({
                Message: "Invalid Credentials."
            })
        }

        const payload = {
            _id: user._id,
            email: user.email
        }
        jwt.sign(payload, keys.secretKey, { expiresIn: 10000, }, (err, token) => {
            if (err) {
                return res.json({
                    msg: "Error in generating token"
                })
            }
            return res.json({
                msg: "Loggedin successfully",
                token: token
            })

        })


    } catch (error) {
        console.log("err in login", error)
        return res.status(500).json({
            msg: "Server error "
        })
    }
}


exports.userProfile = async (req, res) => {
    try {
        const userProfile = await User.findById(req.user._id).select('-password')
        return res.json(userProfile)
    } catch (error) {
        console.log("err in profile route", error)
        return res.status(500).json({
            msg: "Server error "
        })
    }
}

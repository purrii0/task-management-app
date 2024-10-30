const { registrationSchema, loginSchema } = require("../zod/validation");
const { User } = require("../db/db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const JWT_SECRET = process.env.JWT_SECRET;


const signup = async (req, res) => {
    try {
        console.log(req.body);
        const parsedData = registrationSchema.parse(req.body);
        const { name, username, email, password, profilePicture } = parsedData;

        const isRepeatedEmail = await User.findOne({ email })
        const isRepeatedUsername = await User.findOne({ username })

        if (isRepeatedEmail) res.status(403).json({ message: "Email already registered" })
        if (isRepeatedUsername) res.status(403).json({ message: "Username already Exists" })

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        await User.create({
            username,
            name,
            email,
            password: hashedPassword,
            profilePicture
        })

        res.status(200).json({ message: "User created successfully" })
    } catch (error) {
        res.status(400).json({ message: "Something went Wrong" })
        console.log(error)
    }
}

const signin = async (req, res) => {
    try {
        const parsedData = loginSchema.parse(req.body);
        const { email, password } = parsedData;
        const registeredUser = await User.findOne({ email });

        if (!registeredUser) { res.status(400).json({ message: "User Not Found, Please Sign up first" }) }

        const hashedPassword = registeredUser.password;
        const isPasswordValid = bcrypt.compare(password, hashedPassword);

        if (!isPasswordValid) { res.status(400).json({ message: "Password is Incorrect" }) }

        let token = await jwt.sign({ id: registeredUser._id }, JWT_SECRET);
        res.status(200).json({ token })

    } catch (error) {
        res.status(400).json({ message: "Something went Wrong" })
        console.log(error)
    }
}

module.exports = {
    signup,
    signin
}
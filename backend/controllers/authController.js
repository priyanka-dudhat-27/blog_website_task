const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports.register = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ msg: "Please fill all fields" });
        }

        const mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        const passformat = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{7,15}$/;

        if (!mailformat.test(email)) {
            return res.status(400).json({ message: "Invalid email format" });
        }

        if (!passformat.test(password)) {
            return res.status(400).json({ message: "Password must be 7-15 characters and contain at least one numeric digit and a special character" });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        req.body.password = await bcrypt.hash(password, 10);
        const userData = await User.create(req.body);
        if (userData) {
            return res.status(200).json({ message: "User created successfully", data: userData });
        } else {
            return res.status(400).json({ message: "User not created" });
        }

    } catch (error) {
        console.log(error);
        return res.status(500).json({ msg: "Something wrong" });
    }
};

module.exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "Please fill all fields" });
        }

        const checkEmail = await User.findOne({ email }).populate("blogs")
        if (checkEmail) {
            const matchPass = await bcrypt.compare(password, checkEmail.password);
            if (matchPass) {
                const token = jwt.sign({ _id: checkEmail._id }, process.env.JWT_SECRET, { expiresIn: "2h" });
                return res.status(200).json({ message: "Login successfully", data: checkEmail, token: token });
            } else {
                return res.status(400).json({ message: "Wrong password" });
            }
        } else {
            return res.status(400).json({ message: "User not found" });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({ msg: "Something wrong" });
    }
};

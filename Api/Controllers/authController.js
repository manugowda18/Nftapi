const jwt = require("jsonwebtoken");
const User = require("../Model/userModel");
const dotenv = require('dotenv');

const signToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN,
    });
};

const createSendToken = (user, statusCode, req, res) => {
    const token = signToken(user._id);

    res.cookie("jwt", token, {
        expires: new Date(
            Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
        ),
        httpOnly: true,
        secure: req.secure || req.headers["x-forwarded-proto"] === "https",
    });
    //Remove Password from the output
    user.password = undefined;

    res.status(statusCode).json({
        status: "success",
        token,
        data: {
            user,
        }
    });
};

exports.signUp = async (req, res, next) => {
    const newUser = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        passwordConfirm: req.body.passwordConfirm,
    });
    createSendToken(newUser, 201, req, res);
};

exports.login = async (req, res, next) => {
    const { email, password } = req.body;

    // 1) check if email and password exist
    if (!email || !password) {
        res.status(400).json({
            status: "fail",
            message: "Please provide Email and password!",
        });
    }
    // 2) Check if user exits && password is correct
    const user = await User.findOne({ email }).select("+password");

    if (!user || !(await user.correctPassword(password, user.password))) {
        res.status(401).json({
            status: "fail",
            message: "Incorrect email or password",
        });
    }

    //3) If everything ok, send token to client
    createSendToken(user, 200, req, res);
};


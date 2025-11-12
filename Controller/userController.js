const asynchandler = require('express-async-handler')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const User = require('../model/userModel')


// @desc    Register new user

const registerUser = asynchandler(async (req, res) => {
    const { username, email, password, role } = req.body; // include role

    if (!username || !email || !password) {
        res.status(400);
        throw new Error("All fields are mandatory");
    }

    const userAvailable = await User.findOne({ email });
    if (userAvailable) {
        res.status(400);
        throw new Error("User already registered");
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    console.log('Hashed Password', hashedPassword);

    const newUser = await User.create({
        username,
        email,
        password: hashedPassword,
        role: role || 'user' // default role if not provided
    });

    if (newUser) {
        console.log(`User created ${newUser}`);
        res.status(201).json({
            _id: newUser.id,
            email: newUser.email,
            role: newUser.role
        });
    } else {
        res.status(400);
        throw new Error("User data is not valid");
    }
});

const loginUser = asynchandler(async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        res.status(400);
        throw new Error("All fields are mandatory");
    }

    const user = await User.findOne({ email });

    // Compare entered password with hashed password in DB
    if (user && (await bcrypt.compare(password, user.password))) {
        const accesstoken = jwt.sign(
            {
                user: {
                    username: user.username,
                    email: user.email,
                    id: user.id,
                    role: user.role, // include role if you added it in schema
                },
            },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: "15m" }
        );

        // ✅ Send token back to client
        res.status(200).json({ accesstoken });
    } else {
        res.status(401);
        throw new Error("Email or password is not valid");
    }
});


const currentUser = asynchandler(async(req,res) => {
    res.json(req.user)
})

module.exports = {registerUser, loginUser, currentUser}
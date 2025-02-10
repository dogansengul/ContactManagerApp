import asyncHandler from 'express-async-handler';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import User from '../models/User.js';
import AppError from '../util/AppError.js';

//@desc Register a user
//@route POST /api/users/register
//@access public
export const registerUser = asyncHandler(async (req, res, next) => {
    const { userName, email, password } = req.body;
    if (!userName || !email || !password) {
        const error = new AppError(
            'All request body fields are mandatory.',
            400
        );
        throw error;
    }
    const userAvailableEmail = await User.findOne({ email });
    if (userAvailableEmail) {
        const error = new AppError(
            'This email adress is in use. Please login.',
            400
        );
        throw error;
    }
    const userAvailableUserName = await User.findOne({ userName });
    if (userAvailableUserName) {
        const error = new AppError(
            'This userName is in use. Please login.',
            400
        );
        throw error;
    }

    //Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log('Hashed password:', hashedPassword);

    const user = await User.create({
        userName,
        email,
        password: hashedPassword,
    });

    console.log(`User is created: ${user}`);
    if (user) {
        res.status(200).json({
            _id: user.id,
            userName: user.userName,
            email: user.email,
        });
    } else {
        const error = new AppError('User data is not valid', 400);
        throw error;
    }
});

//@desc Login user
//@route POST /api/users/login
//@access public
export const loginUser = asyncHandler(async (req, res, next) => {
    const { email, password } = req.body;
    if (!email || !password) {
        const error = new AppError(
            'All request body fields are mandatory.',
            400
        );
        throw error;
    }
    const user = await User.findOne({ email });
    if (user && (await bcrypt.compare(password, user.password))) {
        const accessToken = jwt.sign(
            {
                user: {
                    userName: user.userName,
                    email: user.email,
                    id: user.id,
                },
            },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: '15m' }
        );
        res.status(200).json({ accessToken });
    } else {
        const error = new AppError('Email or password is not valid.', 401);
        throw error;
    }
});

//@desc Current user info
//@route POST /api/users/current
//@access private
export const currentUser = asyncHandler(async (req, res, next) => {
    res.json(req.user);
});

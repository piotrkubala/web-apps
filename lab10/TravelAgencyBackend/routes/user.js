const express = require('express');
const createError = require('http-errors');
const bcrypt = require('bcrypt');
const {mongoDbDatabasePromise, mongoDbClient} = require("../utilities/database");
const router = require('./index');
const {
    generateToken,
    JWT_EXPIRATION_TIME_SECONDS,
    JWT_REFRESH_EXPIRATION_TIME_SECONDS
} = require("../middleware/jwt");

router.post('/register/', async (req, res, next) => {
    const newUser = req.body;

    if (!newUser?.username || !newUser?.password || !newUser?.email) {
        res.status(400)
            .json({
                message: "User not provided or invalid"
            });
        return;
    }

    const usernameRegex = /^[a-zA-Z0-9]{3,20}$/;
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    const passwordRegex = /^[a-zA-Z0-9]{6,20}$/;

    if (!usernameRegex.test(newUser.username) ||
        !emailRegex.test(newUser.email) ||
        !passwordRegex.test(newUser.password)) {
        res.status(400)
            .json({
                message: "At least one of the fields is invalid"
            });
        return;
    }

    const mongoDbDatabase = await mongoDbDatabasePromise;
    const usersCollection = mongoDbDatabase.collection('users');

    const userByUsername = await usersCollection.findOne({username: newUser.username});
    const userByEmail = await usersCollection.findOne({email: newUser.email});

    if (userByUsername !== null || userByEmail !== null) {
        res.status(400)
            .json({
                message: "User already exists"
            });
        return;
    }

    const passwordSalt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(newUser.password, passwordSalt);

    const userToInsert = {
        username: newUser.username,
        email: newUser.email,
        passwordHash: passwordHash
    };

    await usersCollection.insertOne(userToInsert);

    res.status(200)
        .json({
            message: "User registered successfully"
        });
});

router.post('/login/', async (req, res, next) => {
    const authenticationData = req.body;

    if (!authenticationData?.username || !authenticationData?.password) {
        res.status(400)
            .json({
                message: "User not provided or invalid"
            });
        return;
    }

    const mongoDbDatabase = await mongoDbDatabasePromise;
    const usersCollection = mongoDbDatabase.collection('users');

    const user = await usersCollection.findOne({username: authenticationData.username});

    if (!user) {
        res.status(400)
            .json({
                message: "Password or username invalid"
            });
        return;
    }

    const passwordMatch = await bcrypt.compare(authenticationData.password, user.passwordHash);

    if (!passwordMatch) {
        res.status(400)
            .json({
                message: "Password or username invalid"
            });
        return;
    }

    const token = await generateToken(user);

    console.log(token);

    res.cookie('Authorization', token, {
        httpOnly: true,
        maxAge: JWT_EXPIRATION_TIME_SECONDS * 1000
    });

    res.status(200)
        .json({
            message: "User logged in successfully"
        });
});
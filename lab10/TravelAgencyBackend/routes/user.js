const express = require('express');
const createError = require('http-errors');
const bcrypt = require('bcrypt');
const {verify} = require("jsonwebtoken");

const {mongoDbDatabasePromise, mongoDbClient} = require("../utilities/database");
const router = require('./index');
const {
    generateToken,
    verifyRefreshToken,
    JWT_EXPIRATION_TIME_SECONDS,
    JWT_REFRESH_EXPIRATION_TIME_SECONDS, verifyToken
} = require("../middleware/jwt");
const {
    canListUsers,
    canRefreshToken
} = require("../middleware/permissions");

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
    const userGroupsCollection = mongoDbDatabase.collection('usergroups');

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

    const userGroupToInsert = {
        username: newUser.username,
        groupName: 'default'
    };

    const userToInsert = {
        username: newUser.username,
        email: newUser.email,
        passwordHash: passwordHash
    };

    await userGroupsCollection.insertOne(userGroupToInsert);
    await usersCollection.insertOne(userToInsert);

    res.status(200)
        .json({
            message: "User registered successfully"
        });
});

async function generateTokensAndResolve(res, user) {
    const token = await generateToken(user);
    const refreshToken = await generateToken(user, JWT_REFRESH_EXPIRATION_TIME_SECONDS, 'refresh_token');

    if (!token || !refreshToken) {
        res.status(500)
            .json({
                message: "Error occurred during token generation"
            });
        return;
    }

    res.cookie('Authorization', token, {
            secure: false,
            sameSite: 'strict',
            maxAge: JWT_EXPIRATION_TIME_SECONDS * 1000
        })
        .cookie('Refresh', refreshToken, {
            secure: false,
            sameSite: 'strict',
            maxAge: JWT_REFRESH_EXPIRATION_TIME_SECONDS * 1000
        })
        .json({
            username: user.username,
            email: user.email
        });
}

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

    await generateTokensAndResolve(res, user);
});

router.post('/token-refresher/', verifyRefreshToken, canRefreshToken,
    async (req, res, next) => {

    const user = req.user;
    const canBeRefreshed = 'refresh_token' in req.permissions;

    if (!canBeRefreshed) {
        res.sendStatus(403);
        return;
    }

    await generateTokensAndResolve(res, user);
});

router.get('/users/', verifyToken, canListUsers,
    async (req, res, next) => {

    const mongoDbDatabase = await mongoDbDatabasePromise;
    const usersCollection = mongoDbDatabase.collection('users');

    const users = await usersCollection.find().map((user) => {
        delete user.passwordHash;
        return user;
    }).toArray();

    res.json(users);
});

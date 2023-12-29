const express = require('express');
let createError = require('http-errors');
const mongoDbDatabasePromise = require("../utilities/database");
const router = require('./index');

router.get('/history/:username', async (req, res, next) => {
    const username = req.params.username;

    mongoDbDatabasePromise.then((mongoDbDatabase) => {
        const collection = mongoDbDatabase.collection('history');

        collection.find({username: username}).toArray().then((history) => {
            res.json(history);
        });
    });
});

router.post('/history/', async (req, res, next) => {
    const newHistoryItem = req.body;

    mongoDbDatabasePromise.then((mongoDbDatabase) => {
        const collection = mongoDbDatabase.collection('history');
        collection.insertOne(newHistoryItem).then((result) => {
            res.json(result.acknowledged);
        }).catch((error) => {
            res.sendStatus(500);
            res.json({
                message: "Error occurred during history item insert"
            });
        });
    });
});

module.exports = router;

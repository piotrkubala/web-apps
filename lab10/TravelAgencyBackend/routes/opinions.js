const express = require('express');
let createError = require('http-errors');
const {mongoDbDatabasePromise, mongoDbClient} = require("../utilities/database");
const router = require('./index');

router.get('/opinions/', async (req, res, next) => {
    mongoDbDatabasePromise.then((mongoDbDatabase) => {
        const collection = mongoDbDatabase.collection('opinions');

        collection.find().toArray().then((opinions) => {
            res.json(opinions);
        });
    });
});

router.get('/opinions/:tripid', async (req, res, next) => {
    const tripId = parseInt(req.params.tripid);

    mongoDbDatabasePromise.then((mongoDbDatabase) => {
        const collection = mongoDbDatabase.collection('opinions');

        collection.find({tripId: tripId}).toArray().then((opinions) => {
            res.json(opinions);
        });
    });
});

router.post('/opinions/', async (req, res, next) => {
    const newOpinion = req.body;

    mongoDbDatabasePromise.then((mongoDbDatabase) => {
        const collection = mongoDbDatabase.collection('opinions');
        collection.insertOne(newOpinion).then((result) => {
            res.json(result.acknowledged);
        }).catch((error) => {
            res.sendStatus(500);
            res.json({
                message: "Error occurred during insert"
            });
        });
    });
});

module.exports = router;

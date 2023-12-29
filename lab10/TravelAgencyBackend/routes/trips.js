const express = require('express');
let createError = require('http-errors');
const mongoDbDatabasePromise = require("../utilities/database");
const router = require('./index');

router.get('/trips/', async (req, res, next) => {
    mongoDbDatabasePromise.then((mongoDbDatabase) => {
        const collection = mongoDbDatabase.collection('trips');

        collection.find().toArray().then((trips) => {
            res.json(trips);
        });
    });
});

router.get('/trips/:id', async (req, res, next) => {
    mongoDbDatabasePromise.then((mongoDbDatabase) => {
        const collection = mongoDbDatabase.collection('trips');
        const tripId = parseInt(req.params.id);

        collection.findOne({id: tripId}).then((trip) => {
            if (trip) {
                res.json(trip);
            } else {
                next(createError(404));
            }
        });
    });
});

router.post('/trips/', async (req, res, next) => {
    const newTrip = req.body;

    mongoDbDatabasePromise.then((mongoDbDatabase) => {
        const collection = mongoDbDatabase.collection('trips');
        collection.insertOne(newTrip).then((result) => {
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

const express = require('express');
let createError = require('http-errors');
const {mongoDbDatabasePromise, mongoDbClient} = require("../utilities/database");
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

    mongoDbDatabasePromise.then(async (mongoDbDatabase) => {
        const session = mongoDbClient.startSession();
        session.startTransaction();

        try {
            await session.withTransaction(async () => {
                const collectionTrips = mongoDbDatabase.collection('trips');
                const collectionHistory = mongoDbDatabase.collection('history');

                const trip = await collectionTrips.findOne({id: newHistoryItem.trip.id});

                const newReservedPlaces = newHistoryItem.countOfTickets + trip.reservedPlacesCount;

                if (isNaN(newReservedPlaces) || newReservedPlaces > trip.maxPlacesCount) {
                    throw new Error("Not enough places");
                }

                await collectionTrips.updateOne({id: newHistoryItem.trip.id},
                {$set: {reservedPlacesCount: newReservedPlaces}}, {session: session});
                await collectionHistory.insertOne(newHistoryItem, {session: session});
            });
        } catch (error) {
            res.sendStatus(500);
            res.json({
                message: "Error occurred during insert"
            });
        } finally {
            await session.endSession();
        }
    });
});

module.exports = router;

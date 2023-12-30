const express = require('express');
let createError = require('http-errors');
const {mongoDbDatabasePromise, mongoDbClient} = require("../utilities/database");
const router = require('./index');

router.get('/rating/:username/', async (req, res, next) => {
    const username = req.params.username;

    mongoDbDatabasePromise.then((mongoDbDatabase) => {
        const collection = mongoDbDatabase.collection('rated');

        collection.find({username: username}).toArray().then((rated) => {
            res.json(rated);
        });
    });
});

router.put('/rating/', async (req, res, next) => {
    const newRatingByUser = req.body;

    mongoDbDatabasePromise.then(async (mongoDbDatabase) => {
        const session = mongoDbClient.startSession();
        session.startTransaction();

        try {
            const username = newRatingByUser.username;
            const tripId = newRatingByUser.tripId;
            const rating = newRatingByUser.rating;

            if (!username || !tripId || !rating) {
                throw new Error("Invalid input");
            }

            if (rating < 1 || rating > 5) {
                throw new Error("Rating must be between 1 and 5");
            }

            await session.withTransaction(async () => {
                const collectionTrips = mongoDbDatabase.collection('trips');
                const collectionRated = mongoDbDatabase.collection('rated');

                const trip = await collectionTrips.findOne({id: tripId}, {session: session});
                const oldRated = await collectionRated.findOne({username: username, tripId: tripId}, {session: session});

                if (oldRated) {
                    trip.averageRating = (trip.averageRating * trip.ratedCount - oldRated.rating + rating) / trip.ratedCount;
                } else {
                    trip.averageRating = (trip.averageRating * trip.ratedCount + rating) / (trip.ratedCount + 1);
                    trip.ratedCount++;
                }

                await collectionTrips.updateOne({id: tripId}, {$set: {averageRating: trip.averageRating, ratedCount: trip.ratedCount}}, {session: session});
                await collectionRated.updateOne({username: username, tripId: tripId}, {$set: {rating: rating}}, {upsert: true, session: session});
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

router.delete('/rating/:tripid/:username/', async (req, res, next) => {
    mongoDbDatabasePromise.then(async (mongoDbDatabase) => {
        const session = mongoDbClient.startSession();
        session.startTransaction();

        try {
            const username = req.params.username;
            const tripId = parseInt(req.params.tripid);

            if (!username || !tripId) {
                throw new Error("Invalid input");
            }

            await session.withTransaction(async () => {
                const collectionTrips = mongoDbDatabase.collection('trips');
                const collectionRated = mongoDbDatabase.collection('rated');

                const trip = await collectionTrips.findOne({id: tripId}, {session: session});
                const oldRated = await collectionRated.findOne({username: username, tripId: tripId}, {session: session});

                if (oldRated) {
                    if (trip.ratedCount === 1) {
                        trip.averageRating = 0;
                    } else {
                        trip.averageRating = (trip.averageRating * trip.ratedCount - oldRated.rating) / (trip.ratedCount - 1);
                    }
                    trip.ratedCount--;

                    await collectionTrips.updateOne({id: tripId},
                        {$set: {averageRating: trip.averageRating, ratedCount: trip.ratedCount}},
                        {session: session});

                    await collectionRated.deleteOne({username: username, tripId: tripId},
                        {session: session});
                }
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

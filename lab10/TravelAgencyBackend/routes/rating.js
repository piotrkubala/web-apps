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

        try {
            const username = newRatingByUser['username'];
            const tripId = newRatingByUser['tripId'];
            const rating = newRatingByUser['rating'];

            if (isNaN(tripId) || !username || isNaN(rating)) {
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
                    trip.averageRating = (trip.averageRating * trip.countOfRatings - oldRated.rating + rating) / trip.countOfRatings;
                } else {
                    trip.averageRating = (trip.averageRating * trip.countOfRatings + rating) / (trip.countOfRatings + 1);
                    trip.countOfRatings++;
                }

                await collectionTrips.updateOne({id: tripId}, {$set: {averageRating: trip.averageRating, countOfRatings: trip.countOfRatings}}, {session: session});
                await collectionRated.updateOne({username: username, tripId: tripId}, {$set: {rating: rating}}, {upsert: true, session: session});

                res.json({
                    message: "Rating updated"
                });
            });
        } catch (error) {
            console.log(error);
            next(createError(500));
        } finally {
            await session.endSession();
        }
    });
});

router.delete('/rating/:tripid/:username/', async (req, res, next) => {
    mongoDbDatabasePromise.then(async (mongoDbDatabase) => {
        const session = mongoDbClient.startSession();

        try {
            const username = req.params.username;
            const tripId = parseInt(req.params.tripid);

            if (!username || isNaN(tripId)) {
                throw new Error("Invalid input");
            }

            await session.withTransaction(async () => {
                const collectionTrips = mongoDbDatabase.collection('trips');
                const collectionRated = mongoDbDatabase.collection('rated');

                const trip = await collectionTrips.findOne({id: tripId}, {session: session});
                const oldRated = await collectionRated.findOne({username: username, tripId: tripId}, {session: session});

                if (oldRated) {
                    if (trip.countOfRatings === 1) {
                        trip.averageRating = 0;
                    } else {
                        trip.averageRating = (trip.averageRating * trip.countOfRatings - oldRated.rating) / (trip.countOfRatings - 1);
                    }
                    trip.countOfRatings--;

                    await collectionTrips.updateOne({id: tripId},
                        {$set: {averageRating: trip.averageRating, countOfRatings: trip.countOfRatings}},
                        {session: session});

                    await collectionRated.deleteOne({username: username, tripId: tripId},
                        {session: session});

                    res.json({
                        message: "Rating deleted"
                    });
                }
            });
        } catch (error) {
            console.log(error);
            next(createError(500));
        } finally {
            await session.endSession();
        }
    });
});

module.exports = router;

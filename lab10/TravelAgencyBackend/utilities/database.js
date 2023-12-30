const {MongoClient, ServerApiVersion} = require("mongodb");

const mongoDbUri = "mongodb+srv://travel-agency-backend:b7Psfm9VcMiDcnpX@travelagency.k7usd3j.mongodb.net/?retryWrites=true&w=majority";
const dbName = "TravelAgency";

const mongoDbClient = new MongoClient(mongoDbUri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function getMongoDbDatabasePromise() {
    await mongoDbClient.connect();
    return mongoDbClient.db(dbName);
}

const mongoDbDatabasePromise = getMongoDbDatabasePromise();

module.exports = {mongoDbDatabasePromise, mongoDbClient};

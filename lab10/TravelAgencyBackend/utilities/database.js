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
    while(true) {
        try {
            await mongoDbClient.connect();
            return mongoDbClient.db(dbName);
        } catch(error) {
            console.log("Error occurred during connecting to database. Retrying in 5 seconds...");
            console.log(error);
            await new Promise((resolve) => setTimeout(resolve, 5000));
        }
    }
}

const mongoDbDatabasePromise = getMongoDbDatabasePromise();

module.exports = {mongoDbDatabasePromise, mongoDbClient};

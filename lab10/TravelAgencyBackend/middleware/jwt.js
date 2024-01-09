const crypto = require('crypto');
const jwt = require('jsonwebtoken');

const {mongoDbDatabasePromise, mongoDbClient} = require("../utilities/database");

const JWT_SECRET = crypto.randomBytes(64).toString('hex');
const JWT_EXPIRATION_TIME_SECONDS = 60 * 5;
const JWT_REFRESH_EXPIRATION_TIME_SECONDS = 60 * 60;

async function generateToken(user, refreshTimeSeconds = JWT_EXPIRATION_TIME_SECONDS, name = 'access_token'){
    try {
        const mongoDbDatabase = await mongoDbDatabasePromise;

        const userGroupsCollection = mongoDbDatabase.collection('usergroups');
        const groupsCollection = mongoDbDatabase.collection('groups');

        const userGroupsNames = await userGroupsCollection.find({username: user.username})
            .map((userGroup) => userGroup.groupName)
            .toArray();

        const userGroups = await groupsCollection.find({name: {$in: userGroupsNames}})
            .toArray();

        const payload = {
            name: name,
            user: user,
            userGroups: userGroups
        };

        return jwt.sign(payload, JWT_SECRET, {
            expiresIn: refreshTimeSeconds
        });
    } catch (error) {
        console.log(error);
    }

    return null;
}

function universalVerify(fieldName) {
    return (req, res, next) => {
        const authHeader = req.headers['authorization'];
        const tokenList = authHeader?.split(' ');

        if (tokenList == null || tokenList.length !== 2) {
            res.sendStatus(401);
            return;
        }

        const token = tokenList[1];

        if (token == null) {
            res.sendStatus(401);
            return;
        }

        jwt.verify(token, JWT_SECRET, (error, payload) => {
            if (error) {
                res.sendStatus(401);
                return;
            }

            req.user = payload.user;
            req.permissions = new Set(payload.userGroups.flatMap((userGroup) =>
                userGroup.permissions)
            );

            next();
        });
    }
}

const verifyToken = universalVerify('Authorization');
const verifyRefreshToken = universalVerify('Refresh');

module.exports = {
    generateToken,
    verifyToken,
    verifyRefreshToken,
    JWT_EXPIRATION_TIME_SECONDS,
    JWT_REFRESH_EXPIRATION_TIME_SECONDS
};
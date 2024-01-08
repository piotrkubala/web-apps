function canListUsers(req, res, next) {
    const canListUsers = req.permissions.has('list_users');
    if (!canListUsers) {
        res.sendStatus(403);
        return;
    }
    next();
}

function canRefreshToken(req, res, next) {
    const canRefreshToken = req.permissions.has('refresh_token');
    if (!canRefreshToken) {
        res.sendStatus(403);
        return;
    }

    next();
}

module.exports = {
    canListUsers,
    canRefreshToken
};
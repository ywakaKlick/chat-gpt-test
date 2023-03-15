const db = require('../modules/db');
const pgp = require('pg-promise');

module.exports.get_favorites = async function () {
    try {
        const expression = 'SELECT * FROM favorite ORDER BY created_at DESC';
        return await db.many(expression, null);
    } catch (e) {
        if (e instanceof pgp.errors.QueryResultError && e.code === pgp.errors.queryResultErrorCode.noData) {
            return [];
        }
        throw e;
    }
}
const db = require('../modules/db')
const pgp = require('pg-promise');

module.exports = async function (req, res) {
    try {
        const result = await get_favorites();
        res.status(200).send(result);
    } catch (e) {
        res.status(500).send(e);
        console.log(e);
    }

    async function get_favorites() {
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
}

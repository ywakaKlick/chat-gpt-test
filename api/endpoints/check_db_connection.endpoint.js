const db = require('../modules/db')

module.exports = async function(req, res) {
    try {
        const can_connect = await db.connection_established();
        const code = can_connect ? 200 : 500;
        const msg = can_connect ? 'OK' : 'Could not connect to database';
        res.status(code).send(msg);
    } catch (e) {
        console.error(e);
    }
}
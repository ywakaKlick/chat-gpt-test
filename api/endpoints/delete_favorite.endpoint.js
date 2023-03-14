const db = require('../modules/db')

module.exports = async function (req, res) {
    try {
        const id = req.params.id;
        const expression = 'DELETE FROM favorite WHERE id = $1';
        const params = [id];
        await db.none(expression, params)
        res.status(200).send('success');
    } catch (e) {
        response.status(500).send(e);
        console.error(e);
    }
}
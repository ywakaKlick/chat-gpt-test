const db = require('../modules/db')

module.exports = async function (req, res) {
    try {
        const question = req.body.question;
        const response = req.body.response;

        const expression = 'INSERT INTO favorite (question, response) VALUES ($1, $2)';
        const params = [question, response];
        await db.none(expression, params)

        res.status(200).send('success');
    } catch (e) {
        response.status(500).send(e);
        console.error(e);
    }
}
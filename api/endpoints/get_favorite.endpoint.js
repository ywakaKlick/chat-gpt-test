const favorite_module = require('../modules/favorite.module');

module.exports = async function (req, res) {
    try {
        const result = await favorite_module.get_favorites();
        res.status(200).send(result);
    } catch (e) {
        res.status(500).send(e);
        console.log(e);
    }
}

const favorite_module = require('../modules/favorite.module');
const fs = require("fs");
const path = require('path');
const output_path = './';

module.exports = async function (req, res) {
    try {
        create_output_path(output_path);
        const data = await favorite_module.get_favorites();
        const output = path.join(output_path, `favorite.json`);

        fs.writeFileSync(output, JSON.stringify(data, null, 2));
        res.status(200).download(output, `favorite.json`);
    } catch (e) {
        res.status(500).send(e);
        console.log(e);
    }

    function create_output_path(output_path) {
        if (fs.existsSync(output_path)) return;
        fs.mkdirSync(output_path, { recursive: true })
    }
}
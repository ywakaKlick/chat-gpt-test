const express = require('express')
const cors = require('cors');
const app = express()
const port = process.env.PORT || 3000

app.use(cors());
app.use(express.json());

const check_db_endpoint = require('./endpoints/check_db_connection.endpoint');
const get_favorite_endpoint = require('./endpoints/get_favorite.endpoint');
const save_favorite_endpoint = require('./endpoints/save_favorite.endpoint');
const delete_favorite_endpoint = require('./endpoints/delete_favorite.endpoint');

app.get('/', check_db_endpoint);
app.get('/favorite', get_favorite_endpoint);
app.post('/favorite/save', save_favorite_endpoint);
app.delete('/favorite/delete/:id', delete_favorite_endpoint);

module.exports = app.listen(port, () => {
    console.log(`Webservice listening on port ${port}`)
})

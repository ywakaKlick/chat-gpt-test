const express = require('express')
const cors = require('cors');
const app = express()
const port = process.env.PORT || 3000

app.use(cors());
app.use(express.json());

const check_db_endpoint = require('./endpoints/check_db_connection.endpoint');

//TODO: Clean up the endpoints and duplicate modules or functions
const get_favorite_endpoint = require('./endpoints/get_favorite.endpoint');
const export_favorite_endpoint = require('./endpoints/export_favorite.endpoint');
const save_favorite_endpoint = require('./endpoints/save_favorite.endpoint');
const delete_favorite_endpoint = require('./endpoints/delete_favorite.endpoint');

const export_careers_endpoint = require('./endpoints/export_careers.endpoint');
const export_research_endpoint = require('./endpoints/export_research.endpoint');
const export_blog_endpoint = require('./endpoints/export_blog.endpoint');

app.get('/', check_db_endpoint);

app.get('/favorite', get_favorite_endpoint);
app.get('/favorite/export', export_favorite_endpoint);
app.post('/favorite/save', save_favorite_endpoint);
app.delete('/favorite/delete/:id', delete_favorite_endpoint);

app.get('/scraping/careers', export_careers_endpoint);
app.get('/scraping/research', export_research_endpoint);
app.get('/scraping/blog', export_blog_endpoint);

module.exports = app.listen(port, () => {
    console.log(`Webservice listening on port ${port}`)
})

const create_favorite_table = 'CREATE TABLE IF NOT EXISTS favorite (id SERIAL PRIMARY KEY, question TEXT, response TEXT, created_at TIMESTAMPTZ DEFAULT NOW());';

module.exports.generateSql = () => `${create_favorite_table}`;
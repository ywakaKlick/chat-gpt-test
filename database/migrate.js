const { migrate } = require('postgres-migrations');
const config = require('./config');

(() => {
    migrate(
        {
            database: config.name,
            user: config.user,
            password: config.password,
            host: config.host,
            port: config.port
        }, config.migrations_path
    ).then(() => {
        console.log('Migration completed successfully');
    }).catch((error) => {
        console.error(error)
    })
})();
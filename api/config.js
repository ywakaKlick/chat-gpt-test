module.exports = {
    database: {
        url:process.env.DATABASE_URL || '',
        port:process.env.DATABASE_PORT || 5432,
        username:process.env.DATABASE_USERNAME || '',
        password:process.env.DATABASE_PASSWORD || '',
        name:process.env.DATABASE_NAME || ''
    }
}
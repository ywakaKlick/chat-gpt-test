const pgp = require("pg-promise")();
const config = require('../config')

const db_url = config.database.url;
const db_port = config.database.port;
const db_username = config.database.username;
const db_password = config.database.password;
const db_name = config.database.name;
var db;

function connect() {
    if(!db) {
        try {
            db = pgp({
                host:db_url,
                port:db_port,
                database:db_name,
                user:db_username,
                password:db_password
            })
        } catch (e) {
            console.error(e);
        }
    }
    return db;
}

module.exports.many = async function (expression, params) {
    try {
        return await db.many(expression, params);
    } catch (e) {
        throw e
    }
}

module.exports.any = async function (expression, params) {
    try {
        return await db.any(expression, params);
    } catch (e) {
        throw e
    }
}

module.exports.one = async function (expression, params) {
    try {
        return await db.one(expression, params);
    } catch (e) {
        throw e;
    }
}

module.exports.none = async function (expression, params) {
    try {
        return await db.none(expression, params);
    } catch (e) {
        throw e
    }
}

module.exports.connection_established = async function() {
    try {
        await db.one('SELECT 1');
        return true
    } catch (e) {
        console.error(e);
        return false
    }
}

module.exports.connect = connect();
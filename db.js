const Poll = require('pg').Pool;

const poll = new Poll({
    user:"postgres",
    host:"localhost",
    database:"Test",
    password:"aditya",
    port:5432,
});

module.exports = poll;
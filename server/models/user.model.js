const mongoose = require('mongoose');

const User = new mongoose.Schema(
    {
        name: { 
            type: String, 
            required: true 
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true
        },
        quote: {
            type: String
        },
        role: {
            type: String
        },
        permission: {
            type: Array
        }
    },
    {collection: 'user-data'}
)

const model = mongoose.model('UserData', User);

module.exports = model;
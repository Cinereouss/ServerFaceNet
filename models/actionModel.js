const mongoose = require('mongoose');

const actionSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please enter name !']
    },
    url: {
        type: String,
        required: [true, 'Please enter url !'],
        unique: true
    },
    groupAction: {
        type: String,
        required: [true, 'Please enter group action !']
    },
    active: {
        type: Boolean,
        default : true
    }
});

const Action = mongoose.model('Action', actionSchema);

module.exports = Action;

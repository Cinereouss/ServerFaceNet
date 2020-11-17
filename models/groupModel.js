const mongoose = require('mongoose');

const roleSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please enter name !']
    },
    role: {
        type: String,
        required: [true, 'Please enter name of role !']
    }
});

const Role = mongoose.model('Role', roleSchema);

module.exports = Role;

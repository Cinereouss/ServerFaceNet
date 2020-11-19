const mongoose = require('mongoose');

const role_actionSchema = new mongoose.Schema({
    rule: {
        type: String,
        required: [true, 'Please enter rule !']
    },
    action: {
        type: String,
        required: [true, 'Please enter action !']
        
    },
    active: {
        type: Boolean,
        default : false
    }
});

const RoleAction = mongoose.model('RoRoleActionle', role_actionSchema);

module.exports = RoleAction;

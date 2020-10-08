const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs')

const User = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Username không được để trống !'],
    },
    password: {
        type: String,
        required: [true, 'Password không được để trống !'],
    },
    active: {
        type: Boolean,
        default: false
    },
    createby: {
        type: String
    },
    createdate: {
        type: Date
    }
})

User.method.encryptPassword = (password) => {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(5), null);
};

User.method.vaildPassword = (password) => {
    return bcrypt.compareSync(password, this.password)
};

User.method.uniqueUser = (username) => {
    User.find({'username': username}, (err, value) => {
        if (err) return err;
        if (value) return false;
        else return true;
    })
}

User.method.getUserByUsername = (username) => {
    User.find({'username' : username}, (err, value) => {
        if(err)
            return err;
        else
            return value;
    })
}
module.exports = mongoose.model('User', User);
const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs')

const TaiKhoan = new mongoose.Schema({
    username : {
        type : String,
        required : [true, 'Username không được để trống !'],
    },
    password : {
        type : String,
        required : [true, 'Password không được để trống !'],
    },
    active : {
      type : Boolean,
      default : false
    },
    createby : {
        type : String
    },
    createdate : {
        type : Date
    }
})

TaiKhoan.method.encryptPassword = function (password){
    return bcrypt.hashSync(password, bcrypt.genSaltSync(5), null);
};

TaiKhoan.method.vaildPassword = function (password){
  return bcrypt.compareSync(password, this.password)
};

const TaiKhoan = mongoose.model('TaiKhoan', TaiKhoan)
module.exports = TaiKhoan;
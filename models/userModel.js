const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please tell us your name !']
    },
    email: {
        type: String,
        required: [true, 'Please provide your email address !'],
        unique: true,
        lowercase: true, //convert to all lower key,
        validate: [validator.isEmail, 'Please provide a valid email !']
    },
    role: {
        type: String,
        enum: ['teacher', 'admin'],
        default: 'teacher'
    },
    password: {
        type: String,
        required: [true, 'Please provide password !'],
        minlength: 8,
        select: false //never show up to output
    },
    passwordConfirm: {
        type: String,
        required: [true, 'Please confirm your password '],
        validate: {
            // only works with .create() and .save()
            validator: function(el) {
                return el === this.password;
            },
            message: 'Password and passwordConfirm are not the same'
        }
    },
    passwordChangedAt: Date,
    passwordResetToken: String,
    passwordResetExpires: Date,
    active: {
        type: Boolean,
        default: true,
        select: false
    }
});

userSchema.pre('save', async function(next) {
    // If password was not modified => do not encrypt it
    if (!this.isModified('password')) return next();

    // Hash the password by bcrypt algorithm (Salting pass before hashing, salting means add random string to pass )
    this.password = await bcrypt.hash(this.password, 12); // 12 is cost encryption, higher means CPU cost more time to encrypt pass

    this.passwordConfirm = undefined; // Remember passwordConfirm is required, but we can do it because we require input only, not required persisted in DB
    next();
});

userSchema.pre('save', function(next) {
    if (!this.isModified('password') || this.isNew) {
        return next();
    }
    // In some stupid reality, the timestamp(check in jwt.io) when token was created was after
    // the passwordChangedAt at DB, so we minus 1s to make sure everything works fine. 1s does not
    // matter
    this.passwordChangedAt = Date.now() - 1000;
    next();
});

// Query middlewares
userSchema.pre(/^find/, function(next) {
    // this points to current query
    this.find({ active: { $ne: false } });
    next();
});

// Instance Method, which is available on all documents in certain collection
userSchema.methods.correctPassword = async function(
    candidatePassword,
    userPassword
) {
    return await bcrypt.compare(candidatePassword, userPassword);
};

userSchema.methods.changedPasswordAfter = function(JWTTimestamp) {
    if (this.passwordChangedAt) {
        const changedTimeStamp = parseInt(
            this.passwordChangedAt.getTime() / 1000,
            10
        );

        return JWTTimestamp < changedTimeStamp;
    }

    // false means not change
    return false;
};

userSchema.methods.createPasswordResetToken = function() {
    // create random token string
    const resetToken = crypto.randomBytes(32).toString('hex');

    // encrypt random token string
    this.passwordResetToken = crypto
        .createHash('sha256')
        .update(resetToken)
        .digest('hex');

    // console.log(resetToken, this.passwordResetToken);

    this.passwordResetExpires = Date.now() + 10 * 60 * 1000;

    return resetToken;
};

const User = mongoose.model('User', userSchema);

module.exports = User;

const crypto = require('crypto');
const { promisify } = require('util');
const messagebird = require('messagebird')(process.env.MESSAGEBIRD_API_KEY)
const jwt = require('jsonwebtoken');
const User = require('./../models/userModel');
const GiangVien = require('./../models/giangvienModel');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const { response } = require('../app');
const fetch = require('node-fetch');

// const Email = require('./../utils/email');

const signToken = id => {
    // sign(payload, secret)
    return jwt.sign({ id: id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN
    });
};

const createSendToken = (user, statusCode, res) => {
    const token = signToken(user._id);

    const cookieOptions = {
        expires: new Date(
            Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
        ),
        // secure: true, // Only use HTTPS to secure data
        httpOnly: true // Make sures cookie can not be accessible and modified in any way by browser
        // Cookie có flag này sẽ không thể truy cập thông qua hàm document.cookie ở browser
        // Do đó, dù web có bị lỗi XSS thì hacker không thể đánh cắp được nó.

        // cookieOptions.secure = true;
    };

    // Because using Postman, not real https, set secure: true does work with Postman
    if (process.env.NODE_ENV === 'production') cookieOptions.secure = true;

    res.cookie('jwt', token, cookieOptions);

    user.password = undefined;
    res.status(statusCode).json({
        status: 'success',
        token,
        data: {
            user
        }
    });
};

exports.signup = catchAsync(async (req, res, next) => {
    // Create new account
    const newUser = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        passwordConfirm: req.body.passwordConfirm,
        role: req.body.role
    });

    // const url = `${req.protocol}://${req.get('host')}/me`; // 'http://127.0.0.1:3000/me';
    // await new Email(newUser, url).sendWelcome();

    // Login
    createSendToken(newUser, 201, res);
});

exports.login = catchAsync(async (req, res, next) => {
    // 1. Check if email n pass provided
    const { email, password } = req.body;
    if (!email || !password) {
        return next(new AppError('Please provide email and password !', 400));
    }

    // 2. Check if user exist && pass is correct
    const user = await User.findOne({ email: email }).select('+password');
    // const correct = await user.correctPassword(password, user.password); //correctPassword() was defined by craft in userModel

    if (!user || !(await user.correctPassword(password, user.password))) {
        return next(new AppError('Incorrect email or password !', 401));
    }

    if (user.role === "admin") {
        // 3. If everything is ok, send token to client
        createSendToken(user, 200, res);
    } else {
        const giangVien = await GiangVien.findOne({ account: user._id});
        if (giangVien) {
            user.set( "beLongTo", giangVien._id, { strict: false });
            createSendToken(user, 200, res);
        } else {
            return next(new AppError('Tài khoản này chưa có giáo viên sở hữu', 404));
        }
    }
});

exports.logout = (req, res) => {
    res.cookie('jwt', 'this-is-log-out-token-:D', {
        expires: new Date(Date.now() + 10 * 1000),
        httpOnly: true
    });

    res.status(200).json({ status: 'success' });
};

exports.protect = catchAsync(async (req, res, next) => {
    // 1. Getting token and check if it's there
    let token = null;
    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    ) {
        token = req.headers.authorization.split(' ')[1];
    } else if (req.cookies && req.cookies.jwt) {
        token = req.cookies.jwt;
    }

    if (!token) {
        return next(
            new AppError('Authorization failed !. You are not log in !', 401)
        );
    }

    // 2. Verification token

    // so we need promisify() method to promisify verify(), force jwt.verify return Promise, instead of using callback
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET); //decode is payload part in JWT
    // await promisify(jwt.verify)(token, process.env.JWT_SECRET); // Throws error when fail verification

    // 3. Check if user still exist
    const currentUser = await User.findById(decoded.id);
    if (!currentUser) {
        return next(
            new AppError('The user belonging to this token no longer exist !', 401)
        );
    }

    // 4. Check if user changed password after the token had been issued
    if (currentUser.changedPasswordAfter(decoded.iat)) {
        return next(
            new AppError(
                'User recently has changed password, please login again !',
                401
            )
        );
    }

    // Grant access to proteced route
    req.user = currentUser;
    res.locals.user = currentUser;
    next();
});

exports.isLoggedIn = async (req, res, next) => {
    if (req.cookies.jwt) {
        try {
            // 1. Verify token
            const decoded = await promisify(jwt.verify)(
                req.cookies.jwt,
                process.env.JWT_SECRET
            );

            // 2. Check if user still exist
            const currentUser = await User.findById(decoded.id);
            if (!currentUser) {
                return next();
            }

            // 3. Check if user changed password after the token had been issued
            if (currentUser.changedPasswordAfter(decoded.iat)) {
                return next();
            }

            // THERE IS A LOGGED IN USER
            res.locals.user = currentUser; // pass 'user' data to *.pug template (all .pug file). Like passing data using render()
            return next();
        } catch (err) {
            return next();
        }
    }
    next();
};

exports.restrictTo = (...roles) => {
    // Because we can not pass args to middleware function, so we use wrapper function to return
    // a middleware functions
    return (req, res, next) => {
        // Because of closures, we has access to 'roles'
        if (!roles.includes(req.user.role)) {
            // In previous middleware we assign 'req.user = currentUser;', so right now we can use 'req.user.role'
            return next(new AppError('Permission for this action is denied !', 403)); //403 Forbidden
        }

        next();
    };
};

exports.forgotPassword = catchAsync(async (req, res, next) => {
    // 1. Get user based on POSTed email
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
        return next(
            new AppError('There is no user with that email address !', 404)
        );
    }

    // 2. Generate a random reset token
    const resetToken = user.createPasswordResetToken();
    // save() to save passwordResetToken, passwordResetExpires created by createPasswordResetToken() to DB
    await user.save({ validateBeforeSave: false }); // turn off validator before save. It allows us save, add data to 1, more fields

    // 3. Send it to user's email
    try {
        const resetURL = `${req.protocol}://${req.get(
            'host'
        )}/api/v1/users/resetPassword/${resetToken}`;

        await new Email(user, resetURL).sendPasswordReset();

        res.status(200).json({
            status: 'success',
            message: 'Token has been sent to email'
        });
    } catch (err) {
        user.passwordResetToken = undefined;
        user.passwordResetExpires = undefined;
        await user.save({ validateBeforeSave: false });

        return next(
            new AppError('There was an error sending email, try again !'),
            500
        );
    }
});

exports.resetPassword = catchAsync(async (req, res, next) => {
    // 1. Get user based on token
    const hashedToken = crypto
        .createHash('sha256')
        .update(req.params.token)
        .digest('hex');

    const user = await User.findOne({
        passwordResetToken: hashedToken,
        passwordResetExpires: { $gt: Date.now() }
    });

    // 2. If token has not been expired and user exist, set the new password
    if (!user) {
        return next(
            new AppError('This token has been expired or user doee not exist', 400)
        );
    }

    user.password = req.body.password;
    user.passwordConfirm = req.body.passwordConfirm;
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save();

    // 3. Update changedPasswordAt property for the user,
    // Was implemented as instance method in userModel

    // 4. Log user in, send JWT
    createSendToken(user, 200, res);
});

exports.updatePassword = catchAsync(async (req, res, next) => {
    // console.log(req.user);
    // 1. Get user from collection
    // Get access to req.user because in protect() we asign req.user to real user
    const user = await User.findById(req.user._id).select('+password');

    // 2. Check if POSTed current password is correct
    if (!(await user.correctPassword(req.body.passwordCurrent, user.password))) {
        return next(new AppError('Current password is wrong !', 401));
    }

    // 3. If so, update password
    user.password = req.body.password;
    user.passwordConfirm = req.body.passwordConfirm;
    await user.save(); //Must use save() findByIDAndUpdate() will not works beause findbyIDAndUpdate() can not trigger validator

    // 4. Log user in, send JWT
    createSendToken(user, 200, res);
});

exports.loginWithFaceId = catchAsync(async (req, res, next) => {
    const { userId } = req.body;

    const user = await User.findById(userId);

    if (!user) {
        return next(
            new AppError('There is no user with that face Id !', 404)
        );
    }

    if (user.role === "admin") {
        // 3. If everything is ok, send token to client
        createSendToken(user, 200, res);
    } else {
        const giangVien = await GiangVien.findOne({ account: user._id});
        if (giangVien) {
            user.set( "beLongTo", giangVien._id, { strict: false });
            createSendToken(user, 200, res);
        } else {
            return next(new AppError('Tài khoản này chưa có giáo viên sở hữu', 404));
        }
    }
});
exports.sendMessage = function (req, res, next) {
    var phoneNumber = req.body.phone;
    messagebird.verify.create(phoneNumber, {
        template : "Mã xác nhận của bạn là %token."
    }), function(err, response){
        if(err){
            console.log(err);
            return err.error[0].description
        }else{
            console.log(response);
            return response
        }
    }
};

exports.verifyPhoneNumber = (req, res, next) => {
    var id = req.body.id;
    var token = req.body.token;

    messagebird.verify.verify(id, token, function(err, response){
        if(err){
            console.log(err);
            return err.error[0].description
        }else{
            console.log(response);
            return "Ok"
        }
    })
};

exports.handleCapcha = (req, res, next) => {
    const secret_key = process.env.SECRET_KEY;
    const token = req.body.token;
    const url = `https://www.google.com/recaptcha/api/siteverify?secret=${secret_key}&response=${token}`;

    fetch(url, {
        method: 'post'
    })
        .then(response => response.json())
        .then(google_response => res.json({ google_response }))
        .catch(error => res.json({ error }));
}

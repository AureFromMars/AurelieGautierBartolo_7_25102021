// Import
const emailValidator = require('email-validator');
const passwordValidator = require('password-validator');

const passwordSchema = new passwordValidator();

passwordSchema
.is().min(8)                                    // Minimum length 8
.is().max(100)                                  // Maximum length 100
.has().uppercase()                              // Must have uppercase letters
.has().lowercase()                              // Must have lowercase letters
.has().digits()                                 // Must have at least 2 digits
.has().not().spaces()                           // Should not have spaces

exports.emailValidator = (req, res, next) => {
    if(req.file) {
        const userData = JSON.parse(req.body.user);
        if(emailValidator.validate(userData.email)){
            next();
        } else {
            return res.status(401).json({ message: 'Bad request, your email is not valid !' });
        };
    } else {
        if(emailValidator.validate(req.body.email)){
            next();
        } else {
            return res.status(402).json({ message: 'Bad request, your email is not valid !' });
        };
    };
};

exports.passwordValidator = (req, res, next) => {
    if(req.file) {
        const userData = JSON.parse(req.body.user);
        if(passwordSchema.validate(userData.password)){
            next();
        } else {
            return res.status(400).json({ message: 'Bad request, your password is not valid !' });
        };
    } else {
        if(passwordSchema.validate(req.body.password)){
            next();
        } else {
            return res.status(400).json({ message: 'Bad request, your password is not valid !' });
        };
    };
};

exports.usernameValidator = (req, res, next) => {
    const regex = /^[a-zA-Z0-9_]{5,20}$/; // Accepts lowercase, uppercase, digits, from 5 to 20
    if(req.file) {
        const userData = JSON.parse(req.body.user);
        if(regex.test(userData.username) === true){
            next();
        } else {
            return res.status(400).json({ message: 'Bad request, your username is not valid !' });
        };
    } else {
        if(regex.test(req.body.username) === true){
            next();
        } else {
            return res.status(400).json({ message: 'Bad request, your username is not valid !' });
        };
    };
};
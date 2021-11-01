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

exports.email = (req, res, next) => {
    if(emailValidator.validate(req.body.email)){
        next();
    } else {
        return res.status(400).json({ message: 'Bad request, your email is not valid !' });
    };
};

exports.password = (req, res, next) => {
    if(passwordSchema.validate(req.body.password)){
        next();
    } else {
        return res.status(400).json({ message: 'Bad request, your password is not valid !' });
    };
};

exports.username = (req, res, next) => {

    const regex = /^[a-zA-Z0-9_]{5,20}$/; // Accepts lowercase, uppercase, digits, from 5 to 20

    if(regex.test(req.body.username) === true){
        next();
    } else {
        return res.status(400).json({ message: 'Bad request, your username is not valid !' });
    };
};
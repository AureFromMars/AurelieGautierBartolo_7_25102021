// Import
const emailValidator = require('email-validator');
const passwordValidator = require('password-validator');
const db = require('../models');
const User = db.User;// User model
const cryptoJs = require('crypto-js');// Crypto-js package to encrypt than decrypt email

const passwordSchema = new passwordValidator();

passwordSchema
.is().min(8)                                    // Minimum length 8
.is().max(100)                                  // Maximum length 100
.has().uppercase()                              // Must have uppercase letters
.has().lowercase()                              // Must have lowercase letters
.has().digits()                                 // Must have at least digits
.has().not().spaces()                           // Should not have spaces

module.exports = (req, res, next) => {
  let hasError = false;
  const errors = [];
  const regex = /^(?=[A-Za-zÀ-ÖØ-öø-ÿ0-9\s-]{8,30}$)(?!.*[_.]{2})[^_.].*[^_.]$/; // Accepts lowercase, uppercase, digits, from 5 to 30
  if(req.file) {
    const userData = JSON.parse(req.body.user);
    if(regex.test(userData.username) == false){
      hasError = true;
      errors.push('Bad request, your username is not valid!')
    }
    if(emailValidator.validate(userData.email) == false){
      hasError = true;
      errors.push('Bad request, your email is not valid!')
    }
    if(passwordSchema.validate(userData.password) == false){
      hasError = true;
      errors.push('Bad request, your password is not valid!')
    }
  } else {
    if(regex.test(req.body.username) == false){
      hasError = true;
      errors.push('Bad request, your username is not valid!')
    }
    if(emailValidator.validate(req.body.email) == false){
      hasError = true;
      errors.push('Bad request, your email is not valid!')
    }
    if(passwordSchema.validate(req.body.password) == false){
      hasError = true;
      errors.push('Bad request, your password is not valid!')
    }
  };
  if (hasError) {
    return res.status(409).json({errors});
  };
  next();
};
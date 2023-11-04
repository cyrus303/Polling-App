const UserModel = require('../models/user-model');

const userRegistrationSchema = {
  username: {
    isLength: {
      errorMessage: 'username should be minimum 3 characters',
      options: {min: 3},
    },
  },
  email: {
    notEmpty: {
      errorMessage: 'Email is required',
    },
    isEmail: {
      errorMessage: 'Email format is invalid',
    },
  },
  password: {
    notEmpty: {
      errorMessage: 'Password is required',
    },
    isLength: {
      options: {min: 8, max: 128},
      errorMessage:
        'password should be between 8 - 128 characters long',
    },
  },
};

const userLoginSchema = {
  email: {
    notEmpty: {
      errorMessage: 'Email is required',
    },
    isEmail: {
      errorMessage: 'Email format is invalid',
    },
  },
  password: {
    notEmpty: {
      errorMessage: 'Password is required',
    },
    isLength: {
      options: {min: 8, max: 128},
      errorMessage:
        'password should be between 8 - 128 characters long',
    },
  },
};

module.exports = {userRegistrationSchema, userLoginSchema};

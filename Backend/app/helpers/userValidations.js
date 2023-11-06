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
    custom: {
      options: async (value) => {
        const user = await UserModel.findOne({email: value});
        if (user) {
          throw new Error('Email already registred');
        } else {
          return true;
        }
      },
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

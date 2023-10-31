const UserModel = require('../models/user-model');
const {validationResult} = require('express-validator');

const _ = require('lodash');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userCtrl = {};

userCtrl.register = async (request, response) => {
  try {
    //schema validation
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
      response.send({errors: errors.array()});
    } else {
      //input sanitation
      const body = _.pick(request.body, [
        'username',
        'email',
        'password',
      ]);
      //hashing password for security
      const salt = await bcrypt.genSalt();
      const hash = await bcrypt.hash(body.password, salt);
      body.password = hash;
      body.registrationDate = Date();
      //update database
      const user = await UserModel.create(body);
      response.send({
        user: user,
        message: 'User registred successfully',
      });
    }
  } catch {
    response.send(400);
  }
};

userCtrl.login = async (request, response) => {
  try {
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
      response.send({errors: error.array()});
    } else {
      const body = _.pick(request.body, ['email', 'password']);
      const user = await UserModel.findOne({email: body.email});
      if (user) {
        const result = await bcrypt.compare(
          body.password,
          user.password
        );
        if (result) {
          const token = jwt.sign(
            {
              id: user._id,
            },
            'dct@123'
          );
          response.send({token: token, message: 'Logged in'});
        } else {
          response.send('Email / Password is incorrect');
        }
      } else {
        response.send({error: 'email not found'});
      }
    }
  } catch {
    response.send(400);
  }
};

module.exports = userCtrl;

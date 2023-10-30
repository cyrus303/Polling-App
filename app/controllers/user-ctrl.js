const UserModel = require('../models/user-model');
const {validationResult} = require('express-validator');

const userCtrl = {};

userCtrl.register = async (request, response) => {
  try {
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
      response.send({errors: errors.array()});
    } else {
      const body = request.body;
      const user = await UserModel.create(body);
      response.send(user);
    }
  } catch {
    response.send(400);
  }
};

module.exports = userCtrl;

const UserModel = require('../models/user-model');
const {validationResult} = require('express-validator');

const _ = require('lodash');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const pollsCtrl = {};

pollsCtrl.create = async (request, response) => {
  response.send('polls');
};

module.exports = pollsCtrl;

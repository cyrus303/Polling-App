const express = require('express');
const router = express.Router();

const userCtrl = require('../app/controllers/user-ctrl');
const pollsCtrl = require('../app/controllers/polls-ctrl');

const {
  userRegistrationSchema,
  userLoginSchema,
} = require('../app/helpers/userValidations');
const {checkSchema} = require('express-validator');
const authenticateUser = require('../app/middlewares/authenticateUser');

router.post(
  '/users/register',
  checkSchema(userRegistrationSchema),
  userCtrl.register
);

router.post(
  '/users/login',
  checkSchema(userLoginSchema),
  userCtrl.login
);

router.post('/polls', authenticateUser, pollsCtrl.create);

module.exports = router;

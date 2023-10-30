const express = require('express');
const router = express.Router();

const userCtrl = require('../app/controllers/user-ctrl');

const userRegistrationSchema = require('../app/helpers/userValidations');
const {checkSchema} = require('express-validator');

router.post(
  '/users/register',
  checkSchema(userRegistrationSchema),
  userCtrl.register
);

module.exports = router;

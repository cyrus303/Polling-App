const mongoose = require('mongoose');
const {Schema, model} = mongoose;

//user schema = username, email, password

const userSchema = new Schema(
  {
    username: {
      type: String,
    },
    email: {
      type: String,
    },
    password: {
      type: String,
    },
    registrationDate: {
      type: Date,
    },
  },
  {timestamps: true}
);

const UserModel = model('UserModel', userSchema);

module.exports = UserModel;

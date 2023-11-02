const mongoose = require('mongoose');
const {Schema, model} = mongoose;

//poll schema = creator, question, creation date, expiry date, catrgory, options

const pollSchema = new Schema({
  creator: {
    type: Schema.Types.ObjectId,
    ref: 'userSchema',
  },
  question: {
    type: String,
  },
  creationDate: {
    type: Date,
  },
  expiryDate: {
    type: Date,
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: 'categorySchema',
  },
  options: [
    {
      optionText: {
        type: String,
      },
    },
  ],
});

const PollModel = model('PollModel', pollSchema);

module.exports = PollModel;

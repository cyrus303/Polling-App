const mongoose = require('mongoose');
const {Schema, model} = mongoose;

//vote schema

const voteSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'UserModel',
  },
  pollId: {
    type: Schema.Types.ObjectId,
    ref: 'PollModel',
  },
  optionId: {
    type: Schema.Types.ObjectId,
    ref: 'pollSchema.options',
  },
  voteDate: {
    type: Date,
  },
});

const VoteModel = model('VoteModel', voteSchema);

module.exports = VoteModel;

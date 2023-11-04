const VoteModel = require('../models/vote-model');

const votesCtrl = {};

votesCtrl.vote = async (request, response) => {
  try {
    const {pollId} = request.params;
    const userId = request.userId;
    const optionId = request.body.option;
    const voteDate = new Date();

    const userVote = await VoteModel.create({
      pollId,
      userId,
      optionId,
      voteDate,
    });

    response.send('vote recorded');
  } catch (error) {
    response.send('error');
  }
};

module.exports = votesCtrl;

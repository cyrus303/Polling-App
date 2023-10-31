const {PollModel} = require('../models/poll-model');
const {validationResult} = require('express-validator');

const _ = require('lodash');

const pollsCtrl = {};

pollsCtrl.create = async (request, response) => {
  const body = _.pick(request.body, [
    'question',
    'options',
    'duration',
  ]);
  body.creationDate = new Date(); // Create a new Date object for the current date and time
  const expirationTime = body.duration * 1000; // Convert duration to milliseconds
  body.expiryDate = new Date(
    body.creationDate.getTime() + expirationTime
  );
  const poll = await PollModel.create(body);
  response.send({
    message: 'Poll created',
    id: poll._id,
  });
};

pollsCtrl.list = async (request, response) => {
  try {
    const {pollId} = request.params;
    const poll = await PollModel.findById(pollId);
    response.send({poll});
  } catch (error) {
    response.send(error);
  }
};

pollsCtrl.update = async (request, response) => {
  try {
    const {pollId} = request.params; // Assuming you're passing the pollId in the request parameters
    const updateData = _.pick(request.body, [
      'question',
      'options',
      'duration',
    ]);

    //*todo if duration is provided find the record to get the created date
    // if (duration) {
    //     const expirationTime = body.duration * 1000; // Convert duration to milliseconds
    //     body.expiryDate = new Date(
    //       body.creationDate.getTime() + expirationTime
    //     );
    // }

    const updatedPoll = await PollModel.findOneAndUpdate(
      {_id: pollId}, // The filter to find the document to update
      updateData, // The data to update
      {new: true} // To return the updated document
    );

    if (updatedPoll) {
      response.send({
        message: 'Poll updated successfully',
        updatedPoll,
      });
    } else {
      response.status(404).send({error: 'Poll not found'});
    }
  } catch (error) {
    response.status(500).send({error: error.message});
  }
};

module.exports = pollsCtrl;

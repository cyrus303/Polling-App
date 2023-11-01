const PollModel = require('../models/poll-model');
const UserModel = require('../models/user-model');
const {validationResult} = require('express-validator');

const _ = require('lodash');

const pollsCtrl = {};

pollsCtrl.create = async (request, response) => {
  const body = _.pick(request.body, [
    'question',
    'options',
    'duration',
  ]);
  body.creationDate = new Date();
  const expirationTime = body.duration * 60000;
  body.expiryDate = new Date(
    body.creationDate.getTime() + expirationTime
  );
  body.creator = request.userId;
  const poll = await PollModel.create(body);
  response.send({
    message: 'Poll created',
    id: poll._id,
  });

  const userData = await UserModel.findByIdAndUpdate(
    request.userId, // The user's ID
    {
      $push: {pollsCreated: poll._id}, // Use $push to add the new poll ID to the array
    },
    {new: true} // To return the updated user document
  );
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

    if (updateData.duration) {
      const document = await PollModel.findById(pollId);
      const createdDate = document.creationDate;
      const expirationTime = updateData.duration * 1000; // Convert duration to milliseconds
      updateData.expiryDate = new Date(
        createdDate.getTime() + expirationTime
      );
    }

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

pollsCtrl.distroy = async (request, response) => {
  try {
    const {pollId} = request.params;
    const document = await PollModel.findByIdAndDelete(pollId);
    if (document) {
      response.send({document, message: 'poll deleted'});
    } else {
      response.send('poll not found');
    }
  } catch (error) {
    response.send(error);
  }
};

pollsCtrl.active = async (request, response) => {
  try {
    const currentDate = new Date();
    const activePolls = await PollModel.find({
      expiryDate: {$gt: currentDate},
    });

    response.send(activePolls);
  } catch (error) {
    response.send(error);
  }
};

pollsCtrl.myPoll = async (request, response) => {
  try {
    const userId = request.userId;
    const userPolls = await PollModel.find({creator: userId});
    response.send(userPolls);
  } catch (error) {
    response.send(error);
  }
};

module.exports = pollsCtrl;

const jwt = require('jsonwebtoken');

const authenticateUser = async (request, response, next) => {
  try {
    const token = request.headers.authorization;
    const tokenData = jwt.verify(token, 'dct@123');
    request.userId = token.id;
  } catch (error) {
    response.send(error);
  }
};

module.exports = authenticateUser;

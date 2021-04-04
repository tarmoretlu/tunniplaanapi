const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../../config');

const jwtService = {};

jwtService.sign = async (user) => {
  const payload = {
    id: user.id,
    role: user.role,
  };
  const token = await jwt.sign(payload, jwtSecret, { expiresIn: 60 * 60 });
  return token;
};

jwtService.verify = async (token) => {
  try {
    const payload = await jwt.verify(token, jwtSecret);
    return payload;
  } catch (error) {
    return false;
  }
};

module.exports = jwtService;

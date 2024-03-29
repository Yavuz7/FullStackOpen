const jwt = require("jsonwebtoken");
const User = require("../models/user");

const tokenExtractor = (request, response, next) => {
  const authorization = request.get("authorization");
  if (authorization && authorization.startsWith("Bearer ")) {
    request.token = authorization.replace("Bearer ", "");
    next();
    return;
  }
  next();
  return;
};

const userExtractor = async (request, response, next) => {
  let decodedToken;
  try {
    decodedToken = await jwt.verify(request.token, process.env.SECRET);
  } catch {
    return response.status(401).json({ error: "token invalid" });
  }
  if (!decodedToken.id) {
    return response.status(401).json({ error: "token invalid" });
  }
  request.user = await User.findById(decodedToken.id);
  next();
  return;
};

module.exports = { tokenExtractor, userExtractor };

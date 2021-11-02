const jwt = require("jsonwebtoken");

const config = process.env;

const verifyToken = (req, res, next) => {
 
  const token =
    req.body.token || req.query.token || req.headers["authorization"];

  if (!token) {
    return res.status(403).send("A token is required for authentication");
  }
  try {
    const bearerToken = token.replace("Bearer ","")
    console.log("whats the bearerToken ? ", bearerToken, config.TOKEN_KEY);
    const decoded = jwt.verify(bearerToken, config.TOKEN_KEY);
    console.log(22);
    console.log("whats the decoded? ",decoded)
    req.user = decoded;
  } catch (err) {
      console.log("Whats the err? ",err);
    return res.status(401).send("Invalid Token");
  }
  return next();
};


module.exports = verifyToken;
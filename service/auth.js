const jwt = require('jsonwebtoken');
const secret = "AK@1234@KUMAR"

function setUser(user) {
     // Create a payload with only necessary, non-sensitive information.
     // Never include passwords in a JWT payload.
     const payload = {
          _id: user._id,
          email: user.email,
          name: user.name,
          role: user.role,
     };
     return jwt.sign(payload, secret);
}
function getUser(token) {
     if (!token) return null;
     try {
          return jwt.verify(token, secret);
     } catch (error) {
          // Return null if token is invalid or expired
          return null;
     }
}

module.exports = {
     setUser,
     getUser,
}
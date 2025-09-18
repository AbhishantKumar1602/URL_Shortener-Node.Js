const { getUser } = require("../service/auth");

const checkForAuth = (req, res, next) => {
     const authHeader = req.headers["authorization"];
     req.user = null;

     if (!authHeader || !authHeader.startsWith('Bearer '))
          return next();

     const token = authHeader.split("Bearer ")[1];
     if (!token)
          return next();

     const user = getUser(token);
     req.user = user;
     next();
}

function restrictTo(roles= []) {
     return (req, res, next) => {
          if (!req.user ) 
               return res.redirect("/login");
          if (!roles.includes(req.user.role))
               return res.end("Unauthorized");
          return next();
     }
}

module.exports = {
     checkForAuth,
     restrictTo,

}
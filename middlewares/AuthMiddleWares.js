const Auth = require("../models/Auth");

const jwt = require("jsonwebtoken");
console.log("Miidle")
exports.checkUser = (req, res, next) => {
  console.log("token")
  const token = req.cookies.jwt;
  console.log(req.cookies)
  if (token) {
    jwt.verify(token, "igbal super secret key32", async (err, decodedToken) => {
      if (err) {
        console.log("!verify")
        res.json({ status: false });
        next();
      } else {
        console.log("verify")
        const user = await Auth.findById(decodedToken.id);
        if (user) {
          console.log(user)
          res.json({ status: true, user: user.email });
        } else {
          console.log( " sad")
          res.json({ status: false });
          next();
        }
      }
    });
  } else {
    console.log("!!verify")
    res.json({ status: false });
    next();
  }
};

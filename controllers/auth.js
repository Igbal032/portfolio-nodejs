const Auth = require("../models/Auth");

const jwt = require("jsonwebtoken");
const maxAge = 3 * 24 * 60 * 60;
const createToken = (id) => {
  return jwt.sign({ id }, "igbal super secret key32", {
    expiresIn: maxAge,
  });
};

exports.register = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;

  const auth = Auth.findOne({ email: email })
    .then((auth) => {
      console.log(auth);
      if (auth) {
        res.status(200).json({
          message: "This auth has already exist!!",
        });
      } else {
        const newAuth = new Auth({
          email,
          password,
        });
        Auth.create(newAuth)
          .then((auth) => {
            const token = createToken(auth._id);
            res.cookie("jwt", token, {
              withCredintials: true,
              httpOnly: false,
              maxAge: maxAge * 1000,
            });
            res.status(201).json({
              auth: auth,
              message: "Auth was created",
            });
          })
          .catch((err) => {
            res.status(404).json({
              auth: null,
              errorMessage: err,
              message: "Auth was not created!! ERROR",
            });
          });
      }
    })
    .catch((err) => {
      res.status(404).json({
        auth: null,
        errorMessage: err,
        message: "Not Found!! ERROR",
      });
    });
};

exports.login = async (req, res, next) => {
  const { email, password } = req.body;
  const auth = await Auth.login(email, password);
  const token = createToken(auth._id);
  res.cookie("jwt", token, {
    withCredintials: true,
    httpOnly: false,
    maxAge: maxAge * 1000,
  });
  res.status(200).json({
    auth: auth._id,
    status: true,
  });
};

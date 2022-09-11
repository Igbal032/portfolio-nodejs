const experience = require("../models/experience");
const Message = require("../models/message");
const skill = require("../models/skill");
const user = require("../models/user");
const fs = require('fs')
// const pdf2base64 = require('pdf-to-base64');
// pdf2base64("test/sample.pdf")
//     .then(
//         (response) => {
//             console.log(response);        }
//     )
//     .catch(
//         (error) => {
//             console.log(error);
//         }
//     )

exports.getUser = (req, res, next) => {
  user
    .find()
    .then((users) => {
      if (users.length != 0) {
        return res.status(200).json({
          user: users[0],
        });
      } else {
        return res.status(200).json({
          user: [],
        });
      }
    })
    .catch((err) => {
      console.log("Error!!");
    });
};

exports.getExperiences = (req, res, next) => {
  const experiences = experience
    .find()
    .then((exps) => {
      exps.sort((a, b) => parseFloat(b.orderNo) - parseFloat(a.orderNo));
      res.status(200).json({
        experiences: exps,
      });
    })
    .catch((err) => {
      console.log("Error!!");
    });
};

exports.getSkills = (req, res, next) => {
  const skills = skill
    .find()
    .then((skills) => {
      skills.sort((a, b) => parseFloat(a.orderNo) - parseFloat(b.orderNo));
      return res.status(200).json({
        skills: skills,
      });
    })
    .catch((err) => {
      console.log("Error!!");
    });
};

exports.sendMessage = (req, res, next) => {
  const { name, email, phone, content } = req.body;
  const newMessage = new Message({
    name,
    email,
    phone,
    content,
  });
  newMessage
    .save()
    .then((response) => {
      if (response) {
        return res.status(200).json({
          name,
          email,
          phone,
          content,
        });
      } else {
        return res.status(200).json({
          name,
          email,
          phone,
          content,
        });
      }
    })
    .catch((err) => {
      return res.status(200).json({
        status: 204,
        message: "Message was not created!!(All field should be filled!!!)",
      });
    });
};

exports.getMessages = (req, res, next) => {
  Message.find()
    .then((response) => {
      if (response.length!=0) {
        return res.status(200).json({
          messages: response,
        });
      } else {
        return res.status(404).json({
          messages: response,
          status: 404,
        });
      }
    })
    .catch((err) => {
      return res.status(404).json({
        errorMessages: "Somthing goes wrong!! Please Try after",
        status: 404,
      });
    });
};



exports.getFile = async (req, res, next) => {
  user
    .find()
    .then((users) => {
      if (users.length != 0) {
          return users[0]
      } else {
          return []
      }
    })
    .then(result=>{
      const fileName = result.cv;
      const contents = fs.readFileSync(`./uploads/${fileName}`, {
        encoding: "base64",
      });
      return res.status(200).json({
        base64: contents,
        status: 200,
      });
    })
    .catch((err) => {
      console.log("Error!!");
    });
};

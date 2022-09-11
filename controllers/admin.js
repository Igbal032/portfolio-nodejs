const Experience = require("../models/experience");
const Skill = require("../models/skill");
const User = require("../models/user");
const Message = require("../models/message");
const fs = require("fs");
const user = require("../models/user");
const { base } = require("../models/experience");
exports.saveExperience = (req, res, next) => {
  const orderNo = req.body.orderNo;
  const title = req.body.title;
  const start = req.body.start;
  const end = req.body.end;
  const description = req.body.description;
  const experience = new Experience({
    orderNo: orderNo,
    title: title,
    start: start,
    end: end,
    description: description,
  });
  experience
    .save()
    .then((result) => {
      res.status(200).json({
        message: "Experience created",
        experience: experience,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};
exports.saveSkill = (req, res, next) => {
  const orderNo = req.body.orderNo;
  const skillName = req.body.skillName;
  const skillPercentage = req.body.skillPercentage;
  const newSkill = new Skill({
    orderNo,
    skillName,
    skillPercentage,
  });
  newSkill.save();
  res.status(200).json({
    message: "Skill created",
    skill: newSkill,
  });
};
exports.saveUser = async (req, res, next) => {
  const name = req.body.name;
  const surname = req.body.surname;
  const birthDay = req.body.birthDay;
  const about = req.body.about;
  const professinal = req.body.professinal;
  const email = req.body.email;
  const phone = req.body.phone;
  const contactContent = req.body.contactContent;
  let cv;
  let base64;
  if (req.files) {
    cv = req.files.pdfData.name;
    const pdfData = req.files.pdfData;
    console.log("sadasd");
    pdfData.mv("./uploads/" + pdfData.name, (err, result) => {
      if (err) {
        console.log("Not save");
      } else {
        console.log("Save CV");
      }
    });
  } else {
    cv = null;
    base64 = null;
    console.log("Null sadsad");
  }

  const newUser = new User({
    name,
    surname,
    birthDay,
    about,
    professinal,
    email,
    phone,
    contactContent,
    cv,
    cvBase64: base64,
  });
  const users = await User.find();
  if (users.length !== 0) {
    return;
  }
  newUser
    .save()
    .then((result) => {
      return res.status(200).json({
        message: "User created successfully!!",
        user: result,
      });
    })
    .catch((err) => {
      return res.status(200).json({
        message: "User Not Saved!!",
        user: {},
        errorMessage: err,
      });
    });
};
exports.deleteSkill = (req, res, next) => {
  const skillId = req.body.skillId;
  Skill.findByIdAndRemove(skillId)
    .then((result) => {
      if (result) {
        res.status(200).json({
          message: " Succesfully deleted skill",
          skill: result,
        });
      } else {
        res.status(404).json({
          message: "Skill did not found!!",
          skill: result,
        });
      }
    })
    .catch((err) => {
      console.log("error");
    });
};
exports.deleteExperience = (req, res, next) => {
  const experienceId = req.body.experienceId;
  Experience.findByIdAndRemove(experienceId)
    .then((result) => {
      if (result) {
        res.status(200).json({
          message: " Succesfully deleted Experience",
          experience: result,
        });
      } else {
        res.status(404).json({
          message: "Experience did not found!!",
          skill: result,
        });
      }
    })
    .catch((err) => {
      throw new Error("Hello");
    });
};
exports.getSkillById = (req, res, next) => {
  const skillId = req.body.skillId;
  Skill.findOne({ _id: skillId })
    .then((skill) => {
      res.status(200).json({
        skill: skill,
        message: "Skill found!!",
      });
    })
    .catch((err) => {
      res.status(404).json({
        skill: null,
        message: "Skill not found!!",
      });
    });
};
exports.getExperienceById = (req, res, next) => {
  const exId = req.body.experienceId;
  Experience.findOne({ _id: exId })
    .then((exp) => {
      res.status(200).json({
        experience: exp,
        message: "Experience found!!",
      });
    })
    .catch((err) => {
      res.status(404).json({
        experience: null,
        message: "Experience not found!!",
      });
    });
};
exports.editSkill = (req, res, next) => {
  const orderNo = req.body.orderNo;
  const skillId = req.body.skillId;
  const skillName = req.body.skillName;
  const skillPercentage = req.body.skillPercentage;
  Skill.findById(skillId)
    .then((result) => {
      if (result) {
        result.orderNo = orderNo;
        result.skillName = skillName;
        result.skillPercentage = skillPercentage;
        result.save();
        res.status(200).json({
          updatedSkill: result,
        });
      } else {
        res.status(404).json({
          message: "Skill did not exists!",
          skill: result,
        });
      }
    })
    .catch((err) => {
      throw new Error("ERROR");
    });
};
exports.editUser = (req, res, next) => {
  const userId = req.body.userId;
  const name = req.body.name;
  const surname = req.body.surname;
  const birthDay = req.body.birthDay;
  const about = req.body.about;
  const phone = req.body.phone;
  const email = req.body.email;
  const professinal = req.body.professinal;
  const contactContent = req.body.contactContent;
  let cv;
  let base64;
  if (req.files) {
    cv = req.files.pdfData.name;
    const pdfData = req.files.pdfData;
    pdfData.mv("./uploads/" + pdfData.name, (err, result) => {
      if (err) {
        console.log("Not save");
      } else {
        console.log("Save CV");
      }
    });
  }
  User.findById(userId)
    .then((result) => {
      if (result) {
        result.name = name;
        result.surname = surname;
        result.birthDay = birthDay;
        result.about = about;
        result.phone = phone;
        result.email = email;
        result.professinal = professinal;
        result.contactContent = contactContent;
        result.cv = cv;
        result.cvBase64 = base64;
        result.save();
        res.status(200).json({
          updatedUser: result,
        });
      } else {
        res.status(404).json({
          message: "User did not exists!",
          user: result,
        });
      }
    })
    .catch((err) => {
      res.status(404).json({
        message: "All parameters required!",
        user: result,
      });
    });
};
exports.editExperience = (req, res, next) => {
  const experienceId = req.body.experienceId;
  const orderNo = req.body.orderNo;
  const title = req.body.title;
  const start = req.body.start;
  const end = req.body.end;
  const description = req.body.description;

  Experience.findById(experienceId)
    .then((result) => {
      if (result) {
        result.orderNo = orderNo;
        result.title = title;
        result.start = start;
        result.end = end;
        result.description = description;
        result.save();
        res.status(200).json({
          updatedExperience: result,
        });
      } else {
        res.status(404).json({
          message: "Experience did not exists!",
          skill: result,
        });
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.deleteMessage = (req, res, next) => {
  const msjId = req.body.msjId;
  Message.findByIdAndRemove(msjId)
    .then((result) => {
      if (result) {
        return res.status(200).json({
          message: " Succesfully deleted Message",
          msj: result,
        });
      } else {
        return res.status(404).json({
          errorMessage: "Message did not found!!",
          message: result,
        });
      }
    })
    .catch((err) => {
      return res.status(404).json({
        errorMessage: "Message did not found!!",
        err: err,
        message: result,
      });
    });
};

exports.upload = (req, res, next) => {
  const cv = req.files.CV;
  console.log("cv");
  console.log(cv);
  console.log("req.files");
  console.log(req.files);
  cv.mv("./uploads/" + cv.name, (err, result) => {
    if (err) {
      return res.status(200).json({
        err: err,
      });
    } else {
      return res.status(200).json({
        data: req.files.CV,
      });
    }
  });
};

exports.getFile = async (req, res, next) => {
  user
    .find()
    .then((users) => {
      if (users.length != 0) {
        return users[0];
      } else {
        return [];
      }
    })
    .then((result) => {
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

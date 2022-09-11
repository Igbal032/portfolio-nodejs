const express = require("express");
const router = express.Router();

const adminController = require("../controllers/admin");
const homeController = require('../controllers/home')
//post api
router.post("/experiences", adminController.saveExperience);
router.post("/skills", adminController.saveSkill);
router.post("/users", adminController.saveUser);
//CV UPLOAD
router.post("/upload", adminController.upload);
router.get("/upload", adminController.getFile);

//get api
router.get("/experiences", homeController.getExperiences)
router.get("/skills", homeController.getSkills)
router.get("/getSkillById", adminController.getSkillById)
router.get("/getExperienceById", adminController.getExperienceById)
router.get("/users", homeController.getUser)
router.get('/messages',homeController.getMessages)

//delete api
router.delete("/skills", adminController.deleteSkill)
router.delete("/messages", adminController.deleteMessage)
router.delete("/experiences", adminController.deleteExperience)

//put api
router.put("/users", adminController.editUser)
router.put("/skills", adminController.editSkill)
router.put("/experiences", adminController.editExperience)


module.exports = router;
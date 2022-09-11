const express = require('express')
const homeController = require('../controllers/home')
const router = express.Router();

router.get('/experiences',homeController.getExperiences)
router.get('/skills', homeController.getSkills)
router.get("/users", homeController.getUser)
router.get("/upload", homeController.getFile);


//post
router.post('/contact',homeController.sendMessage)

module.exports = router;
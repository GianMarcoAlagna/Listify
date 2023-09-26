const express = require('express');
const userController = require('../controllers/userController');
const router = express.Router();

router.get('/', userController.verifyToken, userController.getUser);
router.get('/signout', userController.removeCookie, (req, res) => {
    return res.sendStatus(200);
});

router.patch('/', userController.verifyToken, userController.updateUserData, (req, res) => {
    return res.sendStatus(200);
})

router.post('/forgot', userController.resetPassword, (req, res) => {
    return res.sendStatus(200);
});
router.post('/login', userController.authenticateUser, userController.setCookie, (req, res) => {
    return res.status(200).json({username: req.body.username});
});
router.post('/signup', userController.setCookie, userController.createUser);


router.delete('/', userController.deleteUser);

module.exports = router;
const express = require('express');
const router = express.Router();
const todoController = require('../controllers/todoController');

router.get('/userlist', todoController.getUserList);
router.post('/', todoController.createTodo);

module.exports = router;
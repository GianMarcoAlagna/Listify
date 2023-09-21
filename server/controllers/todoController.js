const { User } = require('../models/userModel');
const createError = require('../error');

const todoController = {
    getUserList: async function(req, res, next) {
        const { username } = req.body;
        const user = await User.findOne({ username });
        if (!user) return next(createError('Couldn\'t find user', 404, `couldn't find user ${username}`, 'todoController', 'getUserTodo'));
        try {
            return res.status(200).json(user.todo);
        } catch (err) {
            return next(createError(null, 404, `couldn't find user ${username}`, 'todoController', 'getUserList'));
        }
    },
    createTodo: async function(req, res, next) {
        const { username, item } = req.body;
        // item should be an Object that cooperates with the todoItemSchema
        const user = await User.findOne({ username });
        console.log(user)
        if (!user) return next(createError('Couldn\'t find user', 404, `couldn't find user ${username}`, 'todoController', 'createTodo'));
        try {
            const newItem = {
                value: item.value,
                completed: false,
                sublist: [item.sublist || null]
            }
            user.todo.items.push(newItem);
            await user.save();
            return res.sendStatus(200);
        } catch (err) {
            return next(createError(null, 404, `couldn't add item`, 'todoController', 'createTodo'));
        }
    }
}

module.exports = todoController;
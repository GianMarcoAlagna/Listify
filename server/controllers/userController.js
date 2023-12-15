const { User } = require('../models/userModel');
const createError = require('../error');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userController = {
    createUser: async function(req, res, next) {
        const { username, password } = req.body;
        let user;
        try {
            user = await User.findOne({ username: username });
        } catch (err) {
            return next(createError(err, 500, 'Error in find', 'userController', 'createUser'));
        }
        if (user) {
            return next(createError({ err: `User ${username} already exists` }, 400, 'User Exists', 'userController', 'createUser'));
        }
    
        try {
            const newUser = await User.create({username: username, password: password, textEditor: '', todo: {items: []}});
            const response = {
                username: username,
                id: newUser._id,
                todo: newUser.todo
            }
            return res.status(200).json(response);
        } catch (err) {
            return next(createError(err, 500, 'Couldn\'t Create User', 'userController', 'createUser'));
        }
    },
    updateUserData: async function(req, res, next) {
        const { todo, textEditor } = req.body;
        try {
            const username = jwt.decode(req.cookies.token, process.env.KEY).username;
            try {
                await User.findOneAndUpdate({ username }, {todo: todo, textEditor: textEditor});
            } catch (err) {
                return next(createError((err, 404, 'Couldn\'t Find/Update User', 'userController', 'updateUserData')));
            }
        } catch (err) {
            return next(createError((err, 404, 'User Is Invalid', 'userController', 'updateUserData')));
        }
        return next();
    },
    getUser: async function(req, res, next) {
        const { oAuthUser } = req.cookies;
        if (oAuthUser === 'true') return next();
        
        const username = jwt.decode(req.cookies.token, process.env.KEY).username;
        try {
            const userData = await User.findOne({ username });
            res.locals.user = userData;
            return res.status(200).json({username: userData.username, id: userData._id, textEditor: userData.textEditor, todo: userData.todo});
        } catch (err) {
            return next(createError(err, 404, 'Couldn\'t Find User', 'userController', 'getUser'));
        }
    },
    deleteUser: async function(req, res, next) {
        const { username } = req.body;
        try {
            await User.findOneAndDelete({username: username});
            res.sendStatus(200);
        } catch (err) {
            return next(createError(err, 404, 'Couldn\'t Find User', 'userController', 'deleteUser'));
        }
    },
    authenticateUser: async function(req, res, next) {
        const { username, password } = req.body;
        try {
            const user = await User.findOne({ username });
            const authenticated = bcrypt.compareSync(password, user.password);
            if (!authenticated) return res.status(404).json('Incorrect Credentials');
        } catch (err) {
            return next(createError(err, 404, 'Error in find, couldn\'t find user', 'userController', 'authenticateUser'));
        }
        return next();
    },
    setCookie: function(req, res, next) {
        const { username } = req.body;
        if (req.cookies.token) return next();
        try {
            const token = jwt.sign({ username }, process.env.KEY);
            const expiration = new Date(Date.now() + (24 * 60 * 60 * 1000));
            res.cookie("token", token, { expires: expiration, httpOnly: true, sameSite: 'None', secure: true });
            res.cookie("oAuthUser", false, { expires: expiration, httpOnly: true, sameSite: 'None', secure: true });
            return next();
        } catch (err) {
            return next(createError(err, 500, 'error creating jwt cookie', 'userController', 'setCookie'));
        }
    },
    verifyToken: async function(req, res, next) {
        const { token } = req.cookies;
        try {
            if (!token) throw new Error('no token');
            jwt.verify(token, process.env.KEY);
            return next();
        } catch (err) {
            console.error(err);
            return res.sendStatus(401);
        }
    },
    removeCookie: function(req, res, next) {
        res.clearCookie('token');
        return next();
    },
    resetPassword: async function(req, res, next) {
        const { username, password } = req.body;
        // const hashPass = bcrypt.hashSync(password, 10);
        try {
            const user = await User.findOne({ username });
            try {
                user.password = password;
                user.save();
            } catch (err) {
                return next(createError(err, 500, 'error saving new credentials', 'userController', 'resetPassword'));
            }
        } catch (err) {
            return next(createError(err, 500,`error finding user ${username}`, 'userController', 'resetPassword'));
        }
        return next();
    },
}

module.exports = userController;
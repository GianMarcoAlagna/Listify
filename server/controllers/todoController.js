const jwt = require("jsonwebtoken");
const { User, OAuthUser } = require("../models/userModel");
const createError = require("../error");

const todoController = {
  getUserList: async function (req, res, next) {
    const { username } = jwt.decode(req.cookies.token, process.env.KEY);
    const { oAuthUser } = req.cookies;
    let user;
    if (oAuthUser === "true") {
      const { oAuthUserID } = jwt.decode(req.cookies.token, process.env.KEY);
      user = await OAuthUser.findOne({ googleId: oAuthUserID });
    } else {
      user = await User.findOne({ username });
    }
    if (!user)
      return next(
        createError(
          "Couldn't find user",
          404,
          `couldn't find user ${username}`,
          "todoController",
          "getUserList"
        )
      );
    try {
      return res.status(200).json(user.todo);
    } catch (err) {
      return next(
        createError(
          null,
          404,
          `couldn't find user ${username}`,
          "todoController",
          "getUserList"
        )
      );
    }
  },
  createTodo: async function (req, res, next) {
    const { username, item } = req.body;
    const { oAuthUser } = req.cookies;
    // item should be an Object that cooperates with the todoItemSchema
    try {
      const newItem = {
        value: item.value,
        completed: false,
        sublist: [item.sublist || []],
      };
      try {
        if (oAuthUser === "true") {
          const { oAuthUserID } = jwt.decode(
            req.cookies.token,
            process.env.KEY
          );
          OAuthUser.findOneAndUpdate(
            { googleId: oAuthUserID },
            { $push: { "todo.items": newItem } }
          );
        } else {
          User.findOneAndUpdate(
            { username },
            { $push: { "todo.items": newItem } }
          );
        }
      } catch (err) {
        return next(
          createError(
            "Couldn't find user",
            404,
            `couldn't find user ${username}`,
            "todoController",
            "createTodo"
          )
        );
      }

      return res.sendStatus(200);
    } catch (err) {
      return next(
        createError(
          null,
          404,
          `couldn't add item`,
          "todoController",
          "createTodo"
        )
      );
    }
  },
};

module.exports = todoController;

const authController = require("../controllers/authController.js");

const authRouter = require("express").Router();

authRouter.get("/callback", authController.callback, (req, res) => {
  return res.redirect("http://localhost:8080/dashboard");
});

authRouter.get("/google", authController.google, async (req, res) => {
  return res.redirect(res.locals.url);
});

module.exports = authRouter;

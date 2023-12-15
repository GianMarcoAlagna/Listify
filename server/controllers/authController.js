const { OAuthUser } = require("../models/userModel");
const { google } = require("googleapis");
const jwt = require("jsonwebtoken");

const authController = {
  google: (_req, res, next) => {
    oauth2Client = new google.auth.OAuth2(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET,
      "http://localhost:3000/auth/callback"
    );

    const scopes = [
      "https://www.googleapis.com/auth/userinfo.profile",
      "https://www.googleapis.com/auth/userinfo.email",
      "https://www.googleapis.com/auth/contacts.readonly", // Add People API scope
    ];

    const url = oauth2Client.generateAuthUrl({
      access_type: "offline",
      scope: scopes,
    });

    res.locals.url = url;
    return next();
  },
  // createoAuthUser: async (_req, res, next) => {
  //   try {
  //     const { username, googleId, token } = res.locals;
  //     const oAuthUser = await OAuthUser.create({
  //       username: username,
  //       googleId: googleId,
  //       token: token,
  //     });
  //     res.locals.oAuthUser = oAuthUser;
  //     return next();
  //   } catch (err) {
  //     return next({
  //       log: `An error occurred in authController.createoAuthUser: ${err}`,
  //       message: {
  //         err: "An error occurred in authController.createoAuthUser. Check server logs for more details.",
  //       },
  //     });
  //   }
  // },
  getoAuthUser: async (req, res, next) => {
    try {
      const { oAuthUserID } = jwt.decode(req.cookies.token, process.env.KEY);
      const oAuthUser = await OAuthUser.findOne({ googleId: oAuthUserID });
      // console.log("oAuthUser, from authController", oAuthUser);
      return res.status(200).json({
        username: oAuthUser.username,
        id: oAuthUser._id,
        textEditor: oAuthUser.textEditor,
        todo: oAuthUser.todo || [],
      });
    } catch (err) {
      return next({
        log: `An error occurred in authController.getoAuthUser: ${err}`,
        message: {
          err: "An error occurred in authController.getoAuthUser. Check server logs for more details.",
        },
      });
    }
  },
  setoAuthCookie: (_req, res, next) => {
    try {
      const { userProfile } = res.locals;

      const token = jwt.sign(
        { oAuthUserID: userProfile.names[0].metadata.source.id },
        process.env.KEY
      );
      const expiration = new Date(Date.now() + 24 * 60 * 60 * 1000);

      res.cookie("token", token, { httpOnly: true, expiration, secure: true });
      res.cookie("oAuthUser", true, { httpOnly: true, secure: true });

      return next();
    } catch (err) {
      return next({
        log: `An error occurred in authController.setoAuthCookie: ${err}`,
        message: {
          err: "An error occurred in authController.setoAuthCookie. Check server logs for more details.",
        },
      });
    }
  },
  callback: async (req, res, next) => {
    try {
      const { code } = req.query;
      const { tokens } = await oauth2Client.getToken(code);
      oauth2Client.setCredentials(tokens);

      const people = google.people({ version: "v1", auth: oauth2Client });
      const userProfile = await people.people.get({
        resourceName: "people/me", // 'me' is a special value indicating the authenticated user
        personFields: "names", // You can customize the fields you want to retrieve
      });

      res.locals.tokens = tokens;
      res.locals.userProfile = userProfile.data;

      const userExists = await OAuthUser.findOne({
        googleId: userProfile.data.names[0].metadata.source.id,
      });
      if (userExists) return next();

      OAuthUser.create({
        username: res.locals.userProfile.names[0].displayName,
        googleId: res.locals.userProfile.names[0].metadata.source.id,
        tokens: tokens,
        todo: { items: [] },
      });

      return next();
    } catch (err) {
      return next({
        log: `An error occurred in authController.callback: ${err}`,
        message: {
          err: "An error occurred in authController.callback. Check server logs for more details.",
        },
      });
    }
  },
};

module.exports = authController;

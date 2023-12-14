const { OAuthUser } = require("../models/userModel");
const { google } = require("googleapis");
const express = require("express");

const authController = {
  google: (req, res, next) => {
    console.log("google auth controller");
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

      res.locals.token = tokens;
      res.locals.userProfile = userProfile.data;
      OAuthUser.create({
        username: res.locals.userProfile.names[0].displayName,
        googleId: res.locals.userProfile.names[0].metadata.source.id,
        token: tokens,
      });
      // just have to set JWT cookie and redirect to dashboard, then when user requests their data search both oAuthUser and User for their data
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

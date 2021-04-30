const { google } = require("googleapis");
const urlParse = require("url-parse");

exports.googleAuth = () => {
  const oauth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    process.env.GOOGLE_REDIRECT
  );

  // generate a url that asks permissions for Blogger and Google Calendar scopes
  const scope = [
    "https://www.googleapis.com/auth/analytics.readonly",
    "https://www.googleapis.com/auth/analytics.manage.users.readonly",
  ];

  const url = oauth2Client.generateAuthUrl({
    access_type: "offline",
    scope: scope,
    prompt: "consent",
  });
  return url;
};

exports.isAuthenticated = (req, res, next) => {
  console.log(`isAuth - ${req.originalUrl} - ${req.method}`);

  // parse url path name
  const urlPathname = new urlParse(req.url);
  // parse sessionIdCookie from request if it exists
  const sessionIdCookie = req.cookies["sess-id-k29cn3s0"];

  // check if both sessionIdCookie and Google Auth Cookie exist on request
  // if not, redirect user back to login, if so, use express next middleware
  if (!req.session.authId && !sessionIdCookie) return res.redirect("/login");
  return next();
};

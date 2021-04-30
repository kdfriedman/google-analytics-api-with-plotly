const urlParse = require('url-parse');
const queryParse = require('query-string');
const { google } = require('googleapis');
const { v4: uuidv4 } = require('uuid');

/* ROUTE HANDLER */
exports.handleAuthSuccess = (req, res, next) => {
  (async () => {
    try {
      // parse code out of auth redirect url to use for token generation
      const queryUrl = new urlParse(req.url);
      const code = queryParse.parse(queryUrl.query).code;

      // when a user requests /success directly, without going through authentication
      if (!code) return res.redirect('/');

      const oauth2Client = new google.auth.OAuth2(
        process.env.GOOGLE_CLIENT_ID,
        process.env.GOOGLE_CLIENT_SECRET,
        process.env.GOOGLE_REDIRECT
      );
      const { tokens } = await oauth2Client.getToken(code);
      oauth2Client.setCredentials(tokens);

      oauth2Client.on('tokens', async (tokens) => {
        if (tokens.refresh_token) {
          // store the refresh_token in my database!
          console.log(tokens.refresh_token);
          console.log('inside onToken listener - refresh token check');
        }
        console.log(tokens.access_token, 'inside successController');
      });

      // add unique authId to req session
      req.session.authId = uuidv4();

      // save tokens and oauth2Client to session store
      req.session.tokens = tokens;

      req.session.save(() => {
        // generate google-auth session cookie
        res.cookie(`goog-auth-session-id`, uuidv4(), {
          secure: process.env.NODE_ENV === 'production' ? true : false,
          httpOnly: true,
          maxAge: 1000 * 60 * 1440,
        });
        res.redirect('/');
      });
    } catch (err) {
      console.log(err);
    }
  })();
};

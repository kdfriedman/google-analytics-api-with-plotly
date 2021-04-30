const { google } = require('googleapis');
const {
  getGoogleAnalyticsData,
} = require('../google-apis/google-analytics-reporting-api');
const {
  getGoogleAnalyticsPropertyData,
} = require('../google-apis/google-analytics-management');

/* ROUTE HANDLER */
exports.queryData = (req, res, next) => {
  (async () => {
    try {
      // instantiate new oauth2Client for google analytics api call
      const oauth2Client = new google.auth.OAuth2(
        process.env.GOOGLE_CLIENT_ID,
        process.env.GOOGLE_CLIENT_SECRET,
        process.env.GOOGLE_REDIRECT
      );

      // TODO: test api documentation reference listener for refresh tokens
      oauth2Client.on('tokens', async (tokens) => {
        if (tokens.refresh_token) {
          // store the refresh_token in my database!
          console.log(tokens.refresh_token);
          console.log('inside onToken listener - refresh token check');
        }
        console.log(
          tokens.access_token,
          'tokens.access_token - inside queryController'
        );
      });

      // set creds using stored auth token via session store
      oauth2Client.setCredentials(req.session.tokens);

      // handle authorization for each user requesting data via google management api
      const hasPermissionToAccessViewData = await getGoogleAnalyticsPropertyData(
        oauth2Client
      );

      // check if user has permission to access data, then query data from reporting api
      if (hasPermissionToAccessViewData) {
        console.log('inside queryController');

        const data = await getGoogleAnalyticsData(oauth2Client);

        // cache gaData in redis for all new requests
        res.locals.redisClient.setex('gaData', 86400, JSON.stringify(data));

        // pass GA JSON data into home template for further processing by client app
        return res.status(201).json({
          status: 201,
          data: data
            ? data
            : `The data returned from the API is null or undefined`,
        });
      }

      // pass GA JSON data into home template for further processing by client app
      return res.status(401).json({
        data: `Sorry, you do not have suffcient permissions to access this data`,
      });
    } catch (err) {
      console.log(err);
    }
  })();
};

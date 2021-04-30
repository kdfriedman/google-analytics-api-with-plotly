const { googleAuth } = require('../google-apis/google-auth');

/* ROUTE HANDLER */
exports.authenticateGoogle = (req, res) => {
  const authUrl = googleAuth(req);
  res.render('login', {
    loginUrl: authUrl,
  });
};

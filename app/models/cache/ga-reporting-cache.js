exports.cacheGoogleReportingData = (req, res, next) => {
  // check local variable from response to check if gaData exists in redis
  // if not, query ga reporting api, otherwise serve cached data
  res.locals.redisClient.get('gaData', (err, data) => {
    if (err) {
      console.log(err);
    }
    if (data != null) {
      return res.status(201).json({
        status: 201,
        data: JSON.parse(data),
      });
    }
    console.log('inside cacheGoogleReportingData');
    return next();
  });
};

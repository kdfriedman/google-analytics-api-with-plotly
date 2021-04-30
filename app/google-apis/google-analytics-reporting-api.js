const { google } = require("googleapis");

exports.getGoogleAnalyticsData = async (oauth2Client) => {
  // sliced for GA API formatting
  const currentDate = new Date().toISOString().slice(0, 10);
  const dateSplitByYYYYMMDD = new Date().toISOString().slice(0, 10).split("-");
  const currentDayOfMonth = dateSplitByYYYYMMDD[dateSplitByYYYYMMDD.length - 1];
  const currentYear = new Date().getFullYear();
  const currentDateWithThreeMonthDiff = new Date().getMonth() + 1 - 3;
  const currentDateWithOneMonthDiff = new Date().getMonth() + 1 - 1;
  const monthDecimalFirstPlace =
    new Date().getMonth() + 1 - currentDateWithOneMonthDiff > 9 ? "" : 0;

  const reqPayload = {
    requestBody: {
      reportRequests: [
        {
          viewId: process.env.GA_ANALYTICS_VIEW_ID,
          dateRanges: [
            {
              startDate: `${currentYear}-${monthDecimalFirstPlace}${currentDateWithOneMonthDiff}-${currentDayOfMonth}`,
              endDate: `${currentDate}`,
            },
          ],
          metrics: [
            {
              expression: "ga:goal5Completions",
            },
            {
              expression: "ga:goal6Completions",
            },
            {
              expression: "ga:goal7Completions",
            },
            {
              expression: "ga:goal8Completions",
            },
            {
              expression: "ga:goal16Completions",
            },
            {
              expression: "ga:goal18Completions",
            },
            {
              expression: "ga:goal19Completions",
            },
          ],
          dimensions: [
            {
              name: "ga:goalCompletionLocation",
            },
            {
              name: "ga:goalPreviousStep1",
            },
          ],
          pageSize: "1000000",
        },
      ],
      useResourceQuotas: true, // only applicable to ga360 users
    },
  };

  // Create the analytics reporting object
  const analyticsreporting = google.analyticsreporting({
    version: "v4",
    auth: oauth2Client,
  });

  //Fetch the analytics reporting
  const res = await analyticsreporting.reports.batchGet(reqPayload);
  // print response
  console.log(res);

  const formulateGaDataObject = (res) => {
    const resBody = JSON.parse(res.config.body);
    const resDateRanges = resBody.reportRequests[0].dateRanges[0];

    const gaData = res.data.reports[0].data.rows.map((row, i) => {
      return {
        dimensions: row.dimensions,
        metrics: row.metrics[0].values,
        dateRanges: resDateRanges,
      };
    });
    return gaData;
  };

  const formulatedGADataObject = formulateGaDataObject(res);
  return formulatedGADataObject;
};

const { google } = require("googleapis");

exports.getGoogleAnalyticsPropertyData = async (oauth2Client) => {
  // TODO: enable google analytics API in console via Zach
  // Figure out which params can be passed into list()
  const res = await google.analytics("v3").management.accountSummaries.list({
    version: "v3",
    auth: oauth2Client,
  });
  // return google analytics accounts
  const gaAccounts = res.data.items;
  const hasPermissionToAccessAccount = gaAccounts.some((gaAccount) => {
    return gaAccount.name.includes(process.env.GA_ANALYTICS_ACCOUNT_NAME);
  });

  // check if user has access to ga account
  if (!hasPermissionToAccessAccount) return false;

  const filterByAccount = gaAccounts.filter(
    (gaAccount) => gaAccount.name === process.env.GA_ANALYTICS_ACCOUNT_NAME
  );
  const webProperties = filterByAccount[0].webProperties;
  const hasPermissionToAccessProperty = webProperties.some((webProperty) =>
    webProperty.id.includes(process.env.GA_ANALYTICS_PROPERTY_ID)
  );
  console.log("hasPermissionToAccessProperty", hasPermissionToAccessProperty);

  // check if user has access to ga property
  if (!hasPermissionToAccessProperty) return false;

  const filterByProperty = webProperties.filter(
    (webProperty) => webProperty.id === process.env.GA_ANALYTICS_PROPERTY_ID
  );
  const profiles = filterByProperty[0].profiles;
  const hasPermissionToAccessView = profiles.some((profile) =>
    profile.id.includes(process.env.GA_ANALYTICS_VIEW_ID)
  );
  console.log("hasPermissionToAccessView", hasPermissionToAccessView);

  // check if user has access to ga view
  if (!hasPermissionToAccessView) return false;

  return hasPermissionToAccessView;
};

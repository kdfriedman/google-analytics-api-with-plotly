## Google Analytics Reporting API V4 + Google OAuth2 + Plotly.JS + D3.JS + Redis

Query Google Analytics data using the GA V4 Reporting API and V3 Management API. Take data output and visualize using Ploty.JS.

Handle's authentication and authorization via Google OAuth2 and Redis Session Store. 
Once the data has been requested for a single authenticated user, the data will cache for 24 hours, unless the user manually removes their session cookie.

Requirements:
  * GCP account
  * Google OAuth2 Client
  * Client Id
  * Client Secret
  * Redis/Memory Store Instance (GCP hosted)

const quickbook = require("../models/quickbook"); // Adjust path based on your project
const client = require("../models/client"); // Adjust as needed
const OAuthClient = require("intuit-oauth");

const MAX_RETRIES = 3; // Move outside the object

const isProduction = process.env.QB_IS_PRODUCTION === '1';

// Load environment variables based on the environment
const QB_CONFIG = {
  clientId: isProduction ? process.env.QB_CLIENTID_PRODUCTION : process.env.QB_CLIENTID,
  clientSecret: isProduction ? process.env.QB_CLIENTSECRET_PRODUCTION : process.env.QB_CLIENTSECRET,
  environment: isProduction ? process.env.QB_ENVIRONMENT_PRODUCTION : process.env.QB_ENVIRONMENT,
  redirectUri: isProduction ? process.env.QB_REDIRECTURI_PRODUCTION : process.env.QB_REDIRECTURI,
  companyId: isProduction ? process.env.QB_COMPANYID_PRODUCTION : process.env.QB_COMPANYID,
  baseUrl: isProduction ? process.env.QB_BASE_URL_PRODUCTION : process.env.QB_BASE_URL,
};

const QuickBooksHelper = {
  /**
   * Fetch the latest QuickBooks token from the database.
   * Refresh if necessary.
   * @returns {Promise<object>} - Returns the new auth token
   */
  getQuickBooksToken: async function () {
    try {
      // Fetch the latest QuickBooks token
      const getToken = await quickbook.aggregate([
        { $sort: { number: -1 } },
        { $limit: 1 },
      ]);

      if (!getToken.length) {
        throw new Error("No QuickBooks token found in the database");
      }

      const oauthClient = new OAuthClient({
        clientId: QB_CONFIG.clientId,
        clientSecret: QB_CONFIG.clientSecret,
        environment: 'production',
        redirectUri: QB_CONFIG.redirectUri,
      })
      // Refresh the QuickBooks token
      const authResponse = await oauthClient.refreshUsingToken(
        getToken[0].refresh_token
      );
      const resToken = authResponse.getJson();

      console.log("Refreshed QuickBooks Token:", resToken);

      // Check if token exists in the database
      const tokenData = await quickbook.aggregate([
        { $match: { refresh_token: resToken.refresh_token } },
      ]);

      // Update or Insert new token
      if (!tokenData.length) {
        await quickbook.findByIdAndUpdate(getToken[0]._id, {
          refresh_token: resToken.refresh_token,
        });
      }

      // Return the new token
      return {
        token_type: resToken.token_type,
        access_token: resToken.access_token,
        expires_in: resToken.expires_in,
        refresh_token: resToken.refresh_token,
        x_refresh_token_expires_in: resToken.x_refresh_token_expires_in,
      };
    } catch (error) {
      console.error("Error in getQuickBooksToken:", error);
      throw error;
    }
  },

  /**
   * Make an authenticated API call to QuickBooks
   * @param {string} endpoint - API endpoint (e.g., "/customer")
   * @param {string} method - HTTP method (e.g., "POST")
   * @param {object} body - Request body object
   * @returns {Promise<object>} - API response
   */

  async makeQuickBooksApiPostCall(endpoint,
    body,
    apitype,
    body_text) {
    try {
      const authToken = await this.getQuickBooksToken();

      const oauthClient = new OAuthClient({
        clientId: QB_CONFIG.clientId,
        clientSecret: QB_CONFIG.clientSecret,
        environment: QB_CONFIG.environment,
        redirectUri: QB_CONFIG.redirectUri,
        token: authToken,
      });

      let response;
      let retries = 0;

      while (retries < MAX_RETRIES) {
        try {
          if (apitype === "text") {
            response = await oauthClient.makeApiCall({
              url: endpoint,
              method: "POST",
              headers: { "Content-Type": "application/text" },
              body: body_text || "Select * from Customer startposition 1 maxresults 550",
            });
          } else {
            response = await oauthClient.makeApiCall({
              url: endpoint,
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(body),
            });
          }

          return JSON.parse(response.body);
        } catch (err) {
          retries++;
          console.warn(`Retry attempt ${retries} failed with error:`, err);

          if (retries < MAX_RETRIES) {
            console.log("Waiting 5 seconds before retrying...");
          } else {
            throw err;
          }
        }
      }
    } catch (error) {
      console.error("Error in makeQuickBooksApiPostCall:", error);

      if (error.authResponse && error.authResponse.body) {
        return {
          success: false,
          message: error.authResponse.body,
        };
      }

      return {
        success: false,
        message: error.message || "Unknown error occurred",
      };
    }
  },
  makeQuickBooksApiGetCall: async function (endpoint) {
    try {
      const authToken = await this.getQuickBooksToken();

      const oauthClient = new OAuthClient({
        clientId: QB_CONFIG.clientId,
        clientSecret: QB_CONFIG.clientSecret,
        environment: QB_CONFIG.environment,
        redirectUri: QB_CONFIG.redirectUri,
        token: authToken,
      });
      const response = await oauthClient.makeApiCall({
        url: endpoint,
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      return JSON.parse(response.body);
    } catch (error) {
      console.error("Error in makeQuickBooksApiGetCall:", error);
      if (error.authResponse && error.authResponse.body) {
        return error.authResponse.json;
      }

      return {
        success: false,
        message: error.originalMessage || "Unknown error occurred",
      };
    }
  },
};

module.exports = QuickBooksHelper;

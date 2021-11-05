/**
 * Makes a single API request to retrieve the user's IP address.
 * Input:
 *   - A callback (to pass back an error or the IP string)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The IP address as a string (null if error). Example: "162.245.144.188"
 */
const request = require("request");
const fetchMyIP = function(callback) {

  // use request to fetch IP address from JSON API
  // inside the request callback ...
  // error can be set if invalid domain, user is offline, etc.
  request({
    url: `https://api.ipify.org?format=json`,
    method: "GET",
  },
  function(error,response,body) {
    // error handling
    // inside the request callback ...
    // error can be set if invalid domain, user is offline, etc.
    //console.log(body);
    const data = JSON.parse(body);
    //console.log(data.ip);
    if (error) {
      callback(error, null);
      return;
    }
    // if non-200 status, assume server error
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    } else {
      callback(null,data.ip);
    }
  });
 // return ip;
};
const fetchCoordsByIP = function(ip, callback) {
// use request to fetch IP address from JSON API
  // inside the request callback ...
  // error can be set if invalid domain, user is offline, etc.
  request(`https://freegeoip.app/json/${ip}`, (error, response, body) => {
    const { latitude, longitude } = JSON.parse(body);
  
  if (error) {
      callback(error, null);
      return;
    }

    if (response.statusCode !== 200) {
      callback(Error(`Status Code ${response.statusCode} when fetching Coordinates for IP: ${body}`), null);
      return;
    }

    
    callback(null, { latitude, longitude });
  });
}; 
// if we get here, all's well and we got the data
module.exports = { fetchMyIP ,fetchCoordsByIP};
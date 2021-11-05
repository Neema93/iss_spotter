const { fetchMyIP } = require('./iss_promised');
const { fetchCoordsByIP } = require('./iss_promised');
const { fetchISSFlyOverTimes } = require('./iss_promised');
const { nextISSTimesForMyLocation } = require('./iss_promised');
fetchMyIP()
//run fetchCoordsByIp
.then(fetchCoordsByIP)
.then(fetchISSFlyOverTimes)
.then(nextISSTimesForMyLocation)
.then((passTimes) => {
  printPassTimes(passTimes);
})
.then(body => console.log(body))
.catch((error) => {
    console.log("It didn't work: ", error.message);
});
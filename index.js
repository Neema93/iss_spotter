// index.js
const { fetchMyIP } = require('./iss');
const { fetchCoordsByIP } = require('./iss')
const { fetchISSFlyOverTimes } =require('./iss')
const { nextISSTimesForMyLocation } = require('./iss');
fetchMyIP((error, ip) => {
  if (error) {
    console.log("It didn't work!" , error);
    return;
  }
  
  console.log('It worked! Returned IP:' , ip);
});
fetchCoordsByIP('162.245.144.188', (error, coordinates) => {
    if (error) {
      console.log("It didn't work!" , error);
      return;
    }
  
    console.log('It worked! Returned coordinates:' , coordinates);
});

// The code below is temporary and can be commented out.

const exampleCoords = { latitude: '49.27670', longitude: '-123.13000' };

fetchISSFlyOverTimes(exampleCoords, (error, passTimes) => {
  if (error) {
    console.log("It didn't work!" , error);
    return;
  }
  //error not found reply 
  console.log('It worked! Returned flyover times:' , passTimes);
});
//data start to print
const printPassTimes = function(passTimes) {
    for (const pass of passTimes) {
      const datetime = new Date(0);
      datetime.setUTCSeconds(pass.risetime);
      const duration = pass.duration;
      console.log(`Next pass at ${datetime} for ${duration} seconds!`);
    }
  };
  //function call print by function
  nextISSTimesForMyLocation((error, passTimes) => {
    if (error) {
      return console.log("It didn't work!", error);
    }
    // success, print out the deets!
    printPassTimes(passTimes);
  });
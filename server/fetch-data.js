/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
const APIGet = require('./communicator');
const rebuildData = require('./json-api-rebuild');

const fetchData = ( url ) => {
  return new Promise((res, rej) => {
    APIGet( url )
      .then((d) => {
        res(rebuildData(d));
      })
      .catch((error) => {
        rej(error);
      });
  });
};

module.exports = fetchData;

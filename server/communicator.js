/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
require('dotenv').config();
const https = require('https');
const axios = require('axios');

const apiBaseUrl = process.env.REACT_APP_API_URL;

const instance = axios.create({
  httpsAgent: new https.Agent({
    rejectUnauthorized: false
  })
});

const APIGet = ( endpoint ) => {
  const url = `${apiBaseUrl}${endpoint}`;
  return new Promise((res, rej) => {
    instance.get(url)
      .then((response) => {
        return res(response.data);
      })
      .catch((error) => {
        return rej(error);
      });
  });
};

module.exports = APIGet;

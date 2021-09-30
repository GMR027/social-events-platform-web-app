import https from 'https';
import axios from 'axios';
import EnvironmentVariables from 'src/constants/EnvironmentVariables';

const env = EnvironmentVariables.getInstance();
const instance = axios.create({
  httpsAgent: new https.Agent({
    rejectUnauthorized: false
  }),
  headers: {
    'Content-Type': 'application/vnd.api+json'
  }
});

export const APIGet = ( endpoint: string, includeBaseURL = true, jwt: any = null ): Promise<any> => {
  const url = `${env.apiBaseUrl}${endpoint}`;
  return new Promise((res, rej) => {
    instance.get(includeBaseURL ? url : endpoint, {
      headers: {
        'Authorization': jwt ? `Bearer ${jwt}` : ''
      }
    })
      .then((response) => {
        return res(response.data);
      })
      .catch((error) => {
        return rej(error);
      });
  });
};

export const APIPost = ( endpoint: string, data: any, includeBaseURL = true, jwt: any = null ): Promise<any> => {
  const url = `${env.apiBaseUrl}${endpoint}`;
  return new Promise((res, rej) => {
    instance.post(includeBaseURL ? url : endpoint, data, {
      headers: {
        'Authorization': jwt ? `Bearer ${jwt}` : ''
      }
    })
      .then((response) => {
        return res(response.data);
      })
      .catch((error) => {
        return rej(error);
      });
  });
};

export const APIPatch = ( endpoint: string, data: any, includeBaseURL = true, jwt: any = null ): Promise<any> => {
  const url = `${env.apiBaseUrl}${endpoint}`;
  return new Promise((res, rej) => {
    instance.patch(includeBaseURL ? url : endpoint, data, {
      headers: {
        'Authorization': jwt ? `Bearer ${jwt}` : ''
      }
    })
      .then((response) => {
        return res(response.data);
      })
      .catch((error) => {
        return rej(error);
      });
  });
};

export const APIDelete = ( endpoint: string, includeBaseURL = true, jwt: any = null ): Promise<any> => {
  const url = `${env.apiBaseUrl}${endpoint}`;
  return new Promise((res, rej) => {
    instance.delete(includeBaseURL ? url : endpoint, {
      headers: {
        'Authorization': jwt ? `Bearer ${jwt}` : ''
      }
    })
      .then((response) => {
        return res(response.data);
      })
      .catch((error) => {
        return rej(error);
      });
  });
};

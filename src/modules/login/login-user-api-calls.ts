import {
  APIPost,
  APIGet
} from 'src/api/communicator';

const GetUserProfileAPICall = ( data: any ): Promise<any> => {
  return new Promise((res, rej) => {
    const url = `user-profile/?filter[user]=${data.id}`;
    APIGet(url, true, data.meta.access)
      .then((response: any) => {
        return res({
          user: data,
          userProfile: response.data[0]
        });
      })
      .catch((error: any) => {
        rej(error);
      });
  });
};

const LoginUserAPICall = ( loginPayload: any ): Promise<any> => {
  return new Promise((res, rej) => {
    APIPost('login/', loginPayload)
      .then((response: any) => {
        return res(GetUserProfileAPICall(response.data));
      })
      .then((response: any) => {
        return res(response);
      })
      .catch((error: any) => {
        rej(error);
      });
  });
};

export default LoginUserAPICall;

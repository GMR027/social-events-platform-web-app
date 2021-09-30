import {
  APIPost,
  APIGet,
  APIPatch
} from 'src/api/communicator';

const loginPayload = {
  data: {
    email: '',
    password: '',
    type: 'login'
  }
};

const UpdateUserProfileAPICall = ( data: any ): Promise<any> => {
  return new Promise((res, rej) => {
    const userProfileData = {
      data: {
        type: 'UserProfile',
        id: data.data.profile.id,
        attributes: {
          img_picture: data.data.attributes.img_picture
        }
      }
    };
    const url = `user-profile/${data.data.profile.id}/`;
    APIPatch(url, userProfileData, true, data.data.login.meta.access)
      .then((response: any) => {
        return res({
          user: data.data.login,
          userProfile: response.data
        });
      })
      .catch((error: any) => {
        return rej(error);
      });
  });
};

const GetUserProfileAPICall = ( data: any ): Promise<any> => {
  return new Promise((res, rej) => {
    const url = `user-profile/?filter[user]=${data.data.id}`;
    APIGet(url, true, data.data.login.meta.access)
      .then((response: any) => {
        if ( data.data.attributes.img_picture ) {
          data.data.profile = response.data[0];
          return res(UpdateUserProfileAPICall(data));
        }
        return res(response);
      })
      .then((response: any) => {
        return res(response);
      })
      .catch((error: any) => {
        rej(error);
      });
  });
};

const LoginUserAPICall = ( data: any ): Promise<any> => {
  return new Promise((res, rej) => {
    loginPayload.data.email = data.data.attributes.email;
    loginPayload.data.password = data.data.attributes.password;
    APIPost('login/', loginPayload)
      .then((response: any) => {
        if ( data.data.attributes.img_picture ) {
          data.data.id = response.data.id;
          data.data.login = response.data;
          return res(GetUserProfileAPICall(data));
        }
        return res(response);
      })
      .then((response: any) => {
        return res(response);
      })
      .catch((error: any) => {
        rej(error);
      });
  });
};

const RegisterUserAPICall = ( data: any, login = false ): Promise<any> => {
  return new Promise((res, rej) => {
    APIPost('users/', data)
      .then((response: any) => {
        if ( login ) return LoginUserAPICall(data);
        return res(response);
      })
      .then((response: any) => {
        return res(response);
      })
      .catch((error: any) => {
        return rej(error);
      });
  });
};

export default RegisterUserAPICall;

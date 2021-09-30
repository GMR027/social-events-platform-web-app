import {
  USER
} from 'src/constants/SystemConstants';

export const SetUserData = ( data: any ): any => {
  return {
    type: USER,
    data: data
  };
};

import { APIGet } from 'src/api/communicator';
import rebuildData from 'src/modules/utils/json-api-rebuild';

const fetchData = ( url: string ): Promise<any> => {
  return new Promise((res, rej) => {
    APIGet( url )
      .then((d: any) => {
        res(rebuildData(d));
      })
      .catch((error) => {
        rej(error);
      });
  });
};

export default fetchData;

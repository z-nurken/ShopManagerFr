import { BASE_API_URL } from './config';

const API = async (method, path, data) => {
  const API_URL = `${BASE_API_URL}${path}`;
  const response = await fetch(API_URL, {
    body: JSON.stringify(data),
    headers: {
      'content-type': 'application/json',
      Authorization: localStorage.token,
    },
    method: method || 'GET',
  }).then((res) => res.json());


  // const returnPromise = new Promise((resolve,reject) => {
  //   response.then((res) => {
  //     if(res.errorCode) {
  //       throw new Error(res); 
  //     } 
  //     resolve(res);
  //   })
  //   .catch(reject);
  // });
  // return returnPromise;
};

export default API;

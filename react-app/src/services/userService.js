import axios from 'axios';

const url = 'http://192.168.1.16:4000/auth';

export const login = async (email, password) => {
  const body = {
    "email": email,
    "password": password
  };

  const headerObject = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  };

  const stringifiedBody = JSON.stringify(body);
  return new Promise((resolve, reject) => {
    axios.post(url + '/login', stringifiedBody, { headers: headerObject })
      .then((response) => {
        resolve(response.data);
      })
      .catch((ex) => {
        reject(ex);
      });
  });
};

export const register = async (email, name, password, rePassword) => {
  const body = {
    "email": email,
    "name": name,
    "password": password,
    "rePassword": rePassword
  };

  const headerObject = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  };

  const stringifiedBody = JSON.stringify(body);
  return new Promise((resolve, reject) => {
    axios.post(url + '/register', stringifiedBody, { headers: headerObject })
    .then((response) => {
      resolve(response.data);
    })
    .catch((ex) => {
      reject(ex);
    });
  })
};
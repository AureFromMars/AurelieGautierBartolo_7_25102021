import axios from 'axios';

const requestWithoutAuth = () => { 
  return axios.create({
    baseURL: 'http://localhost:3001/api/',
    headers: {
      'Content-type': 'application/json',
    }
  })
};

const requestAuth = () => { 
  return axios.create({
    baseURL: 'http://localhost:3001/api/',
    headers: {
      'Content-type': 'application/json',
      'Authorization': "Bearer " + localStorage.getItem('token')
    }
  })
};
const requestWithoutAuthWithFile = () => { 
  return axios.create({
    baseURL: 'http://localhost:3001/api/',
    headers: {
      // 'Content-Type': 'multipart/form-data',
    }
  })
};

const requestAuthWithFile = () => { 
  return axios.create({
    baseURL: 'http://localhost:3001/api/',
    headers: {
      // 'Content-Type': 'multipart/form-data',
      'Authorization': "Bearer " + localStorage.getItem('token')
    }
  })
};


export {
  requestWithoutAuth,
  requestAuth,
  requestWithoutAuthWithFile,
  requestAuthWithFile
}
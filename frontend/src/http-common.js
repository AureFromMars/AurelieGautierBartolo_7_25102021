import axios from 'axios';

const requestWithoutAuth = axios.create({
  baseURL: 'http://localhost:3001/api/',
  headers: {
    'Content-type': 'application/json'
  },
});

const requestAuth = axios.create({
  baseURL: 'http://localhost:3001/api/',
  headers: {
    'Content-type': 'application/json',
    'Authorization': "Bearer " + localStorage.getItem('token')
  }
});

// export default axios.create({// PROBLEME FROM Messages that required default !!!!
//   baseURL: "http://localhost:3001/api/",
//   headers: {
//     "Content-type": "application/json",
//     "Authorization": "Bearer " + localStorage.getItem('token')
//   },
// });

// const authHeader = () => {
// // export default function authHeader() {
//   if (localStorage.getItem('user')) {
//     return { Authorization: "Bearer " + localStorage.getItem('user') };
//   } else {
//     return {};
//   }
// };

export {
  // authHeader,
  requestWithoutAuth,
  requestAuth
}
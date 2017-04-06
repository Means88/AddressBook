import axios from 'axios';

let settings = {};
try {
  settings = require('./local_settings').default;
} catch (e) {
  console.error(e);
}

export const bmob = axios.create({
  baseURL: 'https://api.bmob.cn/1/classes/',
  headers: {
    'X-Bmob-Application-Id': settings.APP_ID,
    'X-Bmob-REST-API-Key': settings.API_KEY,
    'Content-Type': 'application/json',
  }
});


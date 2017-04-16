import axios from 'axios';

let settings = {};
try {
  settings = require('./local_settings').default;
} catch (e) {
  console.error(e);
}

const bmobApi = axios.create({
  baseURL: 'https://api.bmob.cn/1/classes/',
  headers: {
    'X-Bmob-Application-Id': settings.APP_ID,
    'X-Bmob-REST-API-Key': settings.API_KEY,
    'Content-Type': 'application/json',
  }
});


const bmobMock = {
  get: async() => {
    return {
      data: {
        results: [{
          objectId: 'testid',
          name: 'test name',
          tel: '123',
        }],
      }
    };
  },

  post: async() => {
    return {
      data: { objectId: 'addid' },
    };
  },

  delete: async() => {
    return { data: {} };
  },

  put: async() => {
    return {
      data: {
        objectId: 'testid',
        name: 'test put',
        tel: '123',
      }
    };
  },
};

let _bmob = null;
if (typeof process !== 'undefined' && typeof process.env !== 'undefined' && process.env.NODE_ENV === 'test') {
  _bmob = bmobMock;
} else {
  _bmob = bmobApi;
}

export const bmob = _bmob;

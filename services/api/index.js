import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://cointranche.com/',
});

export const UserApi = {
  async register(userData) {
    const { data } = await instance.post('/api/user/register/', userData);
    return data;
  },
};

export const Login = {
  async login(userData) {
    const { data } = await instance.post('/api/user/login/', userData);
    return data;
  },
};

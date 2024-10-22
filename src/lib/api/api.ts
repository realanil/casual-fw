// lib/api.ts
import axios from 'axios';

export const fetchUsers = async () => {
  const response = await axios.get('/api/hello');
  return response.data;
};

export const createUser = async (name: string) => {
  const response = await axios.post('/api/users', { name });
  return response.data;
};

export const ApiPost = async (postData: any={}) => {
  // console.log("postData=>", postData)
    const response: any = await axios.post('/api/hello', postData);
    return response.data;
  };
  export const AuthApiPost = async (postData: any={}) => {
    // console.log("postData=>", postData)
      const response: any = await axios.post('/api/game', postData);
      return response.data;
    };
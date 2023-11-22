
'use client'
import axios from 'axios';
import toast from 'react-hot-toast';

axios.defaults.baseURL = `${process.env.NEXT_PUBLIC_API_URL}/api`;

export const TOKEN_KEY = "AUTH_DATA";


axios.interceptors.request.use(
   (request) => {
      return request;
   },
   (error) => {
      return Promise.reject(error);
   }
);


axios.interceptors.response.use(
   (response) => response,
   (error) => {
      const { data } = error.response;
      if (data.statusCode === 500 && data.message === 'Github Api rate limit exceeded') {
         toast.error('Github API rate limit exceeded, please try about 1 hour');
      }
      return Promise.reject(error);
   }
);



export default axios;


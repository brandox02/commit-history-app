
'use client'
import axios from 'axios';
import Cookies from 'js-cookie';
import toast from 'react-hot-toast';

axios.defaults.baseURL = `${process.env.NEXT_PUBLIC_API_URL}/api`;

export const TOKEN_KEY = "AUTH_DATA";

function getToken() {
   const authData = JSON.parse(Cookies.get(TOKEN_KEY) || "{}");
   if (authData?.token) {
      return authData.token
   }
   return null
}

axios.interceptors.request.use(
   (request) => {
      const token = getToken();
      if (token) request.headers.Authorization = `Bearer ${token}`;
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
      if (data.statusCode === 401 && data.message === 'Unauthorized') {
         Cookies.remove(TOKEN_KEY);
         window.location.href = '/login'
      }

      if (data.statusCode === 500 && data.message === 'Github Api rate limit exceeded') {
         toast.error('Github API rate limit exceeded, please try about 1 hour');
      }
      return Promise.reject(error);
   }
);



export default axios;


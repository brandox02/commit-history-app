
'use client'
import aa from 'axios';
import Cookies from 'js-cookie';


const axios = aa.create()

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
      return Promise.reject(error);
   }
);



export default axios;


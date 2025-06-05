import axios from 'axios';
import { signOut } from 'next-auth/react';
const client = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_ENDPOINT,
});
client.interceptors.request.use(
  async (config) => {
    // const { access_token: loginToken = '' } =
    //   store.getState()?.user?.UserDetails?.user || {};

    // if (loginToken) {
    //   config.headers.Authorization = 'Bearer ' + loginToken;
    // }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

client.interceptors.response.use(
  (res) => {
    if (!res?.data?.status) {
      throw res?.data;
    }

    return res;
  },
  async (error) => {
    if (error.message === 'Network Error') {
      if (error?.response?.status === 504) {
        throw {
          ...error.response.data,
          error_message:
            'Something went wrong. Please try again later or contact support if the issue persists.',
        };
      } else {
        throw {
          ...error.response.data,
          error_message:
            'An error occurred on the server. Please try again later or contact support if the issue persists.',
        };
      }
    }
    if (error.response) {
      if (error.response.status === 500) {
        throw {
          ...error.response.data,
          error_message:
            'Something went wrong. Please try again later or contact support if the issue persists.',
        };
      }
      if (error.response.status === 401) {
        localStorage.clear();
        sessionStorage.clear();
        // window.location.replace('/');
        // store.dispatch(logout());
        await signOut({ redirect: false });
        // window.location.href = getLogoutRedirectURL();
      }
      // if (error.response.status === 403) {
      //   localStorage.clear();
      //   sessionStorage.clear();
      //   store.dispatch(logout());
      //   // window.location.replace('/');
      //   await signOut({ redirect: false });
      //   window.location.href = getLogoutRedirectURL();
      // }
      throw {
        ...error.response.data,
        statusCode: error.response.status,
      };
    }
    throw {
      ...error.response.data,
      error_message:
        'Something went wrong. Please try again later or contact support if the issue persists.',
    };
  }
);

export default client;

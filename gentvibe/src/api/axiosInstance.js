  // import axios from "axios";
  // import { base_url } from "./api";

  // const axiosInstance = axios.create({
  //   baseURL: base_url,        // your API base url
  //   withCredentials: true     // needed for refresh token cookie
  // });

  // // 🔐 Attach access token automatically
  // axiosInstance.interceptors.request.use((config) => {

  //   const token = sessionStorage.getItem("token");

  //   if (token) {
  //     config.headers.Authorization = `Bearer ${token}`;
  //   }

  //   return config;
  // });

  // // 🔁 Handle token refresh automatically
  // axiosInstance.interceptors.response.use(
  //   (response) => response,
  //   async (error) => {

  //     const originalRequest = error.config;

  //     if (
  //       error.response?.status === 401 &&
  //       !originalRequest._retry &&
  //       !originalRequest.url.includes("/auth/refresh")
  //     ) {

  //       originalRequest._retry = true;

  //       try {

  //         const res = await axios.post(
  //           `${base_url}/auth/refresh`,
  //           {},
  //           { withCredentials: true }
  //         );

  //         const newAccessToken = res.data.accessToken;

  //         sessionStorage.setItem("token", newAccessToken);

  //         originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

  //         return axiosInstance(originalRequest);

  //       } catch (err) {

  //         sessionStorage.removeItem("token");
  //         window.location.href = "/login";

  //         return Promise.reject(err);
  //       }
  //     }

  //     return Promise.reject(error);
  //   }
  // );

  // export default axiosInstance;

  import axios from "axios";
import { base_url } from "./api";

const axiosInstance = axios.create({
  baseURL: base_url,
  withCredentials: true
});

let isRefreshing = false;
let subscribers = [];

function subscribe(callback) {
  subscribers.push(callback);
}

function notifySubscribers(token) {
  subscribers.forEach(cb => cb(token));
  subscribers = [];
}


// REQUEST INTERCEPTOR

axiosInstance.interceptors.request.use((config) => {

  const token = sessionStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});


// RESPONSE INTERCEPTOR

axiosInstance.interceptors.response.use(

  response => response,

  async (error) => {

    const originalRequest = error.config;

    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      !originalRequest.url.includes("/auth/refresh")
    ) {

      // if refresh already running
      if (isRefreshing) {

        return new Promise((resolve) => {

          subscribe((token) => {

            originalRequest.headers.Authorization = `Bearer ${token}`;

            resolve(axiosInstance(originalRequest));

          });

        });

      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {

        const res = await axiosInstance.post("/auth/refresh");

        const newToken = res.data.accessToken;

        sessionStorage.setItem("token", newToken);

        notifySubscribers(newToken);

        originalRequest.headers.Authorization = `Bearer ${newToken}`;

        return axiosInstance(originalRequest);

      }

      catch (err) {

        sessionStorage.removeItem("token");

        window.location.href = "/login";

        return Promise.reject(err);

      }

      finally {

        isRefreshing = false;

      }

    }

    return Promise.reject(error);

  }

);

export default axiosInstance;

"use client"
import axios from "axios";

axios.defaults.withCredentials = true
export const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BASE_URL,
    // withCredentials: true
    headers:{
      "Content-Type" :"application/json",
      Accept:"application/json"
    }
    
  });   


  // axios.interceptors.response.use(function (response) {
  //   // Any status code that lie within the range of 2xx cause this function to trigger
  //   // Do something with response data
  //   return response;
  // }, function (error) {
  //   if(error.response.status == 400){
  //       localStorage.removeItem("user")
  //       window.location.href = "/login"
  //   }
  //   // Any status codes that falls outside the range of 2xx cause this function to trigger
  //   // Do something with response error
  //   return Promise.reject(error);
  // });
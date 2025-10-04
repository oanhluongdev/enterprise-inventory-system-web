"use server";

import axios from "axios";
import { getServerSession, Session } from "next-auth";
import { authConfig } from "./next-auth-option";

const axiosClient = axios.create({
  baseURL: process.env.API_BASE_URL,
  timeout: 15000,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: "Bearer",
  },
});

const getToken = async () => {
  try {
    const session = (await getServerSession(authConfig)) as Session;
    if (session?.accessToken) {
      return session?.accessToken;
    }
  } catch {
    return Promise.resolve(null);
  }
};

axiosClient.interceptors.request.use(
  async (config) => {
    const token = await getToken();
    if (token) {
      config.headers["Authorization"] = "Bearer " + token;
    }
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

axiosClient.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    return Promise.reject(error.response?.data);
  }
);

export default axiosClient;

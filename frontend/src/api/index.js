import axios from "axios";

const API = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL || "http://localhost:5000",
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 500) {
      return Promise.reject(error);
    }
    return Promise.reject(error);
  }
);

const config = () => ({});

const api = {
  signin: async (loginData) => {
    const response = await API.post("api/users/login", loginData, config());
    return response.data;
  },

  signup: async (data) => {
    const response = await API.post("api/users/register", data, config());
    return response.data;
  },

  sendVerificationCode: async (data) => {
    const response = await API.post(
      "api/users/sendVerificationCode",
      data,
      config()
    );
    return response.data;
  },

  submitVerificationCode: async (data) => {
    const response = await API.post(
      "api/users/submitVerificationCode",
      data,
      config()
    );
    return response.data;
  },

  changePassword: async (data) => {
    const response = await API.post("api/users/resetPassword", data, config());
    return response.data;
  },

  getCirculars: async () => {
    const response = await API.get("api/users/events", config());
    return response.data;
  },

  getAttendance: async () => {
    const response = await API.get("api/users/attendance", config());
    return response.data;
  },

  getLeaves: async () => {
    const response = await API.get("api/users/leaves", config());
    return response.data;
  },

  getIncome: async ({ year, month }) => {
    const response = await API.get(
      `api/users/budget?year=${year}&month=${month}`,
      config()
    );
    return response.data;
  },

  getEvents: async () => {
    const response = await API.get("api/users/events", config());
    return response.data;
  },

  getLiabilities: async () => {
    const response = await API.get("api/users/liabilities", config());
    return response.data;
  },

  getDeduction: async () => {
    const response = await API.get("api/users/deduction", config());
    return response.data;
  },

  getProfile: async () => {
    const response = await API.get("api/users/profile", config());
    return response.data;
  },

  getProfilePicture: async () => {
    const response = await API.get("api/users/profile/picture", {
      responseType: "blob",
      ...config(),
    });

    const img = URL.createObjectURL(response.data);
    return img;
  },
};

export default api;

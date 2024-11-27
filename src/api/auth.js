import axios from "axios";
import { logout } from "../redux/slices/authSlice";
import store from "../redux/config/configStore";

// 공통 Axios 인스턴스 설정
const createApiInstance = (baseURL) => {
  const api = axios.create({
    baseURL,
  });

  api.interceptors.request.use(
    (config) => {
      const accessToken = localStorage.getItem("accessToken");
      if (accessToken) {
        config.headers["Authorization"] = `Bearer ${accessToken}`;
      }
      return config;
    },
    (err) => Promise.reject(err)
  );

  api.interceptors.response.use(
    (response) => response,
    (err) => {
      if (err.response?.data?.message) {
        if (
          err.response?.data?.message ===
          "토큰이 만료되었습니다. 다시 로그인 해주세요."
        ) {
          store.dispatch(logout());
        }
      }
      return Promise.reject(err);
    }
  );
  return api;
};

const authApi = createApiInstance("https://moneyfulpublicpolicy.co.kr");
const jsonApi = createApiInstance(
  "hhttps://buttery-bronze-drawbridge.glitch.me"
);

// 사용자 정보 조회를 위한 인터셉터 설정 (jsonApi)
jsonApi.interceptors.request.use(
  async (config) => {
    const { data } = await authApi.get("/user");
    if (data?.success) return config;
    return Promise.reject(new Error("사용자 정보 조회에 실패 했습니다."));
  },
  (err) => Promise.reject(err)
);

// API 요청 함수들
const apiRequest = async (method, url, data = null, headers = {}) => {
  try {
    const response = await authApi({
      method,
      url,
      data,
      headers,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const register = (userData) => apiRequest("post", "/register", userData);

export const login = (userData, expiresIn = "2h") =>
  apiRequest("post", "/login", userData, { params: { expiresIn } });

export const getUserProfile = async () => {
  const { data } = await authApi.get("/user");
  return data;
};

export const updateProfile = async (formData) => {
  const accessToken = localStorage.getItem("accessToken");
  const response = await authApi.patch("/profile", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return response.data;
};

export { authApi, jsonApi };

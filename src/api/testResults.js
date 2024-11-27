import axios from "axios";

export const jsonApi = axios.create({
  baseURL: "https://buttery-bronze-drawbridge.glitch.me/testResults",
});

export const createTestResult = async (mbti, mbtiDesc, userData) => {
  const timestamp = new Date().toISOString();
  const visibility = true;
  const result = {
    mbti,
    mbtiDesc,
    userData,
    timestamp,
    visibility,
  };
  const response = await jsonApi.post("/", result);
  return response.data;
};

export const getTestResults = async () => {
  const response = await jsonApi.get("/");
  return response.data;
};

export const updateTestResultVisibility = async (id, visibility) => {
  const response = await jsonApi.patch(`/${id}`, { visibility });
  return response.data;
};

export const deleteTestResult = async (id) => {
  const response = await jsonApi.delete(`/${id}`);
  return response.data;
};

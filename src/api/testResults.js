import { jsonApi } from "./auth";

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
  const response = await jsonApi.post("/testResults", result);
  return response.data;
};

export const getTestResults = async () => {
  const response = await jsonApi.get("/testResults");
  return response.data;
};

export const updateTestResultVisibility = async (id, visibility) => {
  const response = await jsonApi.patch(`/testResults/${id}`, { visibility });
  return response.data;
};

export const deleteTestResult = async (id) => {
  const response = await jsonApi.delete(`/testResults/${id}`);
  return response.data;
};

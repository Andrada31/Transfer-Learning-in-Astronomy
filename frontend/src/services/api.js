import axios from 'axios';

const API_BASE = 'http://127.0.0.1:5000/api';

export const uploadImage = (file) => {
  const formData = new FormData();
  formData.append('file', file);
  return axios.post(`${API_BASE}/upload`, formData);
};

export const predictImage = (imageBase64, modelName) => {
  return axios.post(`${API_BASE}/predict`, {
    image: imageBase64,
    model: modelName
  });
};

export const checkSimilarity = (imageBase64, modelName) => {
  return axios.post(`${API_BASE}/similarity`, {
    image: imageBase64,
    model: modelName
  });
};

export const predictYolo = (imageBase64) => {
  return axios.post(`${API_BASE}/predict-yolo`, {
    image: imageBase64
  });
};

export const fetchDocumentation = () => {
  return axios.get(`${API_BASE}/documentation`);
};

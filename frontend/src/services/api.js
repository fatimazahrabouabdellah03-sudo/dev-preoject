import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor pour gérer les erreurs
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

// Stage API calls
export const stageApi = {
  getAllStages: () => api.get('/stages'),
  getStudentStages: (studentId) => api.get(`/stages/student/${studentId}`),
  createStage: (stageData) => api.post('/stages', stageData),
  updateStageStatus: (id, status) => api.put(`/stages/${id}/status`, { status }),
  deleteStage: (id) => api.delete(`/stages/${id}`),
};

export default api;
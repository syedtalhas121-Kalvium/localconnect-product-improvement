import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export const getPosts = () => axios.get(`${API_URL}/posts`);
export const createPost = (content) => axios.post(`${API_URL}/posts`, { content });

export const getIssues = () => axios.get(`${API_URL}/issues`);
export const createIssue = (title, description) => axios.post(`${API_URL}/issues`, { title, description });
export const updateIssue = (id, status) => axios.patch(`${API_URL}/issues/${id}`, { status });

export const getEvents = () => axios.get(`${API_URL}/events`);
export const createEvent = (event) => axios.post(`${API_URL}/events`, event);
export const deleteEvent = (id) => axios.delete(`${API_URL}/events/${id}`);

export const getRecommendations = () => axios.get(`${API_URL}/recommendations`);
export const createRecommendation = (recommendation) => axios.post(`${API_URL}/recommendations`, recommendation);

export const getMetrics = () => axios.get(`${API_URL}/metrics`);

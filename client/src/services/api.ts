import axios from 'axios';
import type {
  ApiResponse,
  User,
  CreateUser,
  Login,
  Habit,
  CreateHabit,
  CheckIn,
  CreateCheckIn,
  Achievement
} from '@shared/types';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth API
export const authApi = {
  register: (data: CreateUser) =>
    api.post<ApiResponse<{ user: User; token: string }>>('/auth/register', data),

  login: (data: Login) =>
    api.post<ApiResponse<{ user: User; token: string }>>('/auth/login', data),

  me: () =>
    api.get<ApiResponse<User>>('/auth/me'),
};

// Habits API
export const habitsApi = {
  getAll: () =>
    api.get<ApiResponse<Habit[]>>('/habits'),

  getById: (id: string) =>
    api.get<ApiResponse<Habit>>(`/habits/${id}`),

  create: (data: CreateHabit) =>
    api.post<ApiResponse<Habit>>('/habits', data),

  update: (id: string, data: Partial<CreateHabit>) =>
    api.put<ApiResponse<Habit>>(`/habits/${id}`, data),

  delete: (id: string) =>
    api.delete<ApiResponse>(`/habits/${id}`),

  getStats: (id: string) =>
    api.get<ApiResponse<any>>(`/habits/${id}/stats`),
};

// CheckIns API
export const checkInsApi = {
  create: (data: CreateCheckIn) =>
    api.post<ApiResponse<CheckIn>>('/checkins', data),

  getByHabit: (habitId: string) =>
    api.get<ApiResponse<CheckIn[]>>(`/checkins/habit/${habitId}`),

  update: (id: string, data: Partial<CreateCheckIn>) =>
    api.put<ApiResponse<CheckIn>>(`/checkins/${id}`, data),

  delete: (id: string) =>
    api.delete<ApiResponse>(`/checkins/${id}`),
};

// Achievements API
export const achievementsApi = {
  getAll: () =>
    api.get<ApiResponse<Achievement[]>>('/achievements'),
};

// User API
export const userApi = {
  getStats: () =>
    api.get<ApiResponse<any>>('/users/stats'),

  updateProfile: (data: { name: string; avatar?: string }) =>
    api.put<ApiResponse<User>>('/users/profile', data),

  updateSettings: (data: {
    notificationsEnabled?: boolean;
    emailReminders?: boolean;
    theme?: 'light' | 'dark' | 'auto';
  }) =>
    api.put<ApiResponse>('/users/settings', data),
};

// AI API
export const aiApi = {
  getMotivationalTip: () =>
    api.get<ApiResponse<{ tip: string }>>('/ai/tip'),

  analyzeHabits: () =>
    api.get<ApiResponse<{
      insights: string[];
      recommendations: string[];
      strengths: string[];
      areasToImprove: string[];
    }>>('/ai/analyze'),

  suggestHabits: (goals: string) =>
    api.post<ApiResponse<{ suggestions: any[] }>>('/ai/suggest', { goals }),

  analyzeSentiment: (note: string) =>
    api.post<ApiResponse<{
      sentiment: 'positive' | 'neutral' | 'negative';
      score: number;
      keywords: string[];
    }>>('/ai/sentiment', { note }),

  chat: (messages: Array<{ role: string; content: string }>) =>
    api.post<ApiResponse<{ message: string }>>('/ai/chat', { messages }),

  generateActionPlan: (goal: string, timeframe: string) =>
    api.post<ApiResponse<{
      steps: Array<{ week: number; action: string; tips: string[] }>;
      milestones: string[];
    }>>('/ai/action-plan', { goal, timeframe }),

  getWeeklySummary: () =>
    api.get<ApiResponse<{
      summary: string;
      stats: any;
    }>>('/ai/weekly-summary'),
};

export default api;

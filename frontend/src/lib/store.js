import { create } from 'zustand';
import { auth } from './api';

export const useAuthStore = create((set) => ({
  user: null,
  token: localStorage.getItem('token'),
  isAuthenticated: !!localStorage.getItem('token'),
  
  login: async (credentials) => {
    const response = await auth.login(credentials);
    const { token, user } = response.data;
    localStorage.setItem('token', token);
    set({ user, token, isAuthenticated: true });
    return response;
  },
  
  register: async (data) => {
    const response = await auth.register(data);
    const { token, user } = response.data;
    localStorage.setItem('token', token);
    set({ user, token, isAuthenticated: true });
    return response;
  },
  
  logout: () => {
    localStorage.removeItem('token');
    set({ user: null, token: null, isAuthenticated: false });
  },
  
  fetchUser: async () => {
    try {
      const response = await auth.getMe();
      set({ user: response.data.user });
    } catch (error) {
      localStorage.removeItem('token');
      set({ user: null, token: null, isAuthenticated: false });
    }
  },
}));

export const usePromptsStore = create((set) => ({
  prompts: [],
  currentPrompt: null,
  loading: false,
  
  setPrompts: (prompts) => set({ prompts }),
  setCurrentPrompt: (prompt) => set({ currentPrompt: prompt }),
  setLoading: (loading) => set({ loading }),
  
  addPrompt: (prompt) => set((state) => ({ 
    prompts: [prompt, ...state.prompts] 
  })),
  
  updatePrompt: (id, updatedPrompt) => set((state) => ({
    prompts: state.prompts.map((p) => p.id === id ? updatedPrompt : p)
  })),
  
  deletePrompt: (id) => set((state) => ({
    prompts: state.prompts.filter((p) => p.id !== id)
  })),
}));

export const useTemplatesStore = create((set) => ({
  templates: [],
  currentTemplate: null,
  loading: false,
  
  setTemplates: (templates) => set({ templates }),
  setCurrentTemplate: (template) => set({ currentTemplate: template }),
  setLoading: (loading) => set({ loading }),
}));

export const useBrandVoicesStore = create((set) => ({
  brandVoices: [],
  currentBrandVoice: null,
  loading: false,
  
  setBrandVoices: (brandVoices) => set({ brandVoices }),
  setCurrentBrandVoice: (brandVoice) => set({ currentBrandVoice: brandVoice }),
  setLoading: (loading) => set({ loading }),
}));


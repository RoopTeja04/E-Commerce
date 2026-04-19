import { create } from 'zustand';
import axios from 'axios';

interface AuthState {
    user: any | null;
    token: string | null;
    tempEmail: string | null; // Used for OTP verification
    isAuthenticated: boolean;
    isAuthLoading: boolean;

    setAuth: (user: any, token: string) => void;
    setTempEmail: (email: string) => void;

    logout: () => void;
    initializeAuth: () => Promise<void>;
}

export const useAuthStore = create<AuthState>()((set) => ({
    user: null,
    token: null,
    tempEmail: null,
    isAuthenticated: false,
    isAuthLoading: true,

    setAuth: (user, token) => {
        set({ user, token, isAuthenticated: true, isAuthLoading: false });
    },

    setTempEmail: (email) => set({ tempEmail: email }),

    logout: () => {
        set({ user: null, token: null, isAuthenticated: false, isAuthLoading: false, tempEmail: null });
    },

    initializeAuth: async () => {
        set({ isAuthLoading: true });
        try {
            const res = await axios.post("http://localhost:5000/auth/refresh-token", {}, { withCredentials: true });
            const { accessToken, user } = res.data;
            set({ user, token: accessToken, isAuthenticated: true, isAuthLoading: false });
        } catch (err) {
            set({ user: null, token: null, isAuthenticated: false, isAuthLoading: false });
        }
    }
}));

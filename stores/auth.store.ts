import {create} from 'zustand';
import {FirebaseAuthTypes} from '@react-native-firebase/auth';

import {authService, IRegisterAndLoginPayload} from '../services/auth.service';

interface IAuthStoreState {
  isLogged: boolean;
  user: FirebaseAuthTypes.User | null;
  setUser: (payload: FirebaseAuthTypes.User | null) => void;
  register: (payload: IRegisterAndLoginPayload) => void;
  login: (payload: IRegisterAndLoginPayload) => void;
  logout: () => void;
  loginWithGoogle: () => void;
}

export const useAuthStore = create<IAuthStoreState>()(set => ({
  isLogged: false,
  user: null,

  setUser: payload => set({user: payload}),
  register: async payload => {
    await authService.register(payload);
  },
  login: async payload => {
    await authService.login(payload);
  },
  logout: async () => {
    await authService.logout();
    set({user: null});
  },
  loginWithGoogle: async () => {
    try {
      const {user} = await authService.loginWithGoogle();
      set({user});
    } catch (error) {
      throw error;
    }
  },
}));

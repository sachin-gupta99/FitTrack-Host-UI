import type { UserDataResponse } from '@/model/UserDataResponse';
import { create } from 'zustand'

interface UserStore {
    userData: UserDataResponse | null;
    setUserData: (userData: UserDataResponse) => void;
}

export const useUserStore = create<UserStore>((set) => ({
  userData: null,
  setUserData: (userData: UserDataResponse) => set({ userData }),
}))
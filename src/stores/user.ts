import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'
import { createJSONStorage, persist } from 'zustand/middleware'
import { UserDto } from '@/dtos'
import createSelectors from './libs/selector'
import { zustandStorage, StorageSceneKey } from './libs/storage'

interface UserState {
    token: string
    user: UserDto
}

interface UserAction {
    setUser: (user: UserDto) => void
    removeUser: () => void
    setToken: (token: string) => void
    removeToken: () => void
}

const initialState: UserState = {
    token: '',
    user: {
        id: '',
        avatar: '',
        email: '',
        name: '',
        created_at: new Date,
    }
}

const store = create<UserState & UserAction>()(
    immer(
        persist(
            (set, _get) => ({
                token: initialState.token,
                user: initialState.user,
                setUser: (user) => set({ user }),
                removeUser: () => set({ user: initialState.user }),
                setToken: (token) => set({ token }),
                removeToken: () => set({ token: initialState.token }),
            }),
            {
                name: StorageSceneKey.USER,
                storage: createJSONStorage(zustandStorage),
            }
        )
    )
)

export const useUserStore = createSelectors(store)
export function useUserReset() {
    store.setState(initialState)
}
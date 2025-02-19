import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'
import { createJSONStorage, persist } from 'zustand/middleware'
import { PhotoDto } from '@/dtos'
import createSelectors from './libs/selector'
import { zustandStorage, StorageSceneKey } from './libs/storage'

interface PhotoState {
    items: PhotoDto[]
}

interface PhotoAction {
    setItems: (specs: PhotoDto[]) => void
}

const initialState: PhotoState = {
    items: []
}

const store = create<PhotoState & PhotoAction>()(
    immer(
        persist(
            (set, _get) => ({
                items: initialState.items,
                setItems: (items) => set({ items}),
            }),
            {
                name: StorageSceneKey.PHOTOS,
                storage: createJSONStorage(zustandStorage),
            }
        )
    )
)

export const usePhotoStore = createSelectors(store)
import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { createJSONStorage, persist } from 'zustand/middleware';
import { SpecsDto } from '@/dtos';
import createSelectors from './libs/selector';
import { zustandStorage, StorageSceneKey } from './libs/storage';

interface EditorState {
    spec_id: string
    spec: SpecsDto | null
    origin_image_id: string
    processed_image_id: string
    image_base64: string
}

interface EditorAction {
    setSpecId: (spec_id: string) => void
    setSpec: (spec: SpecsDto | null) => void
    setOriginImageId: (origin_image_id: string) => void
    setProcessedImageId: (processed_image_id: string) => void
    setImageBase64: (image_base64: string) => void
}

const initialState: EditorState = {
    spec_id: '759',
    spec: null,
    origin_image_id: '',
    processed_image_id: '',
    image_base64: ''
}

const store = create<EditorState & EditorAction>()(
    immer(
        persist(
            (set, _get) => ({
                spec_id: initialState.spec_id,
                spec: initialState.spec,
                origin_image_id: initialState.origin_image_id,
                processed_image_id: initialState.processed_image_id,
                image_base64: initialState.image_base64,
                setSpecId: (spec_id) => set({ spec_id }),
                setSpec: (spec) => set({ spec }),
                setOriginImageId: (origin_image_id) => set({ origin_image_id }),
                setProcessedImageId: (processed_image_id) => set({ processed_image_id }),
                setImageBase64: (image_base64) => set({ image_base64 }),
            }),
            {
                name: StorageSceneKey.EDITOR,
                storage: createJSONStorage(zustandStorage),
            }
        )
    )
)

export const useEditorStore = createSelectors(store)
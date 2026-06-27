import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { v4 as uuidv4 } from 'uuid'
import { getCatalogItem } from '../data/furnitureCatalog'

export interface PlacedFurniture {
  id: string
  type: string
  x: number
  z: number
  rotation: number
}

interface Store {
  furniture: PlacedFurniture[]
  selectedId: string | null
  selectedRoomId: string | null
  placingType: string | null
  viewMode: '3d' | 'top'

  addFurniture: (type: string, x: number, z: number) => void
  removeFurniture: (id: string) => void
  updateFurniture: (id: string, updates: Partial<PlacedFurniture>) => void
  selectFurniture: (id: string | null) => void
  selectRoom: (id: string | null) => void
  setPlacingType: (type: string | null) => void
  setViewMode: (mode: '3d' | 'top') => void
  clearAll: () => void
}

export const useStore = create<Store>()(
  persist(
    (set) => ({
      furniture: [],
      selectedId: null,
      selectedRoomId: null,
      placingType: null,
      viewMode: '3d',

      addFurniture: (type, x, z) => {
        const item = getCatalogItem(type)
        if (!item) return
        const id = uuidv4()
        set((s) => ({
          furniture: [...s.furniture, { id, type, x, z, rotation: 0 }],
          selectedId: id,
          placingType: null,
        }))
      },

      removeFurniture: (id) =>
        set((s) => ({
          furniture: s.furniture.filter((f) => f.id !== id),
          selectedId: s.selectedId === id ? null : s.selectedId,
        })),

      updateFurniture: (id, updates) =>
        set((s) => ({
          furniture: s.furniture.map((f) => (f.id === id ? { ...f, ...updates } : f)),
        })),

      selectFurniture: (id) => set({ selectedId: id, placingType: null }),
      selectRoom: (id) => set({ selectedRoomId: id }),
      setPlacingType: (type) => set({ placingType: type, selectedId: null }),
      setViewMode: (mode) => set({ viewMode: mode }),
      clearAll: () => set({ furniture: [], selectedId: null }),
    }),
    { name: 'house-interior-v1' },
  ),
)

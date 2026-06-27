import { useEffect } from 'react'
import { Header, RoomInfo } from './components/ui/RoomInfo'
import { Sidebar } from './components/ui/Sidebar'
import { Scene3D } from './components/3d/Scene3D'
import { useStore } from './store/useStore'

export default function App() {
  const { placingType, setPlacingType, selectedId, updateFurniture } = useStore()

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setPlacingType(null)
      if (e.key === 'r' || e.key === 'R') {
        if (selectedId) {
          const item = useStore.getState().furniture.find((f) => f.id === selectedId)
          if (item) updateFurniture(selectedId, { rotation: item.rotation + Math.PI / 2 })
        }
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [setPlacingType, selectedId, updateFurniture])

  return (
    <div className="app">
      <Header />
      <div className="workspace">
        <Sidebar />
        <main className="canvas-area">
          {placingType && (
            <div className="placing-banner">
              📍 배치 모드 — 클릭해서 가구 배치 · ESC 취소
            </div>
          )}
          <Scene3D />
        </main>
        <RoomInfo />
      </div>
    </div>
  )
}

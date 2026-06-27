import { furnitureCatalog } from '../../data/furnitureCatalog'
import { useStore } from '../../store/useStore'

export function Sidebar() {
  const { placingType, setPlacingType, selectedId, removeFurniture, furniture, clearAll } =
    useStore()

  return (
    <aside className="sidebar">
      <div className="sidebar-section">
        <h3>가구 추가</h3>
        <p className="sidebar-hint">가구를 선택한 뒤 3D 공간을 클릭하세요</p>
        <div className="catalog-grid">
          {furnitureCatalog.map((item) => (
            <button
              key={item.type}
              type="button"
              className={`catalog-item ${placingType === item.type ? 'active' : ''}`}
              onClick={() => setPlacingType(placingType === item.type ? null : item.type)}
            >
              <span className="catalog-icon">{item.icon}</span>
              <span className="catalog-name">{item.name}</span>
              <span className="catalog-size">
                {item.width}×{item.depth}m
              </span>
            </button>
          ))}
        </div>
      </div>

      {selectedId && (
        <div className="sidebar-section">
          <h3>선택된 가구</h3>
          <button type="button" className="btn-danger" onClick={() => removeFurniture(selectedId)}>
            삭제
          </button>
          <p className="sidebar-hint">드래그로 이동 · R키로 90° 회전</p>
        </div>
      )}

      <div className="sidebar-section sidebar-footer">
        <span className="furniture-count">배치된 가구 {furniture.length}개</span>
        {furniture.length > 0 && (
          <button type="button" className="btn-ghost" onClick={clearAll}>
            전체 초기화
          </button>
        )}
      </div>
    </aside>
  )
}

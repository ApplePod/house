import { houseInfo } from '../data/house'

export function Header() {
  return (
    <header className="header">
      <div className="header-inner">
        <div className="header-badge">2026 집꾸미기 프로젝트</div>
        <h1>{houseInfo.title}</h1>
        <p className="header-address">{houseInfo.address}</p>
        <div className="header-meta">
          <span>{houseInfo.unit}</span>
          <span>{houseInfo.floor}</span>
          <span>축척 {houseInfo.scale}</span>
          <span>{houseInfo.totalSize}</span>
        </div>
      </div>
    </header>
  )
}

import { useState } from 'react'
import { Header } from './components/Header'
import { CompareSlider } from './components/CompareSlider'
import { FloorPlanViewer } from './components/FloorPlanViewer'
import { RoomPanel } from './components/RoomPanel'
import { TabNav, type Tab } from './components/TabNav'
import { dimensions, houseInfo, rooms } from './data/house'

const BASE = import.meta.env.BASE_URL

export default function App() {
  const [tab, setTab] = useState<Tab>('compare')
  const [selectedRoom, setSelectedRoom] = useState<string | null>(null)

  const selected = rooms.find((r) => r.id === selectedRoom) ?? null

  return (
    <div className="app">
      <Header />

      <main className="main">
        <TabNav active={tab} onChange={setTab} />

        {tab === 'compare' && (
          <section className="section">
            <div className="section-intro">
              <h2>평면도 비교</h2>
              <p>
                공식 건축물현황도와 Archisketch 실측 스케치를 슬라이더로 겹쳐
                보며 차이를 확인하세요.
              </p>
            </div>
            <CompareSlider
              beforeLabel="공식 평면도"
              afterLabel="실측 스케치"
              beforeSrc={`${BASE}assets/floor-plan-official.png`}
              afterSrc={`${BASE}assets/floor-plan-sketch.jpg`}
            />
            <div className="dimension-grid">
              {dimensions.map((d) => (
                <div key={d.label} className="dimension-card">
                  <span className="dimension-label">{d.label}</span>
                  <span className="dimension-value">{d.value}</span>
                </div>
              ))}
            </div>
          </section>
        )}

        {tab === 'official' && (
          <section className="section">
            <div className="section-intro">
              <h2>공식 평면도</h2>
              <p>
                {houseInfo.address} · {houseInfo.unit} · {houseInfo.floor} ·
                축척 {houseInfo.scale}
              </p>
            </div>
            <div className="single-plan">
              <img
                src={`${BASE}assets/floor-plan-official.png`}
                alt="공식 건축물현황도 평면도"
              />
            </div>
          </section>
        )}

        {tab === 'sketch' && (
          <section className="section">
            <div className="section-intro">
              <h2>실측 스케치</h2>
              <p>
                Archisketch에서 작성한 실측 평면도. 벽·문·가구 치수와 꾸미기
                메모가 손글씨로 기록되어 있습니다.
              </p>
            </div>
            <div className="single-plan">
              <img
                src={`${BASE}assets/floor-plan-sketch.jpg`}
                alt="Archisketch 실측 스케치"
              />
            </div>
          </section>
        )}

        {tab === 'rooms' && (
          <section className="section rooms-section">
            <div className="section-intro">
              <h2>공간별 보기</h2>
              <p>평면도에서 공간을 클릭하면 실측 메모와 꾸미기 계획을 확인할 수 있습니다.</p>
            </div>
            <div className="rooms-layout">
              <FloorPlanViewer
                rooms={rooms}
                selectedId={selectedRoom}
                onSelect={setSelectedRoom}
                imageSrc={`${BASE}assets/floor-plan-official.png`}
                imageAlt="인터랙티브 평면도"
              />
              <RoomPanel room={selected} />
            </div>
          </section>
        )}
      </main>

      <footer className="footer">
        <p>{houseInfo.title} · {houseInfo.address}</p>
      </footer>
    </div>
  )
}

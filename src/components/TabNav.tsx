type Tab = 'compare' | 'official' | 'sketch' | 'rooms'

interface TabNavProps {
  active: Tab
  onChange: (tab: Tab) => void
}

const tabs: { id: Tab; label: string }[] = [
  { id: 'compare', label: '비교 보기' },
  { id: 'official', label: '공식 평면도' },
  { id: 'sketch', label: '실측 스케치' },
  { id: 'rooms', label: '공간별' },
]

export function TabNav({ active, onChange }: TabNavProps) {
  return (
    <nav className="tab-nav">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          type="button"
          className={`tab-btn ${active === tab.id ? 'active' : ''}`}
          onClick={() => onChange(tab.id)}
        >
          {tab.label}
        </button>
      ))}
    </nav>
  )
}

export type { Tab }

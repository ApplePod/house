export interface FurnitureCatalogItem {
  type: string
  name: string
  icon: string
  width: number
  depth: number
  height: number
  color: string
}

export const furnitureCatalog: FurnitureCatalogItem[] = [
  { type: 'sofa', name: '소파', icon: '🛋️', width: 2.0, depth: 0.9, height: 0.85, color: '#8B7355' },
  { type: 'bed', name: '침대 (더블)', icon: '🛏️', width: 1.5, depth: 2.0, height: 0.5, color: '#D4C4A8' },
  { type: 'desk', name: '책상', icon: '🪑', width: 1.2, depth: 0.6, height: 0.75, color: '#A08252' },
  { type: 'table', name: '식탁', icon: '🍽️', width: 1.4, depth: 0.8, height: 0.75, color: '#C4A882' },
  { type: 'chair', name: '의자', icon: '💺', width: 0.45, depth: 0.45, height: 0.85, color: '#888' },
  { type: 'wardrobe', name: '옷장', icon: '🚪', width: 1.8, depth: 0.6, height: 2.2, color: '#B8956A' },
  { type: 'shelf', name: '선반', icon: '📚', width: 0.8, depth: 0.3, height: 1.8, color: '#9E8B6E' },
  { type: 'tv', name: 'TV장', icon: '📺', width: 1.6, depth: 0.4, height: 0.5, color: '#333' },
  { type: 'plant', name: '화분', icon: '🪴', width: 0.4, depth: 0.4, height: 1.2, color: '#4A7C59' },
  { type: 'rug', name: '러그', icon: '🟫', width: 2.0, depth: 1.5, height: 0.02, color: '#C9A882' },
  { type: 'styler', name: '스타일러', icon: '👔', width: 0.6, depth: 0.55, height: 1.85, color: '#E8E8E8' },
  { type: 'fridge', name: '냉장고', icon: '🧊', width: 0.7, depth: 0.7, height: 1.8, color: '#D0D0D0' },
]

export function getCatalogItem(type: string): FurnitureCatalogItem | undefined {
  return furnitureCatalog.find((f) => f.type === type)
}

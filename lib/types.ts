export type TableShape = "round" | "square" | "rectangle"
export type ElementType = "table" | "dancefloor" | "stage" | "dj" | "entrance" | "buffet" | "bar" | "custom"

export interface Table {
  id: string
  name?: string // Added name field for editable table names
  shape: TableShape
  seats: number
  x: number
  y: number
  width: number
  height: number
  guests: Guest[]
  type: ElementType // Added type to distinguish between tables and other elements
}

export interface Guest {
  id: string
  name: string
  tableId?: string
}

export interface AppState {
  tables: Table[]
  guests: Guest[]
  zoom?: number
  pan?: { x: number; y: number }
  showGrid?: boolean
}

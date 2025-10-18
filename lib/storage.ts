import type { AppState } from "./types"

const STORAGE_KEY = "seatlee-app-state"

export function saveToLocalStorage(state: AppState): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
  } catch (error) {
    console.error("[v0] Failed to save to localStorage:", error)
  }
}

export function loadFromLocalStorage(): AppState | null {
  try {
    const data = localStorage.getItem(STORAGE_KEY)
    if (data) {
      return JSON.parse(data)
    }
  } catch (error) {
    console.error("[v0] Failed to load from localStorage:", error)
  }
  return null
}

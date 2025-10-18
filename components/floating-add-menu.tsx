"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import {
  Plus,
  Circle,
  Square,
  RectangleHorizontal,
  Sparkles,
  Music,
  Radio,
  DoorOpen,
  UtensilsCrossed,
  Wine,
  Box,
} from "lucide-react"
import type { TableShape, ElementType } from "@/lib/types"

interface FloatingAddMenuProps {
  onAddTable: (shape: TableShape, seats: number) => void
  onAddElement: (type: ElementType, customName?: string) => void
}

export function FloatingAddMenu({ onAddTable, onAddElement }: FloatingAddMenuProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [showQuickSeats, setShowQuickSeats] = useState(false)
  const [showCustomInput, setShowCustomInput] = useState(false)
  const [customName, setCustomName] = useState("")

  const quickSeatOptions = [2, 4, 5, 6, 8, 10]

  const handleQuickAdd = (seats: number) => {
    onAddTable("round", seats)
    setShowQuickSeats(false)
    setIsOpen(false)
  }

  const handleCustomAdd = () => {
    if (customName.trim()) {
      onAddElement("custom", customName.trim())
      setCustomName("")
      setShowCustomInput(false)
      setIsOpen(false)
    }
  }

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {isOpen && (
        <Card className="mb-4 animate-in slide-in-from-bottom-4 p-3 shadow-2xl max-h-[80vh] overflow-y-auto">
          <div className="space-y-2">
            <div className="mb-3 font-serif text-sm font-semibold text-foreground">Quick Add</div>

            {showCustomInput ? (
              <div className="space-y-2">
                <Input
                  value={customName}
                  onChange={(e) => setCustomName(e.target.value)}
                  placeholder="Element name"
                  autoFocus
                  onKeyDown={(e) => {
                    if (e.key === "Enter") handleCustomAdd()
                    if (e.key === "Escape") {
                      setShowCustomInput(false)
                      setCustomName("")
                    }
                  }}
                />
                <div className="flex gap-2">
                  <Button variant="default" size="sm" onClick={handleCustomAdd} className="flex-1 cursor-pointer">
                    Add
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      setShowCustomInput(false)
                      setCustomName("")
                    }}
                    className="flex-1 cursor-pointer"
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            ) : showQuickSeats ? (
              <div className="space-y-2">
                <div className="text-xs text-muted-foreground mb-2">Select seats:</div>
                <div className="grid grid-cols-3 gap-2">
                  {quickSeatOptions.map((seats) => (
                    <Button
                      key={seats}
                      variant="outline"
                      size="sm"
                      onClick={() => handleQuickAdd(seats)}
                      className="h-12 w-12 p-0 cursor-pointer"
                    >
                      {seats}
                    </Button>
                  ))}
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowQuickSeats(false)}
                  className="w-full cursor-pointer"
                >
                  Back
                </Button>
              </div>
            ) : (
              <>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowQuickSeats(true)}
                  className="w-full justify-start cursor-pointer"
                >
                  <Circle className="mr-2 h-4 w-4" />
                  Round Table
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    onAddTable("square", 4)
                    setIsOpen(false)
                  }}
                  className="w-full justify-start cursor-pointer"
                >
                  <Square className="mr-2 h-4 w-4" />
                  Square Table
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    onAddTable("rectangle", 6)
                    setIsOpen(false)
                  }}
                  className="w-full justify-start cursor-pointer"
                >
                  <RectangleHorizontal className="mr-2 h-4 w-4" />
                  Rectangle Table
                </Button>
                <div className="my-2 border-t border-border" />
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    onAddElement("dancefloor")
                    setIsOpen(false)
                  }}
                  className="w-full justify-start cursor-pointer"
                >
                  <Sparkles className="mr-2 h-4 w-4" />
                  Dance Floor
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    onAddElement("stage")
                    setIsOpen(false)
                  }}
                  className="w-full justify-start cursor-pointer"
                >
                  <Music className="mr-2 h-4 w-4" />
                  Stage
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    onAddElement("dj")
                    setIsOpen(false)
                  }}
                  className="w-full justify-start cursor-pointer"
                >
                  <Radio className="mr-2 h-4 w-4" />
                  DJ Booth
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    onAddElement("bar")
                    setIsOpen(false)
                  }}
                  className="w-full justify-start cursor-pointer"
                >
                  <Wine className="mr-2 h-4 w-4" />
                  Bar
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    onAddElement("entrance")
                    setIsOpen(false)
                  }}
                  className="w-full justify-start cursor-pointer"
                >
                  <DoorOpen className="mr-2 h-4 w-4" />
                  Entrance
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    onAddElement("buffet")
                    setIsOpen(false)
                  }}
                  className="w-full justify-start cursor-pointer"
                >
                  <UtensilsCrossed className="mr-2 h-4 w-4" />
                  Buffet
                </Button>
                <div className="my-2 border-t border-border" />
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowCustomInput(true)}
                  className="w-full justify-start cursor-pointer"
                >
                  <Box className="mr-2 h-4 w-4" />
                  Custom Element
                </Button>
              </>
            )}
          </div>
        </Card>
      )}

      <Button
        onClick={() => setIsOpen(!isOpen)}
        size="icon"
        className="h-16 w-16 rounded-full shadow-2xl transition-all hover:scale-110 hover:shadow-primary/50 cursor-pointer"
      >
        <Plus className={`h-7 w-7 transition-transform ${isOpen ? "rotate-45" : ""}`} />
      </Button>
    </div>
  )
}

"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import type { TableShape, ElementType } from "@/lib/types"
import { Plus, Square, Circle, RectangleHorizontal, Music, Sparkles, Radio } from "lucide-react"
import { useState } from "react"

interface TableControlsProps {
  onAddTable: (shape: TableShape, seats: number) => void
  onAddElement: (type: ElementType) => void // Added element addition handler
}

export function TableControls({ onAddTable, onAddElement }: TableControlsProps) {
  const [shape, setShape] = useState<TableShape>("round")
  const [seats, setSeats] = useState(6)

  const handleAddTable = () => {
    onAddTable(shape, seats)
  }

  return (
    <div className="space-y-6">
      <Card className="p-4 shadow-sm">
        <h3 className="text-card-foreground mb-3 font-serif text-base font-semibold">Add Table</h3>
        <div className="space-y-3">
          <div>
            <Label htmlFor="shape" className="text-xs font-medium">
              Shape
            </Label>
            <Select value={shape} onValueChange={(value) => setShape(value as TableShape)}>
              <SelectTrigger id="shape" className="mt-1">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="round">
                  <div className="flex items-center gap-2">
                    <Circle className="h-4 w-4" />
                    Round
                  </div>
                </SelectItem>
                <SelectItem value="square">
                  <div className="flex items-center gap-2">
                    <Square className="h-4 w-4" />
                    Square
                  </div>
                </SelectItem>
                <SelectItem value="rectangle">
                  <div className="flex items-center gap-2">
                    <RectangleHorizontal className="h-4 w-4" />
                    Rectangle
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="seats" className="text-xs font-medium">
              Number of Seats
            </Label>
            <Input
              id="seats"
              type="number"
              min={2}
              max={20}
              value={seats}
              onChange={(e) => setSeats(Number.parseInt(e.target.value) || 2)}
              className="mt-1"
            />
          </div>

          <Button onClick={handleAddTable} className="w-full" size="sm">
            <Plus className="mr-2 h-4 w-4" />
            Add Table
          </Button>
        </div>
      </Card>

      <Card className="p-4 shadow-sm">
        <h3 className="text-card-foreground mb-3 font-serif text-base font-semibold">
          Add Elements
        </h3>
        <div className="space-y-2">
          <Button
            onClick={() => onAddElement("dancefloor")}
            variant="outline"
            className="w-full justify-start"
            size="sm"
          >
            <Sparkles className="mr-2 h-4 w-4" />
            Dance Floor
          </Button>
          <Button
            onClick={() => onAddElement("stage")}
            variant="outline"
            className="w-full justify-start"
            size="sm"
          >
            <Music className="mr-2 h-4 w-4" />
            Stage
          </Button>
          <Button
            onClick={() => onAddElement("dj")}
            variant="outline"
            className="w-full justify-start"
            size="sm"
          >
            <Radio className="mr-2 h-4 w-4" />
            DJ Booth
          </Button>
        </div>
      </Card>
    </div>
  )
}

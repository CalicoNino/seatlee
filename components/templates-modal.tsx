"use client"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Card } from "@/components/ui/card"
import { Users, Sparkles } from "lucide-react"
import type { Table, TableShape } from "@/lib/types"

interface Template {
  id: string
  name: string
  description: string
  guestCount: number
  tableCount: number
  preview: () => { tables: Table[] }
}

interface TemplatesModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSelectTemplate: (tables: Table[]) => void
}

const templates: Template[] = [
  {
    id: "small-wedding",
    name: "Small Wedding",
    description: "Perfect for intimate gatherings of 30-50 guests",
    guestCount: 40,
    tableCount: 5,
    preview: () => ({
      tables: [
        createTable("T1", "round", 8, 200, 150),
        createTable("T2", "round", 8, 450, 150),
        createTable("T3", "round", 8, 200, 400),
        createTable("T4", "round", 8, 450, 400),
        createTable("T5", "round", 8, 325, 275),
        createElement("DF1", "Dance Floor", "dancefloor", 325, 550, 200, 200),
        createElement("ST1", "Stage", "stage", 100, 50, 250, 100),
        createElement("BF1", "Buffet", "buffet", 550, 50, 200, 120),
      ],
    }),
  },
  {
    id: "medium-reception",
    name: "Medium Reception",
    description: "Ideal for 80-120 guests with dance floor and buffet",
    guestCount: 100,
    tableCount: 12,
    preview: () => ({
      tables: [
        createTable("T1", "round", 8, 150, 150),
        createTable("T2", "round", 8, 350, 150),
        createTable("T3", "round", 8, 550, 150),
        createTable("T4", "round", 8, 150, 350),
        createTable("T5", "round", 8, 350, 350),
        createTable("T6", "round", 8, 550, 350),
        createTable("T7", "round", 10, 150, 550),
        createTable("T8", "round", 10, 350, 550),
        createTable("T9", "round", 10, 550, 550),
        createTable("T10", "rectangle", 8, 750, 200, 220, 140),
        createTable("T11", "rectangle", 8, 750, 400, 220, 140),
        createTable("T12", "rectangle", 8, 750, 600, 220, 140),
        createElement("DF1", "Dance Floor", "dancefloor", 1050, 300, 250, 250),
        createElement("ST1", "Stage", "stage", 1050, 50, 250, 120),
        createElement("BF1", "Buffet", "buffet", 100, 750, 300, 120),
        createElement("BR1", "Bar", "bar", 500, 750, 180, 100),
        createElement("EN1", "Entrance", "entrance", 900, 750, 180, 100),
      ],
    }),
  },
  {
    id: "large-gala",
    name: "Large Gala",
    description: "Grand event setup for 150-200 guests",
    guestCount: 180,
    tableCount: 20,
    preview: () => ({
      tables: [
        ...Array.from({ length: 20 }, (_, i) => {
          const row = Math.floor(i / 5)
          const col = i % 5
          return createTable(`T${i + 1}`, "round", 10, 150 + col * 250, 150 + row * 250)
        }),
        createElement("DF1", "Dance Floor", "dancefloor", 1400, 400, 300, 300),
        createElement("ST1", "Stage", "stage", 1400, 100, 300, 150),
        createElement("BF1", "Buffet", "buffet", 100, 1200, 400, 120),
        createElement("BR1", "Bar", "bar", 600, 1200, 200, 100),
        createElement("BR2", "Bar 2", "bar", 900, 1200, 200, 100),
        createElement("EN1", "Entrance", "entrance", 1300, 1200, 200, 100),
        createElement("DJ1", "DJ Booth", "dj", 1550, 800, 150, 150),
      ],
    }),
  },
  {
    id: "cocktail-party",
    name: "Cocktail Party",
    description: "Standing reception with high-top tables",
    guestCount: 60,
    tableCount: 8,
    preview: () => ({
      tables: [
        createTable("T1", "round", 4, 200, 200),
        createTable("T2", "round", 4, 450, 200),
        createTable("T3", "round", 4, 700, 200),
        createTable("T4", "round", 4, 200, 450),
        createTable("T5", "round", 4, 450, 450),
        createTable("T6", "round", 4, 700, 450),
        createTable("T7", "round", 4, 325, 650),
        createTable("T8", "round", 4, 575, 650),
        createElement("BR1", "Bar", "bar", 950, 200, 200, 120),
        createElement("BR2", "Bar 2", "bar", 950, 400, 200, 120),
        createElement("BF1", "Buffet", "buffet", 100, 800, 400, 120),
        createElement("DJ1", "DJ Booth", "dj", 950, 650, 150, 150),
      ],
    }),
  },
]

function createTable(
  id: string,
  shape: TableShape,
  seats: number,
  x: number,
  y: number,
  width?: number,
  height?: number,
): Table {
  return {
    id,
    name: id,
    shape,
    seats,
    x,
    y,
    width: width || (shape === "rectangle" ? 220 : 180),
    height: height || (shape === "rectangle" ? 140 : 180),
    guests: [],
    type: "table",
  }
}

function createElement(
  id: string,
  name: string,
  type: "dancefloor" | "stage" | "buffet" | "bar" | "entrance" | "dj",
  x: number,
  y: number,
  width: number,
  height: number,
): Table {
  return {
    id,
    name,
    shape: type === "stage" || type === "buffet" || type === "bar" || type === "entrance" ? "rectangle" : "square",
    seats: 0,
    x,
    y,
    width,
    height,
    guests: [],
    type,
  }
}

export function TemplatesModal({ open, onOpenChange, onSelectTemplate }: TemplatesModalProps) {
  const handleSelectTemplate = (template: Template) => {
    const { tables } = template.preview()
    onSelectTemplate(tables)
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-3xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="font-serif text-2xl flex items-center gap-2">
            <Sparkles className="h-6 w-6 text-primary" />
            Choose a Template
          </DialogTitle>
          <DialogDescription>Start with a pre-designed layout and customize it to your needs</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4 sm:grid-cols-2">
          {templates.map((template) => (
            <Card
              key={template.id}
              className="p-4 cursor-pointer hover:border-primary hover:shadow-lg transition-all duration-200"
              onClick={() => handleSelectTemplate(template)}
            >
              <h3 className="font-serif text-lg font-semibold mb-2">{template.name}</h3>
              <p className="text-sm text-muted-foreground mb-4">{template.description}</p>
              <div className="flex items-center gap-4 text-xs text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Users className="h-3 w-3" />
                  {template.guestCount} guests
                </div>
                <div className="flex items-center gap-1">
                  <span className="font-medium">{template.tableCount}</span> tables
                </div>
              </div>
            </Card>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  )
}

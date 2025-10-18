"use client"

import * as React from "react"
import type { Table, Guest } from "@/lib/types"
import { TableItem } from "./table-item"
import { Card } from "@/components/ui/card"

interface SeatingCanvasProps {
  tables: Table[]
  onUpdateTable: (id: string, updates: Partial<Table>) => void
  onDeleteTable: (id: string) => void
  onDropGuest: (guest: Guest, tableId: string) => void
  onUnassignGuest: (guestId: string, tableId: string) => void
  draggingGuest: Guest | null
  showGrid: boolean
  onOpenGuestList?: () => void
  highlightedTableIds: Set<string>
  zoom: number
  setZoom: (zoom: number) => void
  pan: { x: number; y: number }
  setPan: (pan: { x: number; y: number }) => void
}

export const SeatingCanvas = React.forwardRef<HTMLDivElement, SeatingCanvasProps>(
  (
    {
      tables,
      onUpdateTable,
      // onDeleteTable,
      onDropGuest,
      onUnassignGuest,
      draggingGuest,
      showGrid,
      // onOpenGuestList,
      highlightedTableIds,
      zoom,
      setZoom,
      pan,
      setPan,
    },
    ref,
  ) => {
    const [draggingTableId, setDraggingTableId] = React.useState<string | null>(null)
    const [selectedTableId, setSelectedTableId] = React.useState<string | null>(null)
    const [dragOffset, setDragOffset] = React.useState({ x: 0, y: 0 })
    const [hoveredTableId, setHoveredTableId] = React.useState<string | null>(null)
    const [resizing, setResizing] = React.useState<{
      id: string
      startX: number
      startY: number
      startWidth: number
      startHeight: number
    } | null>(null)

    const [isPanning, setIsPanning] = React.useState(false)
    const [panStart, setPanStart] = React.useState({ x: 0, y: 0 })
    const canvasRef = React.useRef<HTMLDivElement>(null)

    React.useImperativeHandle(ref, () => canvasRef.current!)

    const handleWheel = React.useCallback(
      (e: WheelEvent) => {
        if (e.ctrlKey || e.metaKey) {
          e.preventDefault()
          const delta = -e.deltaY * 0.001
          setZoom(Math.min(Math.max(0.3, zoom + delta), 3))
        }
      },
      [zoom, setZoom],
    )

    React.useEffect(() => {
      const canvas = canvasRef.current
      if (!canvas) return

      canvas.addEventListener("wheel", handleWheel, { passive: false })
      return () => canvas.removeEventListener("wheel", handleWheel)
    }, [handleWheel])

    const handleMouseUp = () => {
      setIsPanning(false)
    }

    const handleResize = (
      e: React.MouseEvent<Element, MouseEvent>,
      tableId: string,
      corner: string,
    ) => {
      const table = tables.find((t) => t.id === tableId)
      if (!table) return

      console.log("corner", corner)

      setResizing({
        id: tableId,
        startX: e.clientX,
        startY: e.clientY,
        startWidth: table.width,
        startHeight: table.height,
      })
    }

    React.useEffect(() => {
      if (!resizing) return

      const handleMouseMove = (e: MouseEvent) => {
        const deltaX = e.clientX - resizing.startX
        const deltaY = e.clientY - resizing.startY

        onUpdateTable(resizing.id, {
          width: Math.max(100, resizing.startWidth + deltaX / zoom),
          height: Math.max(80, resizing.startHeight + deltaY / zoom),
        })
      }

      const handleMouseUp = () => {
        setResizing(null)
      }

      document.addEventListener("mousemove", handleMouseMove)
      document.addEventListener("mouseup", handleMouseUp)

      return () => {
        document.removeEventListener("mousemove", handleMouseMove)
        document.removeEventListener("mouseup", handleMouseUp)
      }
    }, [resizing, onUpdateTable, zoom])

    const handleTableDragStart = (e: React.DragEvent<Element>, table: Table) => {
      setDraggingTableId(table.id)
      const rect = (e.target as HTMLElement).getBoundingClientRect()
      setDragOffset({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      })
    }

    const handleTableDragEnd = () => {
      setDraggingTableId(null)
    }

    const handleTableDragOver = (e: React.DragEvent<Element>, tableId: string) => {
      e.preventDefault()
      e.stopPropagation()
      if (draggingGuest) {
        setHoveredTableId(tableId)
      }
    }

    const handleTableDragLeave = (e: React.DragEvent<Element>, tableId: string) => {
      e.preventDefault()
      e.stopPropagation()
      if (hoveredTableId === tableId) {
        setHoveredTableId(null)
      }
    }

    const handleTableDrop = (e: React.DragEvent<Element>, tableId: string) => {
      e.preventDefault()
      e.stopPropagation()

      if (draggingGuest) {
        const table = tables.find((t) => t.id === tableId)
        if (table && table.type === "table") {
          onDropGuest(draggingGuest, tableId)
        }
      }
      setHoveredTableId(null)
    }

    // const selectedTable = tables.find((t) => t.id === selectedTableId)

    return (
      <Card
        ref={canvasRef}
        className="from-background via-background to-primary/5 relative h-full cursor-grab overflow-hidden bg-gradient-to-br shadow-inner active:cursor-grabbing"
        onDragOver={(e) => {
          e.preventDefault()
          if (draggingGuest) {
            setHoveredTableId(null)
          }
        }}
        onDrop={(e) => {
          e.preventDefault()
          const canvas = e.currentTarget as HTMLElement
          const rect = canvas.getBoundingClientRect()

          if (draggingTableId) {
            const x = (e.clientX - rect.left - pan.x - dragOffset.x) / zoom
            const y = (e.clientY - rect.top - pan.y - dragOffset.y) / zoom
            onUpdateTable(draggingTableId, { x, y })
          }
          setHoveredTableId(null)
        }}
        onMouseDown={(e) => {
          if (e.button === 1 || (e.button === 0 && e.shiftKey)) {
            e.preventDefault()
            setIsPanning(true)
            setPanStart({ x: e.clientX - pan.x, y: e.clientY - pan.y })
          }
        }}
        onMouseMove={(e) => {
          if (isPanning) {
            setPan({
              x: e.clientX - panStart.x,
              y: e.clientY - panStart.y,
            })
          }
        }}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        {showGrid && (
          <div
            className="pointer-events-none absolute inset-0 opacity-20"
            style={{
              backgroundImage: `
                linear-gradient(to right, currentColor 1px, transparent 1px),
                linear-gradient(to bottom, currentColor 1px, transparent 1px)
              `,
              backgroundSize: `${40 * zoom}px ${40 * zoom}px`,
              backgroundPosition: `${pan.x}px ${pan.y}px`,
              color: "var(--color-border)",
            }}
          />
        )}

        <div className="bg-card/90 text-muted-foreground border-border absolute top-4 right-4 z-10 rounded-lg border px-3 py-2 text-xs shadow-lg backdrop-blur-sm">
          Zoom: {Math.round(zoom * 100)}% | Hold Ctrl+Scroll to zoom | Shift+Drag to pan
        </div>

        <div
          className="absolute inset-0"
          style={{
            transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
            transformOrigin: "0 0",
          }}
        >
          {tables.map((table) => {
            const canAcceptGuest = draggingGuest && table.type === "table"
            const isHovered = hoveredTableId === table.id
            const isHighlighted = highlightedTableIds.has(table.id)

            return (
              <TableItem
                key={table.id}
                table={table}
                isDragging={draggingTableId === table.id}
                isSelected={selectedTableId === table.id}
                isHovered={isHovered}
                canAcceptGuest={canAcceptGuest ?? undefined}
                isHighlighted={isHighlighted}
                onDragStart={(e) => handleTableDragStart(e, table)}
                onDragEnd={handleTableDragEnd}
                onDragOver={(e) => handleTableDragOver(e, table.id)}
                onDragLeave={(e) => handleTableDragLeave(e, table.id)}
                onDrop={(e) => handleTableDrop(e, table.id)}
                onClick={() => setSelectedTableId(table.id)}
                onRemoveGuest={(guestId) => onUnassignGuest(guestId, table.id)}
                onUpdateTable={onUpdateTable}
                onResize={(e, corner) => handleResize(e, table.id, corner)}
              />
            )
          })}
        </div>

        {tables.length === 0 && (
          <div className="flex h-full items-center justify-center">
            <p className="text-muted-foreground font-serif text-lg">
              Click the + button to start designing your seating chart
            </p>
          </div>
        )}
      </Card>
    )
  },
)

SeatingCanvas.displayName = "SeatingCanvas"

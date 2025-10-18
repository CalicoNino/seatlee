"use client"

import type React from "react"
import { useState } from "react"
import type { Table } from "@/lib/types"
import { cn } from "@/lib/utils"
import { X, Pencil, Check, AlertTriangle, GripVertical } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

interface TableItemProps {
  table: Table
  isDragging?: boolean
  isSelected?: boolean
  isHovered?: boolean
  canAcceptGuest?: boolean
  isHighlighted?: boolean
  onDragStart?: (e: React.DragEvent) => void
  onDragEnd?: (e: React.DragEvent) => void
  onDragOver?: (e: React.DragEvent) => void
  onDragLeave?: (e: React.DragEvent) => void
  onDrop?: (e: React.DragEvent) => void
  onClick?: () => void
  onRemoveGuest?: (guestId: string) => void
  onUpdateTable?: (id: string, updates: Partial<Table>) => void
  onResize?: (e: React.MouseEvent, corner: string) => void
}

export function TableItem({
  table,
  isDragging,
  isSelected,
  isHovered,
  canAcceptGuest,
  isHighlighted,
  onDragStart,
  onDragEnd,
  onDragOver,
  onDragLeave,
  onDrop,
  onClick,
  onRemoveGuest,
  onUpdateTable,
  onResize,
}: TableItemProps) {
  const [isEditingName, setIsEditingName] = useState(false)
  const [editedName, setEditedName] = useState(table.name || table.id)

  const getTableStyle = () => {
    return {
      left: `${table.x}px`,
      top: `${table.y}px`,
      width: `${table.width}px`,
      height: `${table.height}px`,
    }
  }

  const getShapeClass = () => {
    switch (table.shape) {
      case "round":
        return "rounded-full"
      case "square":
        return "rounded-2xl"
      case "rectangle":
        return "rounded-2xl"
      default:
        return "rounded-2xl"
    }
  }

  const getElementStyle = () => {
    switch (table.type) {
      case "dancefloor":
        return "bg-gradient-to-br from-purple-200 to-pink-200 dark:from-purple-800/40 dark:to-pink-800/40 border-purple-400 dark:border-purple-500"
      case "stage":
        return "bg-gradient-to-br from-amber-200 to-orange-200 dark:from-amber-800/40 dark:to-orange-800/40 border-amber-500 dark:border-amber-500"
      case "dj":
        return "bg-gradient-to-br from-blue-200 to-cyan-200 dark:from-blue-800/40 dark:to-cyan-800/40 border-blue-400 dark:border-blue-500"
      case "entrance":
        return "bg-gradient-to-br from-green-200 to-emerald-200 dark:from-green-800/40 dark:to-emerald-800/40 border-green-500 dark:border-green-500"
      case "buffet":
        return "bg-gradient-to-br from-rose-200 to-red-200 dark:from-rose-800/40 dark:to-red-800/40 border-rose-400 dark:border-rose-500"
      case "bar":
        return "bg-gradient-to-br from-indigo-200 to-violet-200 dark:from-indigo-800/40 dark:to-violet-800/40 border-indigo-400 dark:border-indigo-500"
      case "custom":
        return "bg-gradient-to-br from-slate-200 to-gray-200 dark:from-slate-800/40 dark:to-gray-800/40 border-slate-400 dark:border-slate-500"
      default:
        return "bg-card border-primary shadow-lg"
    }
  }

  const isOverCapacity = table.type === "table" && table.guests.length > table.seats
  const isFull = table.type === "table" && table.guests.length >= table.seats

  const renderSeats = () => {
    if (table.type !== "table" || table.guests.length === 0) return null

    const seatCount = table.guests.length
    const seats = []
    const centerX = table.width / 2
    const centerY = table.height / 2
    const radiusX = table.width / 2 + 24
    const radiusY = table.height / 2 + 24

    for (let i = 0; i < seatCount; i++) {
      const angle = (i / seatCount) * 2 * Math.PI - Math.PI / 2
      const x = centerX + radiusX * Math.cos(angle)
      const y = centerY + radiusY * Math.sin(angle)

      seats.push(
        <div
          key={i}
          className="absolute transition-all duration-300"
          style={{
            left: `${x - 10}px`,
            top: `${y - 10}px`,
            transform: `rotate(${(angle * 180) / Math.PI + 90}deg)`,
          }}
        >
          {/* Chair seat */}
          <div className="relative">
            <div className="h-5 w-5 rounded-md bg-primary border-2 border-primary shadow-md" />
            {/* Chair backrest */}
            <div className="absolute -top-2 left-1/2 h-3 w-4 -translate-x-1/2 rounded-t-md bg-primary/80 border-2 border-primary" />
          </div>
        </div>,
      )
    }

    return seats
  }

  const handleNameSave = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (editedName.trim()) {
      onUpdateTable?.(table.id, { name: editedName.trim() })
    }
    setIsEditingName(false)
  }

  const handleNameCancel = (e: React.MouseEvent) => {
    e.stopPropagation()
    setEditedName(table.name || table.id)
    setIsEditingName(false)
  }

  const canResize = table.type !== "table"

  return (
    <div
      draggable
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
      onDrop={onDrop}
      onClick={onClick}
      style={getTableStyle()}
      className={cn(
        "group absolute cursor-move border-2 transition-all duration-300 hover:shadow-2xl",
        getShapeClass(),
        getElementStyle(),
        isDragging && "opacity-50 scale-95",
        isSelected && "ring-4 ring-accent ring-offset-2 ring-offset-background",
        isHovered && canAcceptGuest && "ring-4 ring-green-500 ring-offset-2 scale-105 animate-pulse",
        isHovered && !canAcceptGuest && table.type === "table" && "ring-4 ring-warning ring-offset-2",
        isOverCapacity && "border-warning shadow-warning/50",
        isHighlighted && "ring-4 ring-blue-500 ring-offset-2 shadow-2xl shadow-blue-500/50 animate-pulse",
      )}
    >
      {renderSeats()}

      {canResize && isSelected && (
        <>
          <div
            className="absolute -right-2 -bottom-2 h-4 w-4 cursor-se-resize rounded-full bg-primary"
            onMouseDown={(e) => {
              e.stopPropagation()
              onResize?.(e, "se")
            }}
          />
          <GripVertical className="absolute right-1 bottom-1 h-3 w-3 text-primary pointer-events-none" />
        </>
      )}

      <div className="flex h-full w-full flex-col items-center justify-center p-4">
        {isEditingName ? (
          <div className="flex items-center gap-1" onClick={(e) => e.stopPropagation()}>
            <Input
              value={editedName}
              onChange={(e) => setEditedName(e.target.value)}
              className="h-7 w-28 text-sm"
              autoFocus
              onKeyDown={(e) => {
                if (e.key === "Enter") handleNameSave(e as any)
                if (e.key === "Escape") {
                  setEditedName(table.name || table.id)
                  setIsEditingName(false)
                }
              }}
            />
            <Button variant="ghost" size="icon" className="h-6 w-6 cursor-pointer" onClick={handleNameSave}>
              <Check className="h-3 w-3 text-green-600" />
            </Button>
          </div>
        ) : (
          <div className="group/name flex items-center gap-1.5">
            <div className="font-serif text-base font-semibold text-card-foreground">{table.name || table.id}</div>
            <button
              onClick={(e) => {
                e.stopPropagation()
                setIsEditingName(true)
              }}
              className="opacity-0 transition-opacity group-hover/name:opacity-100 cursor-pointer"
            >
              <Pencil className="h-3.5 w-3.5 text-muted-foreground hover:text-foreground" />
            </button>
          </div>
        )}

        {table.type === "table" && (
          <>
            <div className="mt-1 text-sm text-muted-foreground">{table.seats} seats</div>
            <div
              className={cn(
                "mt-1 flex items-center gap-1 text-sm font-medium",
                isOverCapacity
                  ? "font-bold text-warning"
                  : isFull
                    ? "text-orange-600 dark:text-orange-400"
                    : "text-muted-foreground",
              )}
            >
              {isOverCapacity && <AlertTriangle className="h-4 w-4" />}
              {table.guests.length}/{table.seats}
            </div>

            {isOverCapacity && <div className="mt-2 text-xs text-warning font-medium">Over capacity!</div>}

            {table.guests.length > 0 && (
              <div className="mt-3 w-full space-y-1.5 overflow-y-auto" style={{ maxHeight: `${table.height - 120}px` }}>
                {table.guests.map((guest) => (
                  <div
                    key={guest.id}
                    className="group/guest flex items-center justify-between gap-2 rounded-lg bg-white/90 dark:bg-black/30 px-3 py-1.5 text-sm shadow-sm transition-all hover:bg-white dark:hover:bg-black/50 hover:shadow-md"
                  >
                    <span className="flex-1 truncate font-medium text-card-foreground">{guest.name}</span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        onRemoveGuest?.(guest.id)
                      }}
                      className="opacity-0 transition-opacity group-hover/guest:opacity-100 cursor-pointer"
                      title="Unassign guest"
                    >
                      <X className="h-3.5 w-3.5 text-muted-foreground hover:text-destructive" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}

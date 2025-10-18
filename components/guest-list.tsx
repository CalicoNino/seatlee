"use client"

import * as React from "react"
import type { Guest } from "@/lib/types"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Trash2,
  Users,
  Pencil,
  Check,
  X,
  Download,
  Upload,
  Save,
  FolderOpen,
  LogIn,
  ChevronLeft,
  ChevronRight,
  Moon,
  Sun,
  Grid3x3,
  Search,
  Sparkles,
  LogOut,
  FileText,
  FileDown,
} from "lucide-react"
import { cn } from "@/lib/utils"
import Link from "next/link"

interface GuestListProps {
  guests: Guest[]
  tables: Array<{ id: string; name: string; guests: Guest[] }>
  onAddGuest: (name: string) => void
  onRemoveGuest: (id: string) => void
  onEditGuest: (id: string, name: string) => void
  onDragStart: (guest: Guest) => void
  onSave: () => void
  onExport: () => void
  onImport: () => void
  onExportPDF: () => void
  onOpenTemplates: () => void
  onOpenLogin: () => void
  onLogout: () => void
  isLoggedIn: boolean
  userEmail?: string
  isDarkMode: boolean
  onToggleDarkMode: () => void
  showGrid: boolean
  onToggleGrid: () => void
  onSearchChange: (query: string) => void
}

export function GuestList({
  guests,
  tables,
  onAddGuest,
  onRemoveGuest,
  onEditGuest,
  onDragStart,
  onSave,
  onExport,
  onImport,
  onExportPDF,
  onOpenTemplates,
  onOpenLogin,
  onLogout,
  isLoggedIn,
  userEmail,
  isDarkMode,
  onToggleDarkMode,
  showGrid,
  onToggleGrid,
  onSearchChange,
}: GuestListProps) {
  const [newGuestName, setNewGuestName] = React.useState("")
  const [editingId, setEditingId] = React.useState<string | null>(null)
  const [editingName, setEditingName] = React.useState("")
  const [isCollapsed, setIsCollapsed] = React.useState(false)
  const [searchQuery, setSearchQuery] = React.useState("")
  const [filter, setFilter] = React.useState<"all" | "assigned" | "unassigned">("all")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (newGuestName.trim()) {
      onAddGuest(newGuestName.trim())
      setNewGuestName("")
    }
  }

  const startEditing = (guest: Guest) => {
    setEditingId(guest.id)
    setEditingName(guest.name)
  }

  const saveEdit = (id: string) => {
    if (editingName.trim()) {
      onEditGuest(id, editingName.trim())
    }
    setEditingId(null)
    setEditingName("")
  }

  const cancelEdit = () => {
    setEditingId(null)
    setEditingName("")
  }

  const handleSearchChange = (value: string) => {
    setSearchQuery(value)
    onSearchChange(value)
  }

  const filteredGuests = React.useMemo(() => {
    let result = guests

    // Apply search filter
    if (searchQuery) {
      result = result.filter((g) => g.name.toLowerCase().includes(searchQuery.toLowerCase()))
    }

    // Apply assignment filter
    if (filter === "assigned") {
      result = result.filter((g) => g.tableId)
    } else if (filter === "unassigned") {
      result = result.filter((g) => !g.tableId)
    }

    return result
  }, [guests, searchQuery, filter])

  const unassignedGuests = filteredGuests.filter((g) => !g.tableId)
  const assignedGuests = filteredGuests.filter((g) => g.tableId)

  const guestsByTable = React.useMemo(() => {
    const grouped = new Map<string, { tableName: string; guests: Guest[] }>()

    assignedGuests.forEach((guest) => {
      if (guest.tableId) {
        const table = tables.find((t) => t.id === guest.tableId)
        if (table) {
          if (!grouped.has(guest.tableId)) {
            grouped.set(guest.tableId, { tableName: table.name, guests: [] })
          }
          grouped.get(guest.tableId)!.guests.push(guest)
        }
      }
    })

    return Array.from(grouped.entries()).map(([tableId, data]) => ({
      tableId,
      tableName: data.tableName,
      guests: data.guests,
    }))
  }, [assignedGuests, tables])

  const renderGuestCard = (guest: Guest, showTable = false) => {
    const isEditing = editingId === guest.id

    return (
      <Card
        key={guest.id}
        draggable={!isEditing}
        onDragStart={() => !isEditing && onDragStart(guest)}
        className={cn(
          "flex items-center justify-between gap-1.5 p-2 shadow-sm transition-all duration-200",
          !isEditing && "cursor-move hover:shadow-md hover:scale-[1.02] hover:border-primary",
        )}
      >
        {isEditing ? (
          <>
            <Input
              value={editingName}
              onChange={(e) => setEditingName(e.target.value)}
              className="h-7 flex-1 text-sm"
              autoFocus
              onKeyDown={(e) => {
                if (e.key === "Enter") saveEdit(guest.id)
                if (e.key === "Escape") cancelEdit()
              }}
            />
            <div className="flex gap-0.5">
              <Button variant="ghost" size="icon" className="h-6 w-6 cursor-pointer" onClick={() => saveEdit(guest.id)}>
                <Check className="h-3 w-3 text-green-600" />
              </Button>
              <Button variant="ghost" size="icon" className="h-6 w-6 cursor-pointer" onClick={cancelEdit}>
                <X className="h-3 w-3 text-red-600" />
              </Button>
            </div>
          </>
        ) : (
          <>
            <div className="flex flex-1 flex-col min-w-0">
              <span className="text-xs font-medium text-card-foreground truncate">{guest.name}</span>
              {showTable && <span className="text-[10px] text-muted-foreground">Table {guest.tableId}</span>}
            </div>
            <div className="flex gap-0.5 flex-shrink-0">
              <Button
                variant="ghost"
                size="icon"
                className="h-6 w-6 cursor-pointer"
                onClick={() => startEditing(guest)}
              >
                <Pencil className="h-3 w-3" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-6 w-6 cursor-pointer"
                onClick={() => onRemoveGuest(guest.id)}
              >
                <Trash2 className="h-3 w-3" />
              </Button>
            </div>
          </>
        )}
      </Card>
    )
  }

  if (isCollapsed) {
    return (
      <div className="relative z-10 w-16 border-r border-border bg-card/95 backdrop-blur-sm shadow-xl flex flex-col items-center py-6 gap-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsCollapsed(false)}
          className="cursor-pointer"
          title="Expand sidebar"
        >
          <ChevronRight className="h-5 w-5" />
        </Button>
        <div className="h-px w-8 bg-border" />
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsCollapsed(false)}
          className="cursor-pointer"
          title="Guests"
        >
          <Users className="h-5 w-5" />
        </Button>
        <Button variant="ghost" size="icon" onClick={onSave} className="cursor-pointer" title="Save">
          <Save className="h-5 w-5" />
        </Button>
        <Button variant="ghost" size="icon" onClick={onExport} className="cursor-pointer" title="Export">
          <Download className="h-5 w-5" />
        </Button>
        <Button variant="ghost" size="icon" onClick={onExportPDF} className="cursor-pointer" title="Export PDF">
          <FileDown className="h-5 w-5" />
        </Button>
        <Button variant="ghost" size="icon" onClick={onImport} className="cursor-pointer" title="Import">
          <Upload className="h-5 w-5" />
        </Button>
        <Button variant="ghost" size="icon" onClick={onOpenTemplates} className="cursor-pointer" title="Templates">
          <Sparkles className="h-5 w-5" />
        </Button>
        <Button variant="ghost" size="icon" onClick={onToggleGrid} className="cursor-pointer" title="Toggle grid">
          <Grid3x3 className="h-5 w-5" />
        </Button>
        <div className="flex-1" />
        {isLoggedIn ? (
          <Button variant="ghost" size="icon" onClick={onLogout} className="cursor-pointer" title="Logout">
            <LogOut className="h-5 w-5" />
          </Button>
        ) : (
          <Button variant="ghost" size="icon" onClick={onOpenLogin} className="cursor-pointer" title="Login">
            <LogIn className="h-5 w-5" />
          </Button>
        )}
        <Button variant="ghost" size="icon" onClick={onToggleDarkMode} className="cursor-pointer" title="Toggle theme">
          {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
        </Button>
      </div>
    )
  }

  return (
    <div className="relative z-10 w-80 md:w-80 sm:w-72 border-r border-border bg-card/95 backdrop-blur-sm shadow-xl">
      <div className="h-full overflow-y-auto p-6">
        <Tabs defaultValue="guests" className="flex h-full flex-col">
          <div className="border-b border-border pb-3">
            <div className="flex items-center justify-between mb-3">
              <h2 className="flex items-center gap-2 font-serif text-2xl font-semibold text-foreground">
                <Users className="h-6 w-6 text-primary" />
                Seatlee
              </h2>
              <div className="flex items-center gap-1">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={onToggleDarkMode}
                  className="h-8 w-8 cursor-pointer"
                  title="Toggle theme"
                >
                  {isDarkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsCollapsed(true)}
                  className="h-8 w-8 cursor-pointer"
                  title="Collapse sidebar"
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="guests" className="text-xs cursor-pointer">
                Guests
              </TabsTrigger>
              <TabsTrigger value="actions" className="text-xs cursor-pointer">
                Actions
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="guests" className="flex-1 overflow-hidden mt-4">
            <div className="flex h-full flex-col gap-4">
              <form onSubmit={handleSubmit} className="flex gap-2">
                <Input
                  value={newGuestName}
                  onChange={(e) => setNewGuestName(e.target.value)}
                  placeholder="Guest name"
                  className="flex-1"
                />
                <Button type="submit" size="sm" className="cursor-pointer">
                  Add
                </Button>
              </form>

              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  value={searchQuery}
                  onChange={(e) => handleSearchChange(e.target.value)}
                  placeholder="Search guests..."
                  className="pl-9"
                />
                {searchQuery && (
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute right-1 top-1/2 -translate-y-1/2 h-6 w-6 cursor-pointer"
                    onClick={() => handleSearchChange("")}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                )}
              </div>

              <div className="flex gap-1">
                <Button
                  variant={filter === "all" ? "default" : "outline"}
                  size="sm"
                  className="flex-1 cursor-pointer text-xs h-8"
                  onClick={() => setFilter("all")}
                >
                  All ({guests.length})
                </Button>
                <Button
                  variant={filter === "assigned" ? "default" : "outline"}
                  size="sm"
                  className="flex-1 cursor-pointer text-xs h-8"
                  onClick={() => setFilter("assigned")}
                >
                  Assigned ({guests.filter((g) => g.tableId).length})
                </Button>
                <Button
                  variant={filter === "unassigned" ? "default" : "outline"}
                  size="sm"
                  className="flex-1 cursor-pointer text-xs h-8"
                  onClick={() => setFilter("unassigned")}
                >
                  Unassigned ({guests.filter((g) => !g.tableId).length})
                </Button>
              </div>

              <div className="flex-1 space-y-4 overflow-y-auto">
                {(filter === "all" || filter === "unassigned") && (
                  <div>
                    <h3 className="mb-2 text-sm font-medium text-muted-foreground">
                      Unassigned ({unassignedGuests.length})
                    </h3>
                    <div className="space-y-2">
                      {unassignedGuests.map((guest) => renderGuestCard(guest))}
                      {unassignedGuests.length === 0 && (
                        <p className="text-center text-xs italic text-muted-foreground py-4">
                          {searchQuery ? "No matching guests" : "No unassigned guests"}
                        </p>
                      )}
                    </div>
                  </div>
                )}

                {(filter === "all" || filter === "assigned") && (
                  <div>
                    <h3 className="mb-2 text-sm font-medium text-muted-foreground">
                      Assigned ({assignedGuests.length})
                    </h3>
                    <div className="space-y-3">
                      {guestsByTable.length === 0 ? (
                        <p className="text-center text-xs italic text-muted-foreground py-4">
                          {searchQuery ? "No matching guests" : "No assigned guests"}
                        </p>
                      ) : (
                        guestsByTable.map(({ tableId, tableName, guests: tableGuests }) => (
                          <div key={tableId} className="space-y-2">
                            <div className="flex items-center gap-2">
                              <div className="h-px flex-1 bg-border" />
                              <span className="text-xs font-medium text-primary">{tableName}</span>
                              <div className="h-px flex-1 bg-border" />
                            </div>
                            <div className="space-y-2">{tableGuests.map((guest) => renderGuestCard(guest))}</div>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="actions" className="mt-4 space-y-3">
            <Button
              variant="outline"
              className="w-full justify-start bg-transparent cursor-pointer"
              onClick={onOpenTemplates}
            >
              <Sparkles className="mr-2 h-4 w-4" />
              Templates
            </Button>
            <Button variant="outline" className="w-full justify-start bg-transparent cursor-pointer" onClick={onSave}>
              <Save className="mr-2 h-4 w-4" />
              Save
            </Button>
            <Button variant="outline" className="w-full justify-start bg-transparent cursor-pointer" onClick={onExport}>
              <Download className="mr-2 h-4 w-4" />
              Export JSON
            </Button>
            <Button
              variant="outline"
              className="w-full justify-start bg-transparent cursor-pointer"
              onClick={onExportPDF}
            >
              <FileDown className="mr-2 h-4 w-4" />
              Export as PDF
            </Button>
            <Button variant="outline" className="w-full justify-start bg-transparent cursor-pointer" onClick={onImport}>
              <Upload className="mr-2 h-4 w-4" />
              Import CSV
            </Button>
            <Button
              variant="outline"
              className="w-full justify-start bg-transparent cursor-pointer"
              onClick={onToggleGrid}
            >
              <Grid3x3 className="mr-2 h-4 w-4" />
              {showGrid ? "Hide Grid" : "Show Grid"}
            </Button>
            <Button variant="outline" className="w-full justify-start bg-transparent cursor-pointer" disabled>
              <FolderOpen className="mr-2 h-4 w-4" />
              Load from Backend
              <span className="ml-auto text-xs text-muted-foreground">Soon</span>
            </Button>

            <div className="pt-3 border-t border-border">
              {isLoggedIn ? (
                <div className="space-y-2">
                  <p className="text-xs text-muted-foreground px-2">Logged in as</p>
                  <p className="text-sm font-medium px-2 truncate">{userEmail}</p>
                  <Button
                    variant="outline"
                    className="w-full justify-start bg-transparent cursor-pointer"
                    onClick={onLogout}
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    Logout
                  </Button>
                </div>
              ) : (
                <Button
                  variant="outline"
                  className="w-full justify-start bg-transparent cursor-pointer"
                  onClick={onOpenLogin}
                >
                  <LogIn className="mr-2 h-4 w-4" />
                  Login
                </Button>
              )}
            </div>

            <div className="pt-3 border-t border-border space-y-2">
              <Link href="/terms" target="_blank">
                <Button variant="ghost" className="w-full justify-start text-xs cursor-pointer h-8">
                  <FileText className="mr-2 h-3 w-3" />
                  Terms of Service
                </Button>
              </Link>
              <Link href="/privacy" target="_blank">
                <Button variant="ghost" className="w-full justify-start text-xs cursor-pointer h-8">
                  <FileText className="mr-2 h-3 w-3" />
                  Privacy Policy
                </Button>
              </Link>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

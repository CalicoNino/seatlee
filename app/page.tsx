"use client"

import { useState, useEffect, useRef } from "react"
import type { Table, Guest, TableShape, ElementType } from "@/lib/types"
import { GuestList } from "@/components/guest-list"
import { SeatingCanvas } from "@/components/seating-canvas"
import { FloatingAddMenu } from "@/components/floating-add-menu"
import { FloralDecoration } from "@/components/floral-decoration"
import { ImportCSVDialog } from "@/components/import-csv-dialog"
import { LoginModal } from "@/components/login-modal"
import { TemplatesModal } from "@/components/templates-modal"
import { saveToLocalStorage, loadFromLocalStorage } from "@/lib/storage"
import { toast } from "sonner"
import { exportSeatingChartToPDF } from "@/lib/pdf-export"

export default function SeatingChartPage() {
  const [tables, setTables] = useState<Table[]>([])
  const [guests, setGuests] = useState<Guest[]>([])
  const [draggingGuest, setDraggingGuest] = useState<Guest | null>(null)
  const [showGrid, setShowGrid] = useState(true)
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [showImportDialog, setShowImportDialog] = useState(false)
  const [showLoginModal, setShowLoginModal] = useState(false)
  const [showTemplatesModal, setShowTemplatesModal] = useState(false)
  const [, setGuestListCollapsed] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [userEmail, setUserEmail] = useState<string>()
  const [zoom, setZoom] = useState(1)
  const [pan, setPan] = useState({ x: 0, y: 0 })
  const canvasRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const savedState = loadFromLocalStorage()
    if (savedState) {
      setTables(savedState.tables)
      setGuests(savedState.guests)
      if (savedState.zoom) setZoom(savedState.zoom)
      if (savedState.pan) setPan(savedState.pan)
      if (savedState.showGrid !== undefined) setShowGrid(savedState.showGrid)
    }

    const darkMode = localStorage.getItem("darkMode") === "true"
    setIsDarkMode(darkMode)
    if (darkMode) {
      document.documentElement.classList.add("dark")
    }

    const savedEmail = localStorage.getItem("userEmail")
    if (savedEmail) {
      setIsLoggedIn(true)
      setUserEmail(savedEmail)
    }
  }, [])

  useEffect(() => {
    if (tables.length > 0 || guests.length > 0) {
      saveToLocalStorage({ tables, guests, zoom, pan, showGrid })
    }
  }, [tables, guests, zoom, pan, showGrid])

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode)
    document.documentElement.classList.toggle("dark")
    localStorage.setItem("darkMode", (!isDarkMode).toString())
  }

  const handleLogin = (provider: string) => {
    const mockEmail = `user@${provider}.com`
    setIsLoggedIn(true)
    setUserEmail(mockEmail)
    localStorage.setItem("userEmail", mockEmail)
    setShowLoginModal(false)
    toast.success(`Logged in with ${provider}!`, {
      description: "Demo mode - no actual authentication",
    })
  }

  const handleLogout = () => {
    setIsLoggedIn(false)
    setUserEmail(undefined)
    localStorage.removeItem("userEmail")
    toast.success("Logged out successfully!")
  }

  const handleSelectTemplate = (templateTables: Table[]) => {
    const assignedGuestsCount = guests.filter((g) => g.tableId).length

    if (assignedGuestsCount > 0) {
      // Unassign all guests
      const unassignedGuests = guests.map((g) => ({ ...g, tableId: undefined }))
      setGuests(unassignedGuests)

      toast.warning("Template loaded", {
        description: `${assignedGuestsCount} guest${assignedGuestsCount > 1 ? "s were" : " was"} unassigned from tables`,
      })
    } else {
      toast.success("Template loaded successfully!")
    }

    setTables(templateTables)
  }

  const getMatchingGuestIds = () => {
    if (!searchQuery) return new Set<string>()
    return new Set(
      guests
        .filter((g) => g.name.toLowerCase().includes(searchQuery.toLowerCase()))
        .map((g) => g.id),
    )
  }

  const getHighlightedTableIds = () => {
    if (!searchQuery) return new Set<string>()
    const matchingGuestIds = getMatchingGuestIds()
    return new Set(
      tables
        .filter((table) => table.guests.some((guest) => matchingGuestIds.has(guest.id)))
        .map((table) => table.id),
    )
  }

  const addTable = (shape: TableShape, seats: number) => {
    const newTable: Table = {
      id: `T${tables.filter((t) => t.type === "table").length + 1}`,
      name: `Table ${tables.filter((t) => t.type === "table").length + 1}`,
      shape,
      seats,
      x: 100 + tables.length * 20,
      y: 100 + tables.length * 20,
      width: shape === "rectangle" ? 220 : 180,
      height: shape === "rectangle" ? 140 : 180,
      guests: [],
      type: "table",
    }
    setTables([...tables, newTable])
    toast.success(`${shape.charAt(0).toUpperCase() + shape.slice(1)} table added`, {
      description: `${seats} seats available`,
    })
  }

  const addElement = (type: ElementType, customName?: string) => {
    let newElement: Table
    const elementCount = tables.filter((t) => t.type === type).length

    switch (type) {
      case "dancefloor":
        newElement = {
          id: `DF${elementCount + 1}`,
          name: "Dance Floor",
          shape: "square",
          seats: 0,
          x: 200,
          y: 200,
          width: 200,
          height: 200,
          guests: [],
          type: "dancefloor",
        }
        break
      case "stage":
        newElement = {
          id: `ST${elementCount + 1}`,
          name: "Stage",
          shape: "rectangle",
          seats: 0,
          x: 250,
          y: 100,
          width: 250,
          height: 120,
          guests: [],
          type: "stage",
        }
        break
      case "dj":
        newElement = {
          id: `DJ${elementCount + 1}`,
          name: "DJ Booth",
          shape: "square",
          seats: 0,
          x: 300,
          y: 150,
          width: 120,
          height: 120,
          guests: [],
          type: "dj",
        }
        break
      case "entrance":
        newElement = {
          id: `EN${elementCount + 1}`,
          name: "Entrance",
          shape: "rectangle",
          seats: 0,
          x: 150,
          y: 50,
          width: 180,
          height: 100,
          guests: [],
          type: "entrance",
        }
        break
      case "buffet":
        newElement = {
          id: `BF${elementCount + 1}`,
          name: "Buffet",
          shape: "rectangle",
          seats: 0,
          x: 350,
          y: 250,
          width: 200,
          height: 120,
          guests: [],
          type: "buffet",
        }
        break
      case "bar":
        newElement = {
          id: `BR${elementCount + 1}`,
          name: customName || "Bar",
          shape: "rectangle",
          seats: 0,
          x: 400,
          y: 200,
          width: 180,
          height: 100,
          guests: [],
          type: "bar",
        }
        break
      case "custom":
        newElement = {
          id: `CU${elementCount + 1}`,
          name: customName || "Custom Element",
          shape: "square",
          seats: 0,
          x: 200,
          y: 300,
          width: 150,
          height: 150,
          guests: [],
          type: "custom",
        }
        break
      default:
        return
    }

    setTables([...tables, newElement])
    toast.success(`${newElement.name} added to canvas`)
  }

  const updateTable = (id: string, updates: Partial<Table>) => {
    setTables(tables.map((table) => (table.id === id ? { ...table, ...updates } : table)))
  }

  const deleteTable = (id: string) => {
    const table = tables.find((t) => t.id === id)
    if (table) {
      const guestsToUnassign = guests.filter((g) => g.tableId === id)
      if (guestsToUnassign.length > 0) {
        setGuests(
          guests.map((guest) => (guest.tableId === id ? { ...guest, tableId: undefined } : guest)),
        )
        toast.info(
          `${guestsToUnassign.length} guest${guestsToUnassign.length > 1 ? "s" : ""} unassigned`,
          {
            description: `${table.name || table.id} was deleted`,
          },
        )
      }
    }
    setTables(tables.filter((table) => table.id !== id))
  }

  const addGuest = (name: string) => {
    const newGuest: Guest = {
      id: `G${guests.length + 1}`,
      name,
    }
    setGuests([...guests, newGuest])
  }

  const editGuest = (id: string, name: string) => {
    setGuests(guests.map((guest) => (guest.id === id ? { ...guest, name } : guest)))
  }

  const removeGuest = (id: string) => {
    const guest = guests.find((g) => g.id === id)
    if (guest?.tableId) {
      setTables(
        tables.map((table) =>
          table.id === guest.tableId
            ? {
                ...table,
                guests: table.guests.filter((g) => g.id !== id),
              }
            : table,
        ),
      )
    }
    setGuests(guests.filter((guest) => guest.id !== id))
  }

  const handleGuestDragStart = (guest: Guest) => {
    setDraggingGuest(guest)
  }

  const handleDropGuest = (guest: Guest, tableId: string) => {
    const targetTable = tables.find((t) => t.id === tableId)
    if (!targetTable || targetTable.type !== "table") return

    const isOverCapacity = targetTable.guests.length >= targetTable.seats

    // Remove from old table if exists
    if (guest.tableId) {
      setTables(
        tables.map((table) =>
          table.id === guest.tableId
            ? {
                ...table,
                guests: table.guests.filter((g) => g.id !== guest.id),
              }
            : table,
        ),
      )
    }

    // Add to new table
    setTables(
      tables.map((table) =>
        table.id === tableId ? { ...table, guests: [...table.guests, guest] } : table,
      ),
    )
    setGuests(guests.map((g) => (g.id === guest.id ? { ...g, tableId } : g)))
    setDraggingGuest(null)

    if (isOverCapacity) {
      toast.warning(`${guest.name} assigned to ${targetTable.name}`, {
        description: `Table is over capacity (${targetTable.guests.length + 1}/${targetTable.seats})`,
      })
    } else {
      toast.success(`${guest.name} assigned to ${targetTable.name}`)
    }
  }

  const handleUnassignGuest = (guestId: string, tableId: string) => {
    const guest = guests.find((g) => g.id === guestId)
    const table = tables.find((t) => t.id === tableId)

    setTables(
      tables.map((table) =>
        table.id === tableId
          ? {
              ...table,
              guests: table.guests.filter((g) => g.id !== guestId),
            }
          : table,
      ),
    )
    setGuests(guests.map((g) => (g.id === guestId ? { ...g, tableId: undefined } : g)))

    if (guest && table) {
      toast.info(`${guest.name} unassigned from ${table.name}`)
    }
  }

  const handleSave = () => {
    saveToLocalStorage({ tables, guests, zoom, pan, showGrid })
    toast.success("Saved successfully!", {
      description: "All changes saved to local storage",
    })
  }

  const handleExport = () => {
    const data = JSON.stringify({ tables, guests }, null, 2)
    const blob = new Blob([data], { type: "application/json" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `seatlee-${new Date().toISOString().split("T")[0]}.json`
    a.click()
    toast.success("Exported successfully!", {
      description: `File: seatlee-${new Date().toISOString().split("T")[0]}.json`,
    })
  }

  const handleImport = () => {
    setShowImportDialog(true)
  }

  const handleCSVImport = (file: File, source: "theknot" | "custom") => {
    const reader = new FileReader()
    reader.onload = (e) => {
      try {
        const text = e.target?.result as string
        const lines = text.split("\n").filter((line) => line.trim())

        if (source === "theknot") {
          const newGuests = lines.slice(1).map((line, index) => {
            const [firstName, lastName] = line.split(",")
            return {
              id: `G${guests.length + index + 1}`,
              name: `${firstName?.trim()} ${lastName?.trim()}`.trim(),
            }
          })
          setGuests([...guests, ...newGuests])
          toast.success(`Imported ${newGuests.length} guests from The Knot`)
        } else {
          const newGuests = lines.slice(1).map((line, index) => ({
            id: `G${guests.length + index + 1}`,
            name: line.trim(),
          }))
          setGuests([...guests, ...newGuests])
          toast.success(`Imported ${newGuests.length} guests successfully`)
        }
      } catch (error) {
        toast.error("Failed to import CSV file", {
          description: "Please check the file format and try again",
        })
        console.error(error)
      }
    }
    reader.readAsText(file)
  }

  const handleExportPDF = async () => {
    if (!canvasRef.current) {
      toast.error("Canvas not ready", {
        description: "Please try again in a moment",
      })
      return
    }

    try {
      toast.info("Generating PDF...", {
        description: "This may take a few seconds",
      })

      const fileName = await exportSeatingChartToPDF(canvasRef.current, tables, guests, zoom, pan)

      toast.success("PDF exported successfully!", {
        description: `File: ${fileName}`,
      })
    } catch (error) {
      toast.error("Failed to export PDF", {
        description: "Please try again or contact support",
      })
      console.error(error)
    }
  }

  return (
    <div className="bg-background relative flex h-screen flex-col md:flex-row">
      <FloralDecoration />

      <GuestList
        guests={guests}
        tables={tables}
        onAddGuest={addGuest}
        onRemoveGuest={removeGuest}
        onEditGuest={editGuest}
        onDragStart={handleGuestDragStart}
        onSave={handleSave}
        onExport={handleExport}
        onExportPDF={handleExportPDF}
        onImport={handleImport}
        onOpenTemplates={() => setShowTemplatesModal(true)}
        onOpenLogin={() => setShowLoginModal(true)}
        onLogout={handleLogout}
        isLoggedIn={isLoggedIn}
        userEmail={userEmail}
        isDarkMode={isDarkMode}
        onToggleDarkMode={toggleDarkMode}
        showGrid={showGrid}
        onToggleGrid={() => setShowGrid(!showGrid)}
        onSearchChange={setSearchQuery}
      />

      <div className="relative z-10 flex flex-1 flex-col p-2 md:p-4">
        <SeatingCanvas
          ref={canvasRef}
          tables={tables}
          onUpdateTable={updateTable}
          onDeleteTable={deleteTable}
          onDropGuest={handleDropGuest}
          onUnassignGuest={handleUnassignGuest}
          draggingGuest={draggingGuest}
          showGrid={showGrid}
          onOpenGuestList={() => setGuestListCollapsed(false)}
          highlightedTableIds={getHighlightedTableIds()}
          zoom={zoom}
          setZoom={setZoom}
          pan={pan}
          setPan={setPan}
        />
      </div>

      <FloatingAddMenu onAddTable={addTable} onAddElement={addElement} />
      <ImportCSVDialog
        open={showImportDialog}
        onOpenChange={setShowImportDialog}
        onImport={handleCSVImport}
      />
      <LoginModal open={showLoginModal} onOpenChange={setShowLoginModal} onLogin={handleLogin} />
      <TemplatesModal
        open={showTemplatesModal}
        onOpenChange={setShowTemplatesModal}
        onSelectTemplate={handleSelectTemplate}
      />
    </div>
  )
}

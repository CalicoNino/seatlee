import html2canvas from "html2canvas"
import jsPDF from "jspdf"
import type { Table, Guest } from "./types"

export async function exportSeatingChartToPDF(
  canvasElement: HTMLElement,
  tables: Table[],
  guests: Guest[],
  zoom: number,
  pan: { x: number; y: number },
) {
  try {
    // Create a temporary container for the export
    const exportContainer = document.createElement("div")
    exportContainer.style.position = "fixed"
    exportContainer.style.left = "-9999px"
    exportContainer.style.top = "0"
    exportContainer.style.width = "1200px"
    exportContainer.style.height = "800px"
    exportContainer.style.background = "white"
    exportContainer.style.padding = "40px"
    document.body.appendChild(exportContainer)

    // Create title
    const title = document.createElement("h1")
    title.textContent = "Seatlee - Seating Chart"
    title.style.fontFamily = "serif"
    title.style.fontSize = "32px"
    title.style.marginBottom = "20px"
    title.style.color = "#333"
    exportContainer.appendChild(title)

    // Clone the canvas
    const canvasClone = canvasElement.cloneNode(true) as HTMLElement
    canvasClone.style.width = "1120px"
    canvasClone.style.height = "600px"
    canvasClone.style.border = "2px solid #ddd"
    canvasClone.style.borderRadius = "8px"
    canvasClone.style.overflow = "hidden"
    canvasClone.style.position = "relative"
    exportContainer.appendChild(canvasClone)

    // Add guest summary
    const summary = document.createElement("div")
    summary.style.marginTop = "20px"
    summary.style.fontSize = "14px"
    summary.style.color = "#666"

    const totalGuests = guests.length
    const assignedGuests = guests.filter((g) => g.tableId).length
    const totalTables = tables.filter((t) => t.type === "table").length

    summary.innerHTML = `
      <div style="display: flex; gap: 30px;">
        <div><strong>Total Guests:</strong> ${totalGuests}</div>
        <div><strong>Assigned:</strong> ${assignedGuests}</div>
        <div><strong>Unassigned:</strong> ${totalGuests - assignedGuests}</div>
        <div><strong>Tables:</strong> ${totalTables}</div>
      </div>
    `
    exportContainer.appendChild(summary)

    // Capture the container as canvas
    const canvas = await html2canvas(exportContainer, {
      scale: 2,
      backgroundColor: "#ffffff",
      logging: false,
    })

    // Remove temporary container
    document.body.removeChild(exportContainer)

    // Create PDF
    const imgData = canvas.toDataURL("image/png")
    const pdf = new jsPDF({
      orientation: "landscape",
      unit: "px",
      format: [canvas.width / 2, canvas.height / 2],
    })

    pdf.addImage(imgData, "PNG", 0, 0, canvas.width / 2, canvas.height / 2)

    // Add a second page with detailed guest list
    pdf.addPage()
    pdf.setFontSize(24)
    pdf.text("Guest List by Table", 40, 40)

    let yPosition = 80
    const lineHeight = 20
    pdf.setFontSize(12)

    // Group guests by table
    const tableGroups = new Map<string, { tableName: string; guests: Guest[] }>()
    guests.forEach((guest) => {
      if (guest.tableId) {
        const table = tables.find((t) => t.id === guest.tableId)
        if (table) {
          if (!tableGroups.has(guest.tableId)) {
            tableGroups.set(guest.tableId, { tableName: table.name, guests: [] })
          }
          tableGroups.get(guest.tableId)!.guests.push(guest)
        }
      }
    })

    // Add assigned guests by table
    tableGroups.forEach(({ tableName, guests: tableGuests }) => {
      if (yPosition > 550) {
        pdf.addPage()
        yPosition = 40
      }

      pdf.setFont("helvetica", "bold")
      pdf.text(tableName, 40, yPosition)
      yPosition += lineHeight

      pdf.setFont("helvetica", "normal")
      tableGuests.forEach((guest, index) => {
        if (yPosition > 550) {
          pdf.addPage()
          yPosition = 40
        }
        pdf.text(`  ${index + 1}. ${guest.name}`, 50, yPosition)
        yPosition += lineHeight
      })

      yPosition += 10
    })

    // Add unassigned guests
    const unassignedGuests = guests.filter((g) => !g.tableId)
    if (unassignedGuests.length > 0) {
      if (yPosition > 550) {
        pdf.addPage()
        yPosition = 40
      }

      pdf.setFont("helvetica", "bold")
      pdf.text("Unassigned Guests", 40, yPosition)
      yPosition += lineHeight

      pdf.setFont("helvetica", "normal")
      unassignedGuests.forEach((guest, index) => {
        if (yPosition > 550) {
          pdf.addPage()
          yPosition = 40
        }
        pdf.text(`  ${index + 1}. ${guest.name}`, 50, yPosition)
        yPosition += lineHeight
      })
    }

    // Save the PDF
    const fileName = `seatlee-seating-chart-${new Date().toISOString().split("T")[0]}.pdf`
    pdf.save(fileName)

    return fileName
  } catch (error) {
    console.error("[v0] PDF export error:", error)
    throw error
  }
}

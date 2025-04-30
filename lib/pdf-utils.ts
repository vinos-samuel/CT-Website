"use client"

import jsPDF from "jspdf"
import autoTable from "jspdf-autotable"

// Professional PDF generation function with improved sources and quick facts
export async function generateCountryPDF(country: any) {
  try {
    // Create new PDF document
    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4",
    })

    // Define colors
    const primaryColor = [0, 51, 102] // Deep blue
    const secondaryColor = [100, 100, 100] // Gray
    const linkColor = [0, 102, 204] // Blue for links

    // Add header with logo
    pdf.setFillColor(primaryColor[0], primaryColor[1], primaryColor[2])
    pdf.rect(0, 0, pdf.internal.pageSize.getWidth(), 25, "F")

    try {
      // Add title
      pdf.setTextColor(255, 255, 255)
      pdf.setFontSize(18)
      pdf.text(String(country.name) + " - Regulations", 14, 15)
    } catch (e) {
      console.error("Error adding title:", e)
    }

    try {
      // Add date and document info
      pdf.setTextColor(secondaryColor[0], secondaryColor[1], secondaryColor[2])
      pdf.setFontSize(10)
      pdf.text("Generated: " + new Date().toLocaleDateString(), 14, 30)
      pdf.text("Last Updated: " + String(country.lastUpdated || "N/A"), 14, 35)
    } catch (e) {
      console.error("Error adding date info:", e)
    }

    try {
      // Add summary section
      pdf.setFontSize(14)
      pdf.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2])
      pdf.text("Summary", 14, 45)

      pdf.setFontSize(10)
      pdf.setTextColor(0, 0, 0)

      // Simplified text handling
      const summary = String(country.summary || "No summary available")
      const summaryLines = pdf.splitTextToSize(summary, 180)
      pdf.text(summaryLines, 14, 50)
    } catch (e) {
      console.error("Error adding summary:", e)
    }

    // Use autoTable for key considerations
    try {
      const considerations = country.keyConsiderations || []
      const tableData = considerations.map((item: any) => [String(item)])

      autoTable(pdf, {
        startY: 70,
        head: [["Key Considerations"]],
        body: tableData,
        headStyles: {
          fillColor: [primaryColor[0], primaryColor[1], primaryColor[2]],
          textColor: [255, 255, 255],
          fontStyle: "bold",
        },
        styles: {
          cellPadding: 4,
          fontSize: 10,
        },
      })
    } catch (e) {
      console.error("Error adding considerations table:", e)
    }

    // Enhanced Quick Facts table with complete information - FIXED VERSION
    try {
      // Determine risk level and color
      let riskLevel = "Medium"
      let riskColor = [255, 153, 0] // Orange for Medium

      if (country.name === "Australia" || country.name === "New Zealand" || country.name === "Singapore") {
        riskLevel = "Low"
        riskColor = [0, 128, 0] // Green for Low
      } else if (country.name === "South Korea" || country.name === "China") {
        riskLevel = "High"
        riskColor = [204, 0, 0] // Red for High
      }

      const contractorViability =
        country.name === "Australia" || country.name === "New Zealand" || country.name === "Singapore"
          ? "High"
          : country.name === "South Korea" || country.name === "China"
            ? "Limited"
            : "Medium"

      const requiredEntity =
        country.name === "Australia" || country.name === "New Zealand" || country.name === "Singapore"
          ? "None for contractors"
          : country.name === "South Korea"
            ? "Local Entity or Licensed Agency"
            : country.name === "China"
              ? "Local Entity or EOR"
              : "Licensed Contractor"

      // Create a separate table just for the risk level with custom styling
      autoTable(pdf, {
        startY: (pdf as any).lastAutoTable.finalY + 10,
        head: [["Quick Facts"]],
        body: [["Risk Level", riskLevel]],
        headStyles: {
          fillColor: [primaryColor[0], primaryColor[1], primaryColor[2]],
          textColor: [255, 255, 255],
          fontStyle: "bold",
        },
        bodyStyles: {
          fillColor: riskColor,
          textColor: [255, 255, 255],
        },
        columnStyles: {
          0: { fontStyle: "bold", cellWidth: 50 },
        },
        styles: {
          cellPadding: 4,
          fontSize: 10,
        },
      })

      // Create the rest of the quick facts table
      autoTable(pdf, {
        startY: (pdf as any).lastAutoTable.finalY,
        body: [
          ["Contractor Viability", contractorViability],
          ["Required Entity", requiredEntity],
          ["Currency", getCurrency(country.name)],
          ["Time Zone", getTimeZone(country.name)],
          ["Official Language", getLanguage(country.name)],
          ["Business Culture", getBusinessCulture(country.name)],
          ["Tax Year", getTaxYear(country.name)],
        ],
        columnStyles: {
          0: { fontStyle: "bold", cellWidth: 50 },
        },
        styles: {
          cellPadding: 4,
          fontSize: 10,
        },
      })
    } catch (e) {
      console.error("Error adding quick facts table:", e)
    }

    // Add a new page for detailed content
    pdf.addPage()

    // Add header to new page
    pdf.setFillColor(primaryColor[0], primaryColor[1], primaryColor[2])
    pdf.rect(0, 0, pdf.internal.pageSize.getWidth(), 15, "F")

    try {
      pdf.setTextColor(255, 255, 255)
      pdf.setFontSize(12)
      pdf.text(String(country.name) + " - Regulations", 14, 10)
    } catch (e) {
      console.error("Error adding page header:", e)
    }

    let currentY = 25

    // Labor Law Framework
    if (country.laborLawFramework) {
      try {
        const description = String(country.laborLawFramework.description || "No description available")

        autoTable(pdf, {
          startY: currentY,
          head: [["Labor Law Framework"]],
          body: [[description]],
          headStyles: {
            fillColor: [primaryColor[0], primaryColor[1], primaryColor[2]],
            textColor: [255, 255, 255],
            fontStyle: "bold",
          },
          styles: {
            cellPadding: 4,
            fontSize: 10,
          },
        })

        currentY = (pdf as any).lastAutoTable.finalY + 5

        // Add sources for Labor Law Framework
        if (
          country.laborLawFramework.sources &&
          Array.isArray(country.laborLawFramework.sources) &&
          country.laborLawFramework.sources.length > 0
        ) {
          // Add sources header
          autoTable(pdf, {
            startY: currentY,
            head: [["Sources"]],
            body: country.laborLawFramework.sources.map((source: any) => [`• ${source.title}\n${source.url || ""}`]),
            headStyles: {
              fillColor: [primaryColor[0], primaryColor[1], primaryColor[2]],
              textColor: [255, 255, 255],
              fontStyle: "bold",
            },
            styles: {
              cellPadding: 4,
              fontSize: 9,
              textColor: [0, 0, 0],
            },
          })

          currentY = (pdf as any).lastAutoTable.finalY + 10
        }
      } catch (e) {
        console.error("Error adding labor law framework:", e)
      }
    }

    // Worker Classification
    if (country.workerClassification) {
      try {
        // Check if we need a new page
        if (currentY > 230) {
          pdf.addPage()
          pdf.setFillColor(primaryColor[0], primaryColor[1], primaryColor[2])
          pdf.rect(0, 0, pdf.internal.pageSize.getWidth(), 15, "F")
          pdf.setTextColor(255, 255, 255)
          pdf.setFontSize(12)
          pdf.text(String(country.name) + " - Regulations", 14, 10)
          currentY = 25
        }

        const description = String(country.workerClassification.description || "No description available")

        autoTable(pdf, {
          startY: currentY,
          head: [["Worker Classification"]],
          body: [[description]],
          headStyles: {
            fillColor: [primaryColor[0], primaryColor[1], primaryColor[2]],
            textColor: [255, 255, 255],
            fontStyle: "bold",
          },
          styles: {
            cellPadding: 4,
            fontSize: 10,
          },
        })

        currentY = (pdf as any).lastAutoTable.finalY + 5

        // Add sources for Worker Classification
        if (
          country.workerClassification.sources &&
          Array.isArray(country.workerClassification.sources) &&
          country.workerClassification.sources.length > 0
        ) {
          // Add sources header
          autoTable(pdf, {
            startY: currentY,
            head: [["Sources"]],
            body: country.workerClassification.sources.map((source: any) => [`• ${source.title}\n${source.url || ""}`]),
            headStyles: {
              fillColor: [primaryColor[0], primaryColor[1], primaryColor[2]],
              textColor: [255, 255, 255],
              fontStyle: "bold",
            },
            styles: {
              cellPadding: 4,
              fontSize: 9,
              textColor: [0, 0, 0],
            },
          })

          currentY = (pdf as any).lastAutoTable.finalY + 10
        }
      } catch (e) {
        console.error("Error adding worker classification:", e)
      }
    }

    // Recent Developments
    if (country.recentDevelopments) {
      try {
        // Check if we need a new page
        if (currentY > 230) {
          pdf.addPage()
          pdf.setFillColor(primaryColor[0], primaryColor[1], primaryColor[2])
          pdf.rect(0, 0, pdf.internal.pageSize.getWidth(), 15, "F")
          pdf.setTextColor(255, 255, 255)
          pdf.setFontSize(12)
          pdf.text(String(country.name) + " - Regulations", 14, 10)
          currentY = 25
        }

        const description = String(country.recentDevelopments.description || "No description available")

        autoTable(pdf, {
          startY: currentY,
          head: [["Recent Developments"]],
          body: [[description]],
          headStyles: {
            fillColor: [primaryColor[0], primaryColor[1], primaryColor[2]],
            textColor: [255, 255, 255],
            fontStyle: "bold",
          },
          styles: {
            cellPadding: 4,
            fontSize: 10,
          },
        })

        currentY = (pdf as any).lastAutoTable.finalY + 5

        // Add sources for Recent Developments
        if (
          country.recentDevelopments.sources &&
          Array.isArray(country.recentDevelopments.sources) &&
          country.recentDevelopments.sources.length > 0
        ) {
          // Add sources header
          autoTable(pdf, {
            startY: currentY,
            head: [["Sources"]],
            body: country.recentDevelopments.sources.map((source: any) => [`• ${source.title}\n${source.url || ""}`]),
            headStyles: {
              fillColor: [primaryColor[0], primaryColor[1], primaryColor[2]],
              textColor: [255, 255, 255],
              fontStyle: "bold",
            },
            styles: {
              cellPadding: 4,
              fontSize: 9,
              textColor: [0, 0, 0],
            },
          })

          currentY = (pdf as any).lastAutoTable.finalY + 10
        }
      } catch (e) {
        console.error("Error adding recent developments:", e)
      }
    }

    // Best Practices
    if (country.bestPractices) {
      try {
        // Check if we need a new page
        if (currentY > 230) {
          pdf.addPage()
          pdf.setFillColor(primaryColor[0], primaryColor[1], primaryColor[2])
          pdf.rect(0, 0, pdf.internal.pageSize.getWidth(), 15, "F")
          pdf.setTextColor(255, 255, 255)
          pdf.setFontSize(12)
          pdf.text(String(country.name) + " - Regulations", 14, 10)
          currentY = 25
        }

        const description = String(country.bestPractices.description || "No description available")

        autoTable(pdf, {
          startY: currentY,
          head: [[`Best Practices for ${country.name}`]],
          body: [[description]],
          headStyles: {
            fillColor: [primaryColor[0], primaryColor[1], primaryColor[2]],
            textColor: [255, 255, 255],
            fontStyle: "bold",
          },
          styles: {
            cellPadding: 4,
            fontSize: 10,
          },
        })

        currentY = (pdf as any).lastAutoTable.finalY + 5

        // Add sources for Best Practices
        if (
          country.bestPractices.sources &&
          Array.isArray(country.bestPractices.sources) &&
          country.bestPractices.sources.length > 0
        ) {
          // Add sources header
          autoTable(pdf, {
            startY: currentY,
            head: [["Sources"]],
            body: country.bestPractices.sources.map((source: any) => [`• ${source.title}\n${source.url || ""}`]),
            headStyles: {
              fillColor: [primaryColor[0], primaryColor[1], primaryColor[2]],
              textColor: [255, 255, 255],
              fontStyle: "bold",
            },
            styles: {
              cellPadding: 4,
              fontSize: 9,
              textColor: [0, 0, 0],
            },
          })

          currentY = (pdf as any).lastAutoTable.finalY + 10
        }
      } catch (e) {
        console.error("Error adding best practices:", e)
      }
    }

    // Monitoring Strategy
    if (country.monitoringStrategy) {
      try {
        // Check if we need a new page
        if (currentY > 230) {
          pdf.addPage()
          pdf.setFillColor(primaryColor[0], primaryColor[1], primaryColor[2])
          pdf.rect(0, 0, pdf.internal.pageSize.getWidth(), 15, "F")
          pdf.setTextColor(255, 255, 255)
          pdf.setFontSize(12)
          pdf.text(String(country.name) + " - Regulations", 14, 10)
          currentY = 25
        }

        const description = String(country.monitoringStrategy.description || "No description available")

        autoTable(pdf, {
          startY: currentY,
          head: [["Monitoring Strategy"]],
          body: [[description]],
          headStyles: {
            fillColor: [primaryColor[0], primaryColor[1], primaryColor[2]],
            textColor: [255, 255, 255],
            fontStyle: "bold",
          },
          styles: {
            cellPadding: 4,
            fontSize: 10,
          },
        })

        currentY = (pdf as any).lastAutoTable.finalY + 5

        // Add sources for Monitoring Strategy
        if (
          country.monitoringStrategy.sources &&
          Array.isArray(country.monitoringStrategy.sources) &&
          country.monitoringStrategy.sources.length > 0
        ) {
          // Add sources header
          autoTable(pdf, {
            startY: currentY,
            head: [["Sources"]],
            body: country.monitoringStrategy.sources.map((source: any) => [`• ${source.title}\n${source.url || ""}`]),
            headStyles: {
              fillColor: [primaryColor[0], primaryColor[1], primaryColor[2]],
              textColor: [255, 255, 255],
              fontStyle: "bold",
            },
            styles: {
              cellPadding: 4,
              fontSize: 9,
              textColor: [0, 0, 0],
            },
          })
        }
      } catch (e) {
        console.error("Error adding monitoring strategy:", e)
      }
    }

    // Add simple footer to all pages
    try {
      const pageCount = pdf.getNumberOfPages()
      for (let i = 1; i <= pageCount; i++) {
        pdf.setPage(i)
        pdf.setFontSize(8)
        pdf.setTextColor(secondaryColor[0], secondaryColor[1], secondaryColor[2])
        pdf.text(
          "Contingent Workforce Management Hub | Page " + i + " of " + pageCount,
          10,
          pdf.internal.pageSize.getHeight() - 10,
        )
      }
    } catch (e) {
      console.error("Error adding footer:", e)
    }

    // Save the PDF with a simple filename
    const filename =
      String(country.name || "country")
        .toLowerCase()
        .replace(/\s+/g, "-") + "-regulations.pdf"
    pdf.save(filename)

    return true
  } catch (error) {
    console.error("Error generating PDF:", error)
    return false
  }
}

// Helper functions for country-specific data
function getCurrency(countryName: string): string {
  const currencies: Record<string, string> = {
    Australia: "Australian Dollar (AUD)",
    China: "Chinese Yuan (CNY)",
    India: "Indian Rupee (INR)",
    Indonesia: "Indonesian Rupiah (IDR)",
    Japan: "Japanese Yen (JPY)",
    "New Zealand": "New Zealand Dollar (NZD)",
    Philippines: "Philippine Peso (PHP)",
    Singapore: "Singapore Dollar (SGD)",
    "South Korea": "Korean Won (KRW)",
    Taiwan: "New Taiwan Dollar (TWD)",
    Thailand: "Thai Baht (THB)",
    Vietnam: "Vietnamese Dong (VND)",
    Malaysia: "Malaysian Ringgit (MYR)",
  }

  return currencies[countryName] || "Not specified"
}

function getTimeZone(countryName: string): string {
  const timeZones: Record<string, string> = {
    Australia: "UTC+8 to UTC+11",
    China: "UTC+8",
    India: "UTC+5:30",
    Indonesia: "UTC+7",
    Japan: "UTC+9",
    "New Zealand": "UTC+12/+13",
    Philippines: "UTC+8",
    Singapore: "UTC+8",
    "South Korea": "UTC+9",
    Taiwan: "UTC+8",
    Thailand: "UTC+7",
    Vietnam: "UTC+7",
    Malaysia: "UTC+8",
  }

  return timeZones[countryName] || "Not specified"
}

function getLanguage(countryName: string): string {
  const languages: Record<string, string> = {
    Australia: "English",
    China: "Mandarin Chinese",
    India: "Hindi, English",
    Indonesia: "Indonesian",
    Japan: "Japanese",
    "New Zealand": "English, Māori",
    Philippines: "Filipino, English",
    Singapore: "English, Mandarin, Malay, Tamil",
    "South Korea": "Korean",
    Taiwan: "Mandarin Chinese",
    Thailand: "Thai",
    Vietnam: "Vietnamese",
    Malaysia: "Malay, English",
  }

  return languages[countryName] || "Not specified"
}

function getBusinessCulture(countryName: string): string {
  const cultures: Record<string, string> = {
    Australia: "Informal, direct communication",
    China: "Hierarchical, relationship-focused",
    India: "Relationship-oriented, hierarchical",
    Indonesia: "Relationship-focused, indirect communication",
    Japan: "Formal, consensus-driven",
    "New Zealand": "Informal, egalitarian",
    Philippines: "Relationship-oriented, indirect communication",
    Singapore: "Efficient, multicultural",
    "South Korea": "Hierarchical, group-oriented",
    Taiwan: "Relationship-focused, indirect communication",
    Thailand: "Hierarchical, conflict-avoidant",
    Vietnam: "Relationship-focused, hierarchical",
    Malaysia: "Relationship-oriented, multicultural",
  }

  return cultures[countryName] || "Not specified"
}

function getTaxYear(countryName: string): string {
  const taxYears: Record<string, string> = {
    Australia: "July 1 - June 30",
    China: "January 1 - December 31",
    India: "April 1 - March 31",
    Indonesia: "January 1 - December 31",
    Japan: "January 1 - December 31",
    "New Zealand": "April 1 - March 31",
    Philippines: "January 1 - December 31",
    Singapore: "April 1 - March 31",
    "South Korea": "January 1 - December 31",
    Taiwan: "January 1 - December 31",
    Thailand: "October 1 - September 30",
    Vietnam: "January 1 - December 31",
    Malaysia: "January 1 - December 31",
  }

  return taxYears[countryName] || "Not specified"
}

"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"

interface RichTextEditorProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
}

export function RichTextEditor({ value, onChange, placeholder }: RichTextEditorProps) {
  const editorRef = useRef<HTMLDivElement>(null)
  const [isEditing, setIsEditing] = useState(false)

  useEffect(() => {
    // Set initial content if value changes from outside
    if (editorRef.current && editorRef.current.innerHTML !== value) {
      editorRef.current.innerHTML = value
    }
  }, [value])

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault()

    // Get the pasted content with formatting
    const clipboardData = e.clipboardData
    const pastedData = clipboardData.getData("text/html") || clipboardData.getData("text/plain")

    // Insert the content while preserving formatting
    if (editorRef.current) {
      const selection = window.getSelection()
      if (selection && selection.rangeCount > 0) {
        const range = selection.getRangeAt(0)
        range.deleteContents()

        const div = document.createElement("div")
        div.innerHTML = pastedData
        const fragment = document.createDocumentFragment()
        let node
        while ((node = div.firstChild)) {
          fragment.appendChild(node)
        }
        range.insertNode(fragment)

        // Move cursor to end of pasted content
        range.collapse(false)
        selection.removeAllRanges()
        selection.addRange(range)
      }
      updateContent()
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    // Prevent page scroll when pressing Enter
    if (e.key === "Enter") {
      e.stopPropagation()

      // Handle Enter key manually for better control
      if (!e.shiftKey) {
        e.preventDefault()
        document.execCommand("insertHTML", false, "<br><br>")
        updateContent()
      }
    }
  }

  const updateContent = () => {
    if (editorRef.current) {
      onChange(editorRef.current.innerHTML)
    }
  }

  const formatText = (command: string, value?: string) => {
    // Ensure the editor is focused before executing command
    if (editorRef.current) {
      editorRef.current.focus()

      // Execute the formatting command
      const success = document.execCommand(command, false, value)

      if (success) {
        updateContent()
      }

      // Keep focus on editor
      editorRef.current.focus()
    }
  }

  const handleFontSizeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const size = e.target.value
    if (size && editorRef.current) {
      editorRef.current.focus()

      // Use execCommand with fontSize values (1-7 scale)
      let fontSizeValue = "3" // default medium
      switch (size) {
        case "12px":
          fontSizeValue = "1"
          break
        case "14px":
          fontSizeValue = "2"
          break
        case "16px":
          fontSizeValue = "3"
          break
        case "18px":
          fontSizeValue = "4"
          break
        case "20px":
          fontSizeValue = "5"
          break
        case "24px":
          fontSizeValue = "6"
          break
        case "28px":
          fontSizeValue = "7"
          break
        case "32px":
          fontSizeValue = "7"
          break
      }

      document.execCommand("fontSize", false, fontSizeValue)

      // Then replace the font tags with spans with actual pixel sizes
      setTimeout(() => {
        if (editorRef.current) {
          const fontTags = editorRef.current.querySelectorAll("font[size]")
          fontTags.forEach((fontTag) => {
            const span = document.createElement("span")
            span.style.fontSize = size
            span.innerHTML = fontTag.innerHTML
            fontTag.parentNode?.replaceChild(span, fontTag)
          })
          updateContent()
        }
      }, 10)

      editorRef.current.focus()
    }
    e.target.value = "" // Reset select
  }

  const handleFontFamilyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const font = e.target.value
    if (font && editorRef.current) {
      editorRef.current.focus()

      // Use execCommand with fontName
      document.execCommand("fontName", false, font)
      updateContent()

      editorRef.current.focus()
    }
    e.target.value = "" // Reset select
  }

  const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    formatText("foreColor", e.target.value)
  }

  const handleHighlightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    formatText("hiliteColor", e.target.value)
  }

  return (
    <div style={{ border: "1px solid #ddd", borderRadius: "4px", overflow: "hidden" }}>
      {/* Toolbar */}
      <div
        style={{
          padding: "0.75rem",
          backgroundColor: "#f8f9fa",
          borderBottom: "1px solid #ddd",
          display: "flex",
          gap: "0.5rem",
          flexWrap: "wrap",
          alignItems: "center",
        }}
      >
        {/* Text Formatting */}
        <div style={{ display: "flex", gap: "0.25rem", marginRight: "1rem" }}>
          <button
            type="button"
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => formatText("bold")}
            style={{
              padding: "0.5rem 0.75rem",
              border: "1px solid #ccc",
              backgroundColor: "white",
              borderRadius: "4px",
              cursor: "pointer",
              fontWeight: "bold",
              fontSize: "0.875rem",
            }}
            title="Bold"
          >
            B
          </button>
          <button
            type="button"
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => formatText("italic")}
            style={{
              padding: "0.5rem 0.75rem",
              border: "1px solid #ccc",
              backgroundColor: "white",
              borderRadius: "4px",
              cursor: "pointer",
              fontStyle: "italic",
              fontSize: "0.875rem",
            }}
            title="Italic"
          >
            I
          </button>
          <button
            type="button"
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => formatText("underline")}
            style={{
              padding: "0.5rem 0.75rem",
              border: "1px solid #ccc",
              backgroundColor: "white",
              borderRadius: "4px",
              cursor: "pointer",
              textDecoration: "underline",
              fontSize: "0.875rem",
            }}
            title="Underline"
          >
            U
          </button>
        </div>

        {/* Font Family */}
        <select
          onMouseDown={(e) => e.preventDefault()}
          onChange={handleFontFamilyChange}
          style={{
            padding: "0.5rem",
            border: "1px solid #ccc",
            borderRadius: "4px",
            fontSize: "0.875rem",
            marginRight: "0.5rem",
          }}
          title="Font Family"
        >
          <option value="">Font Family</option>
          <option value="Arial, sans-serif">Arial</option>
          <option value="Helvetica, sans-serif">Helvetica</option>
          <option value="Times New Roman, serif">Times New Roman</option>
          <option value="Georgia, serif">Georgia</option>
          <option value="Verdana, sans-serif">Verdana</option>
          <option value="Courier New, monospace">Courier New</option>
        </select>

        {/* Font Size */}
        <select
          onMouseDown={(e) => e.preventDefault()}
          onChange={handleFontSizeChange}
          style={{
            padding: "0.5rem",
            border: "1px solid #ccc",
            borderRadius: "4px",
            fontSize: "0.875rem",
            marginRight: "0.5rem",
          }}
          title="Font Size"
        >
          <option value="">Font Size</option>
          <option value="12px">12px</option>
          <option value="14px">14px</option>
          <option value="16px">16px (Normal)</option>
          <option value="18px">18px</option>
          <option value="20px">20px</option>
          <option value="24px">24px</option>
          <option value="28px">28px</option>
          <option value="32px">32px</option>
        </select>

        {/* Lists */}
        <div style={{ display: "flex", gap: "0.25rem", marginRight: "1rem" }}>
          <button
            type="button"
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => formatText("insertUnorderedList")}
            style={{
              padding: "0.5rem 0.75rem",
              border: "1px solid #ccc",
              backgroundColor: "white",
              borderRadius: "4px",
              cursor: "pointer",
              fontSize: "0.875rem",
            }}
            title="Bullet List"
          >
            • List
          </button>
          <button
            type="button"
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => formatText("insertOrderedList")}
            style={{
              padding: "0.5rem 0.75rem",
              border: "1px solid #ccc",
              backgroundColor: "white",
              borderRadius: "4px",
              cursor: "pointer",
              fontSize: "0.875rem",
            }}
            title="Numbered List"
          >
            1. List
          </button>
        </div>

        {/* Text Color */}
        <div style={{ display: "flex", alignItems: "center", gap: "0.25rem", marginRight: "0.5rem" }}>
          <label style={{ fontSize: "0.875rem", color: "#666" }}>Color:</label>
          <input
            type="color"
            onMouseDown={(e) => e.preventDefault()}
            onChange={handleColorChange}
            style={{
              width: "30px",
              height: "30px",
              border: "1px solid #ccc",
              borderRadius: "4px",
              cursor: "pointer",
            }}
            title="Text Color"
          />
        </div>

        {/* Highlight Color */}
        <div style={{ display: "flex", alignItems: "center", gap: "0.25rem" }}>
          <label style={{ fontSize: "0.875rem", color: "#666" }}>Highlight:</label>
          <input
            type="color"
            onMouseDown={(e) => e.preventDefault()}
            onChange={handleHighlightChange}
            defaultValue="#ffff00"
            style={{
              width: "30px",
              height: "30px",
              border: "1px solid #ccc",
              borderRadius: "4px",
              cursor: "pointer",
            }}
            title="Highlight Color"
          />
        </div>
      </div>

      {/* Editor */}
      <div
        ref={editorRef}
        contentEditable
        onInput={updateContent}
        onPaste={handlePaste}
        onKeyDown={handleKeyDown}
        onFocus={() => setIsEditing(true)}
        onBlur={() => setIsEditing(false)}
        style={{
          minHeight: "400px",
          padding: "1rem",
          outline: "none",
          lineHeight: "1.6",
          fontSize: "1rem",
          backgroundColor: "white",
          overflow: "auto",
        }}
        data-placeholder={placeholder}
      />

      <style jsx>{`
        [contenteditable]:empty:before {
          content: attr(data-placeholder);
          color: #999;
          font-style: italic;
        }
        [contenteditable] h2 {
          font-size: 1.5em;
          font-weight: bold;
          margin: 0.5em 0;
        }
        [contenteditable] h3 {
          font-size: 1.25em;
          font-weight: bold;
          margin: 0.5em 0;
        }
        [contenteditable] ul, [contenteditable] ol {
          margin: 0.5em 0;
          padding-left: 2em;
        }
        [contenteditable] li {
          margin: 0.25em 0;
        }
      `}</style>
    </div>
  )
}

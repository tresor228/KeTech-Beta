"use client"

import { FileCode, Folder } from "lucide-react"

interface FileExplorerProps {
  selectedFile: string
  onSelectFile: (file: string) => void
}

const FILES = [
  { name: "index.js", type: "file" },
  { name: "utils.js", type: "file" },
  { name: "test.js", type: "file" },
  { name: "README.md", type: "file" },
]

export function FileExplorer({ selectedFile, onSelectFile }: FileExplorerProps) {
  return (
    <div className="w-64 border-r border-border bg-card overflow-y-auto">
      {/* Header */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center gap-2">
          <Folder className="size-5 text-primary" />
          <span className="font-semibold">Files</span>
        </div>
      </div>

      {/* File List */}
      <div className="p-2">
        {FILES.map((file) => (
          <button
            key={file.name}
            onClick={() => onSelectFile(file.name)}
            className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors ${
              selectedFile === file.name ? "bg-primary/10 text-primary font-medium" : "hover:bg-muted"
            }`}
          >
            <FileCode className="size-4" />
            <span>{file.name}</span>
          </button>
        ))}
      </div>
    </div>
  )
}

"use client"

import { FileCode, Folder, Plus, Trash2 } from "lucide-react"

interface FileExplorerProps {
  files: string[]
  selectedFile: string
  onSelectFile: (file: string) => void
  onAddFile?: (fileName: string) => void
  onDeleteFile?: (fileName: string) => void
}

export function FileExplorer({ files, selectedFile, onSelectFile, onAddFile, onDeleteFile }: FileExplorerProps) {
  return (
    <div className="w-full h-full bg-[#18181A] text-zinc-300 overflow-y-auto flex flex-col">
      {/* Header */}
      <div className="p-3 border-b border-border/50 flex items-center justify-between text-xs tracking-wider uppercase font-semibold text-zinc-400">
        <div className="flex items-center gap-2">
          <Folder className="size-4 text-blue-400" />
          <span>Explorer</span>
        </div>
        {onAddFile && (
          <button
            onClick={() => {
              const name = prompt("Enter file name:");
              if (name) onAddFile(name);
            }}
            className="p-1 hover:bg-white/10 rounded transition-colors"
            title="New File"
          >
            <Plus className="size-4" />
          </button>
        )}
      </div>

      {/* File List */}
      <div className="py-2 flex-1 flex flex-col gap-0.5">
        {files.map((file) => (
          <div key={file} className={`group flex items-center justify-between px-3 py-1.5 text-sm cursor-pointer transition-colors ${selectedFile === file ? "bg-[#37373D] text-white" : "hover:bg-[#2A2D2E]"}`}>
            <button
              onClick={() => onSelectFile(file)}
              className="flex items-center gap-2 flex-1 text-left"
            >
              <FileCode className="size-4 text-amber-400" />
              <span className="truncate">{file}</span>
            </button>
            {onDeleteFile && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onDeleteFile(file);
                }}
                className="opacity-0 group-hover:opacity-100 p-1 hover:bg-red-500/20 rounded text-red-400"
                title="Delete File"
              >
                <Trash2 className="size-3.5" />
              </button>
            )}
          </div>
        ))}
        {files.length === 0 && (
          <div className="text-center text-zinc-500 text-xs mt-4">No files open in directory</div>
        )}
      </div>
    </div>
  )
}

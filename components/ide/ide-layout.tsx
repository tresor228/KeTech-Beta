"use client"

import { useState } from "react"
import { IDEHeader } from "./ide-header"
import { FileExplorer } from "./file-explorer"
import { CodeEditor } from "./code-editor"
import { Terminal } from "./terminal"
import { SubmitDialog } from "./submit-dialog"

interface IDELayoutProps {
  testId: string
  timeRemaining: number
}

export function IDELayout({ testId, timeRemaining }: IDELayoutProps) {
  const [files, setFiles] = useState<Record<string, string>>({
    "main.ts": "",
  })
  const [selectedFile, setSelectedFile] = useState("main.ts")
  const [showSubmitDialog, setShowSubmitDialog] = useState(false)

  const fileNames = Object.keys(files)

  const handleEditorChange = (value: string) => {
    setFiles(prev => ({ ...prev, [selectedFile]: value }))
  }

  const handleAddFile = (name: string) => {
    if (!files[name]) {
      setFiles(prev => ({ ...prev, [name]: "" }))
      setSelectedFile(name)
    }
  }

  const handleDeleteFile = (name: string) => {
    const newFiles = { ...files }
    delete newFiles[name]
    setFiles(newFiles)
    if (selectedFile === name) {
      setSelectedFile(Object.keys(newFiles)[0] || "")
    }
  }

  return (
    <div className="h-screen flex flex-col bg-background">
      {/* Header with Timer */}
      <IDEHeader timeRemaining={timeRemaining} onSubmit={() => setShowSubmitDialog(true)} />

      {/* Main IDE Area */}
      <div className="flex-1 flex overflow-hidden">
        {/* File Explorer */}
        <FileExplorer
          files={fileNames}
          selectedFile={selectedFile}
          onSelectFile={setSelectedFile}
          onAddFile={handleAddFile}
          onDeleteFile={handleDeleteFile}
        />

        {/* Code Editor & Terminal */}
        <div className="flex-1 flex flex-col">
          {/* Code Editor */}
          <div className="flex-1 overflow-hidden">
            <CodeEditor
              fileName={selectedFile}
              value={files[selectedFile] || ""}
              onChange={handleEditorChange}
            />
          </div>

          {/* Terminal */}
          <div className="h-48 border-t border-border">
            <Terminal />
          </div>
        </div>
      </div>

      {/* Submit Dialog */}
      <SubmitDialog open={showSubmitDialog} onOpenChange={setShowSubmitDialog} testId={testId} />
    </div>
  )
}

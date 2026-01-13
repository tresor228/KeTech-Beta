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
  const [selectedFile, setSelectedFile] = useState("index.js")
  const [showSubmitDialog, setShowSubmitDialog] = useState(false)

  return (
    <div className="h-screen flex flex-col bg-background">
      {/* Header with Timer */}
      <IDEHeader timeRemaining={timeRemaining} onSubmit={() => setShowSubmitDialog(true)} />

      {/* Main IDE Area */}
      <div className="flex-1 flex overflow-hidden">
        {/* File Explorer */}
        <FileExplorer selectedFile={selectedFile} onSelectFile={setSelectedFile} />

        {/* Code Editor & Terminal */}
        <div className="flex-1 flex flex-col">
          {/* Code Editor */}
          <div className="flex-1 overflow-hidden">
            <CodeEditor fileName={selectedFile} />
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

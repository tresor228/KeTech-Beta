"use client"

interface CodeEditorProps {
  fileName: string
}

export function CodeEditor({ fileName }: CodeEditorProps) {
  return (
    <div className="h-full flex flex-col bg-muted/30">
      {/* File Tab */}
      <div className="flex items-center gap-2 px-4 py-2 border-b border-border bg-card">
        <span className="text-sm font-medium">{fileName}</span>
      </div>

      {/* Editor Area - Monaco Placeholder */}
      <div className="flex-1 relative">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center space-y-2">
            <div className="size-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
              <svg className="size-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
                />
              </svg>
            </div>
            <p className="text-sm font-medium">Monaco Editor Placeholder</p>
            <p className="text-xs text-muted-foreground">Code editor interface will be rendered here</p>
          </div>
        </div>
      </div>
    </div>
  )
}

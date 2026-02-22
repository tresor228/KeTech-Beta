"use client"

import { useState, useEffect } from "react"
import Editor from "@monaco-editor/react"
import { useTheme } from "next-themes"

interface CodeEditorProps {
  fileName: string
  value: string
  onChange: (value: string) => void
}

const getLanguage = (fileName: string) => {
  const extension = fileName.split('.').pop()
  switch (extension) {
    case 'js':
    case 'jsx':
      return 'javascript'
    case 'ts':
    case 'tsx':
      return 'typescript'
    case 'json':
      return 'json'
    case 'css':
      return 'css'
    case 'html':
      return 'html'
    case 'md':
      return 'markdown'
    default:
      return 'plaintext'
  }
}

export function CodeEditor({ fileName, value, onChange }: CodeEditorProps) {
  const { theme, systemTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const currentTheme = theme === 'system' ? systemTheme : theme
  const editorTheme = currentTheme === 'light' ? 'light' : 'vs-dark'

  return (
    <div className="h-full w-full flex flex-col bg-[#1e1e1e]">
      {/* Editor Area */}
      <div className="flex-1 relative w-full h-full">
        {mounted && (
          <Editor
            height="100%"
            width="100%"
            language={getLanguage(fileName)}
            value={value}
            onChange={(val: string | undefined) => onChange(val || "")}
            theme={editorTheme}
            options={{
              minimap: { enabled: false },
              fontSize: 14,
              fontFamily: 'Consolas, "Courier New", monospace',
              scrollBeyondLastLine: false,
              automaticLayout: true,
              padding: { top: 16 },
              wordWrap: "on",
              tabSize: 2,
              lineHeight: 24,
            }}
            loading={
              <div className="absolute inset-0 flex items-center justify-center bg-[#1e1e1e]">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500"></div>
              </div>
            }
          />
        )}
      </div>
    </div>
  )
}

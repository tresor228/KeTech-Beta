"use client"

import { useState } from "react"
import { ProjectIDEHeader } from "./project-ide-header"
import { FileExplorer } from "./file-explorer"
import { CodeEditor } from "./code-editor"
import { Terminal } from "./terminal"
import { useToast } from "@/hooks/use-toast"

type KYCStatus = "not_verified" | "in_review" | "verified"

interface ProjectIDELayoutProps {
  projectId: string
}

export function ProjectIDELayout({ projectId }: ProjectIDELayoutProps) {
  // Mock KYC status - En production, cela viendrait d'un contexte utilisateur ou d'une API
  const kycStatus: KYCStatus = "verified"
  
  const [selectedFile, setSelectedFile] = useState("index.js")
  const { toast } = useToast()

  const handleSave = () => {
    // Mock save functionality
    toast({
      title: "Projet sauvegardé",
      description: "Votre progression a été sauvegardée avec succès.",
    })
  }

  const handleDownload = () => {
    // Mock download functionality
    toast({
      title: "Téléchargement",
      description: "Votre projet sera téléchargé sous peu.",
    })
  }

  return (
    <div className="h-screen flex flex-col bg-background">
      {/* Header */}
      <ProjectIDEHeader onSave={handleSave} onDownload={handleDownload} kycStatus={kycStatus} />

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
    </div>
  )
}


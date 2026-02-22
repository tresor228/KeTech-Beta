"use client"

import { useState } from "react"
import { CodeEditor } from "./code-editor"
import { Terminal } from "./terminal"
import { useToast } from "@/hooks/use-toast"
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from "@/components/ui/resizable"
import { Bot, Code2, Layout, MonitorPlay, Send, TerminalSquare } from "lucide-react"

type KYCStatus = "not_verified" | "in_review" | "verified"

interface ProjectIDELayoutProps {
  projectId: string
}

export function ProjectIDELayout({ projectId }: ProjectIDELayoutProps) {
  // Mock KYC status
  const kycStatus: KYCStatus = "verified"

  const [files, setFiles] = useState<Record<string, string>>({
    "main.ts": "// Écrivez votre code ici...\nconsole.log('Hello KeTech!');",
  })
  const [selectedFile, setSelectedFile] = useState("main.ts")
  const { toast } = useToast()

  const [activeTab, setActiveTab] = useState<"code" | "preview" | "terminal">("code")
  const [chatInput, setChatInput] = useState("")

  const handleEditorChange = (value: string) => {
    setFiles(prev => ({ ...prev, [selectedFile]: value }))
  }

  const handleSave = () => {
    toast({ title: "Projet sauvegardé", description: "Votre progression a été sauvegardée." })
  }

  const handleSubmit = () => {
    toast({ title: "Soumission réussie", description: "Notre IA analysera votre code." })
  }

  return (
    <div className="h-screen flex flex-col bg-[#0A0A0A] text-zinc-300 font-sans overflow-hidden">
      {/* Navbar minimalist like V0 */}
      <div className="h-14 shrink-0 border-b border-[#222222] flex items-center justify-between px-4">
        <div className="flex items-center gap-3">
          <div className="text-white font-semibold text-lg flex items-center gap-2">
            <div className="w-8 h-8 bg-white text-black rounded-full flex items-center justify-center font-bold text-sm">
              K
            </div>
            KeTech Studio
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={handleSave} className="text-sm font-medium px-4 py-2 hover:bg-[#222] rounded-md transition-colors text-zinc-300">
            Save
          </button>
          <button onClick={handleSubmit} className="text-sm font-medium px-4 py-2 bg-white text-black hover:bg-zinc-200 rounded-md transition-colors shadow-sm">
            Submit
          </button>
        </div>
      </div>

      {/* Main IDE Area */}
      <div className="flex-1 flex overflow-hidden p-2 gap-2">
        <ResizablePanelGroup direction="horizontal" className="h-full w-full">

          {/* Left Panel: AI Chat (v0 style) */}
          <ResizablePanel defaultSize={25} minSize={20} maxSize={40} className="flex flex-col rounded-xl border border-[#222] bg-[#111111] overflow-hidden mr-1">
            <div className="h-12 border-b border-[#222] flex items-center px-4 gap-2 text-white font-medium text-sm shrink-0">
              <Bot className="size-4" />
              KeTech Assistant
            </div>
            <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-4 text-sm text-zinc-300 custom-scrollbar">
              <div className="bg-[#222] p-3 rounded-lg rounded-tl-sm w-[90%]">
                <p>Hello! I am your AI assistant. Tell me what you'd like to build!</p>
              </div>
            </div>
            <div className="p-3 border-t border-[#222] bg-[#111111] shrink-0">
              <div className="relative flex items-center bg-[#222] rounded-lg border border-[#333] focus-within:border-zinc-500 transition-colors">
                <input
                  type="text"
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  placeholder="Ask the AI to update your code..."
                  className="w-full bg-transparent border-none py-3 pl-3 pr-10 text-sm text-white focus:outline-none focus:ring-0 rounded-lg placeholder:text-zinc-500"
                />
                <button className="absolute right-2 p-1.5 hover:bg-[#333] rounded-md text-white transition-colors">
                  <Send className="size-4" />
                </button>
              </div>
            </div>
          </ResizablePanel>

          <ResizableHandle className="bg-transparent hover:bg-[#333] transition-colors w-1 cursor-col-resize rounded-full mx-1" />

          {/* Right Panel: Editor / Preview */}
          <ResizablePanel defaultSize={75} className="flex flex-col rounded-xl border border-[#222] bg-[#111111] overflow-hidden ml-1">
            {/* V0-like Segmented Control Top Bar */}
            <div className="h-12 border-b border-[#222] flex items-center justify-center px-4 relative bg-[#0A0A0A] shrink-0">

              <div className="absolute left-4 text-sm text-zinc-400 flex items-center gap-2 font-mono">
                <Layout className="size-4" />
                {selectedFile}
              </div>

              <div className="flex items-center bg-[#1A1A1A] rounded-lg p-1 border border-[#222]">
                <button
                  onClick={() => setActiveTab('code')}
                  className={`flex items-center gap-2 px-3 py-1 rounded-md text-xs font-medium transition-all ${activeTab === 'code' ? 'bg-[#333] text-white shadow-sm' : 'text-zinc-400 hover:text-white'}`}
                >
                  <Code2 className="size-3.5" />
                  Code
                </button>
                <button
                  onClick={() => setActiveTab('preview')}
                  className={`flex items-center gap-2 px-3 py-1 rounded-md text-xs font-medium transition-all ${activeTab === 'preview' ? 'bg-[#333] text-white shadow-sm' : 'text-zinc-400 hover:text-white'}`}
                >
                  <MonitorPlay className="size-3.5" />
                  Preview
                </button>
                <button
                  onClick={() => setActiveTab('terminal')}
                  className={`flex items-center gap-2 px-3 py-1 rounded-md text-xs font-medium transition-all ${activeTab === 'terminal' ? 'bg-[#333] text-white shadow-sm' : 'text-zinc-400 hover:text-white'}`}
                >
                  <TerminalSquare className="size-3.5" />
                  Console
                </button>
              </div>
            </div>

            {/* Content Area */}
            <div className="flex-1 w-full h-full relative overflow-hidden bg-[#111111]">
              <div className={activeTab === 'code' ? 'absolute inset-0 pt-2 block' : 'hidden'}>
                <CodeEditor
                  fileName={selectedFile}
                  value={files[selectedFile] || ""}
                  onChange={handleEditorChange}
                />
              </div>
              <div className={activeTab === 'preview' ? 'absolute inset-0 flex items-center justify-center text-zinc-500 flex-col gap-4 bg-white rounded-b-xl' : 'hidden'}>
                <MonitorPlay className="size-12 text-zinc-300" />
                <p>Preview mode not ready yet.</p>
              </div>
              <div className={activeTab === 'terminal' ? 'absolute inset-0 pt-2 block' : 'hidden'}>
                <Terminal />
              </div>
            </div>
          </ResizablePanel>

        </ResizablePanelGroup>
      </div>
    </div>
  )
}

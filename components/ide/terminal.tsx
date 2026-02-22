"use client"


export function Terminal() {
  return (
    <div className="h-full flex flex-col bg-[#1e1e1e]">
      {/* Terminal Content */}
      <div className="flex-1 p-4 font-mono text-[13px] overflow-y-auto custom-scrollbar text-zinc-300">
        <div className="space-y-1.5">
          <div className="text-zinc-500">
            Welcome to KeTech Terminal workspace.
          </div>
          <div className="text-green-400">
            node v20.x installed.
          </div>
          <div className="flex items-center gap-2 mt-4">
            <span className="text-blue-400">~/project $</span>
            <div className="w-2 h-4 bg-zinc-400 animate-pulse" />
          </div>
        </div>
      </div>
    </div>
  )
}

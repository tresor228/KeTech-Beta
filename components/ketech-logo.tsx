import Image from "next/image"

export function KeTechLogo({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <div className="flex items-center justify-center size-10 rounded-lg bg-primary overflow-hidden">
        <Image 
          src="/icon.png" 
          alt="KeTech Logo" 
          width={40} 
          height={40}
          className="object-contain"
        />
      </div>
      <span className="text-2xl font-bold text-foreground">KeTech</span>
    </div>
  )
}

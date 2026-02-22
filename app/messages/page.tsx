"use client"

import { useState, useRef, useEffect } from "react"
import {
  Search,
  Send,
  Paperclip,
  ImageIcon,
  FileText,
  Mic,
  MoreVertical,
  Phone,
  Video,
  ChevronLeft,
  Play,
  Download,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { DashboardHeader } from "@/components/dashboard/header"
import { cn } from "@/lib/utils"

const contacts = [
  {
    id: 1,
    name: "Amina Diallo",
    avatar: "/african-woman-developer.jpg",
    lastMessage: "Looking forward to collaborating on the React project!",
    time: "10:30 AM",
    unread: 2,
    online: true,
  },
  {
    id: 2,
    name: "Kwame Mensah",
    avatar: "/african-man-developer.jpg",
    lastMessage: "I've uploaded the PDF with the specifications.",
    time: "Yesterday",
    unread: 0,
    online: false,
  },
  {
    id: 3,
    name: "Zanele Ndlovu",
    avatar: "/african-woman-developer.jpg",
    lastMessage: "Voice note sent (0:45)",
    time: "Monday",
    unread: 0,
    online: true,
  },
]

const initialMessages = [
  {
    id: 1,
    senderId: 1,
    text: "Hi there! I saw your profile on the community page and thought we'd be a great match for the upcoming hackathon.",
    time: "10:25 AM",
    type: "text",
  },
  {
    id: 2,
    senderId: "me",
    text: "Hey Amina! Thanks for reaching out. I'd love to collaborate. What projects are you thinking of?",
    time: "10:27 AM",
    type: "text",
  },
  {
    id: 3,
    senderId: 1,
    text: "I was thinking about building a fintech solution for small businesses. Here's the initial draft of the idea.",
    time: "10:28 AM",
    type: "text",
  },
  {
    id: 4,
    senderId: 1,
    file: { name: "project-spec.pdf", size: "1.2 MB" },
    time: "10:28 AM",
    type: "pdf",
  },
  {
    id: 5,
    senderId: "me",
    text: "Looks interesting! Can you tell me more about the tech stack?",
    time: "10:29 AM",
    type: "text",
  },
  {
    id: 6,
    senderId: 1,
    voice: { duration: "0:32" },
    time: "10:30 AM",
    type: "voice",
  },
  {
    id: 7,
    senderId: 1,
    image: "/ui-mockup.jpg",
    time: "10:30 AM",
    type: "image",
  },
]

export default function MessagesPage() {
  const [selectedContact, setSelectedContact] = useState(contacts[0])
  const [messages, setMessages] = useState(initialMessages)
  const [newMessage, setNewMessage] = useState("")
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const [selectedFiles, setSelectedFiles] = useState<Array<{ file: File; preview?: string }>>([])
  const scrollAreaRef = useRef<HTMLDivElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const imageInputRef = useRef<HTMLInputElement>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight
    }
  }, [messages])

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto"
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 120)}px`
    }
  }, [newMessage])

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    if (files.length > 0) {
      const newFileItems = files.map((file) => ({ file }))
      setSelectedFiles((prev: any) => [...prev, ...newFileItems])
    }
    if (e.target) {
      e.target.value = ""
    }
  }

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    if (files.length > 0) {
      const imageFiles = files.filter((file) => file.type.startsWith("image/"))

      imageFiles.forEach((file) => {
        const reader = new FileReader()
        reader.onload = (e) => {
          if (e.target?.result) {
            setSelectedFiles((prev: any) => [...prev, { file, preview: e.target!.result as string }])
          }
        }
        reader.readAsDataURL(file)
      })
    }
    if (e.target) {
      e.target.value = ""
    }
  }

  const removeFile = (index: number) => {
    setSelectedFiles((prev) => prev.filter((_: any, i: number) => i !== index))
  }

  const handleSendMessage = () => {
    if (!newMessage.trim() && selectedFiles.length === 0) return

    const newMessages: Array<any> = []
    let messageIdCounter = messages.length

    // Envoyer les fichiers/images d'abord
    selectedFiles.forEach((fileItem: any) => {
      messageIdCounter++
      const { file, preview } = fileItem
      if (file.type.startsWith("image/")) {
        // Utiliser la preview si disponible, sinon créer une nouvelle
        const imageUrl = preview || URL.createObjectURL(file)
        const newMsg = {
          id: messageIdCounter,
          senderId: "me",
          image: imageUrl,
          time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          type: "image",
        }
        newMessages.push(newMsg)
      } else {
        const newMsg = {
          id: messageIdCounter,
          senderId: "me",
          file: { name: file.name, size: `${(file.size / 1024 / 1024).toFixed(2)} MB` },
          time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          type: "pdf",
        }
        newMessages.push(newMsg)
      }
    })

    // Envoyer le message texte s'il y en a un
    if (newMessage.trim()) {
      messageIdCounter++
      const newMsg = {
        id: messageIdCounter,
        senderId: "me",
        text: newMessage,
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        type: "text",
      }
      newMessages.push(newMsg)
    }

    if (newMessages.length > 0) {
      setMessages((prev: any) => [...prev, ...newMessages])
    }

    setNewMessage("")
    setSelectedFiles([])
  }

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-background">
      <DashboardHeader />
      <div className="flex flex-1 min-h-0 overflow-hidden bg-background">
        {/* Sidebar - Contacts List */}
        <aside
          className={cn(
            "w-full md:w-80 border-r border-border bg-card flex flex-col transition-all duration-300",
            !isSidebarOpen && "hidden md:flex",
          )}
        >
          <div className="p-4 border-b border-border">
            <h2 className="text-xl font-bold mb-4">Messages</h2>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search messages..." className="pl-9" />
            </div>
          </div>

          <ScrollArea className="flex-1">
            <div className="divide-y divide-border">
              {contacts.map((contact) => (
                <button
                  key={contact.id}
                  onClick={() => {
                    setSelectedContact(contact)
                    if (window.innerWidth < 768) setIsSidebarOpen(false)
                  }}
                  className={cn(
                    "w-full p-4 flex items-start gap-3 hover:bg-accent transition-colors text-left",
                    selectedContact.id === contact.id && "bg-accent",
                  )}
                >
                  <div className="relative flex-shrink-0">
                    <Avatar>
                      <AvatarImage src={contact.avatar || "/placeholder.svg"} alt={contact.name} />
                      <AvatarFallback>{contact.name[0]}</AvatarFallback>
                    </Avatar>
                    {contact.online && (
                      <span className="absolute bottom-0 right-0 h-3 w-3 bg-green-500 border-2 border-card rounded-full" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-semibold text-sm truncate">{contact.name}</span>
                      <span className="text-[10px] text-muted-foreground">{contact.time}</span>
                    </div>
                    <p className="text-xs text-muted-foreground truncate">{contact.lastMessage}</p>
                  </div>
                  {contact.unread > 0 && (
                    <Badge className="bg-primary hover:bg-primary text-[10px] h-5 w-5 flex items-center justify-center rounded-full p-0">
                      {contact.unread}
                    </Badge>
                  )}
                </button>
              ))}
            </div>
          </ScrollArea>
        </aside>

        {/* Main Chat Area */}
        <main className={cn("flex-1 flex flex-col bg-background relative min-h-0 h-full", isSidebarOpen ? "hidden md:flex" : "flex")}>
          {/* Chat Header */}
          <header className="flex-shrink-0 p-4 border-b border-border flex items-center justify-between bg-card">
            <div className="flex items-center gap-3">
              <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsSidebarOpen(true)}>
                <ChevronLeft className="h-5 w-5" />
              </Button>
              <div className="relative">
                <Avatar>
                  <AvatarImage src={selectedContact.avatar || "/placeholder.svg"} alt={selectedContact.name} />
                  <AvatarFallback>{selectedContact.name[0]}</AvatarFallback>
                </Avatar>
                {selectedContact.online && (
                  <span className="absolute bottom-0 right-0 h-3 w-3 bg-green-500 border-2 border-card rounded-full" />
                )}
              </div>
              <div>
                <h3 className="font-semibold text-sm">{selectedContact.name}</h3>
                <p className="text-xs text-muted-foreground">{selectedContact.online ? "Online" : "Offline"}</p>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <Button variant="ghost" size="icon">
                <Phone className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon">
                <Video className="h-4 w-4" />
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>View Profile</DropdownMenuItem>
                  <DropdownMenuItem>Clear Chat</DropdownMenuItem>
                  <DropdownMenuItem className="text-destructive">Block User</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </header>

          {/* Messages */}
          <ScrollArea className="flex-1 p-4 min-h-0" viewportRef={scrollAreaRef as any}>
            <div className="space-y-4">
              {messages.map((msg: any) => (
                <div
                  key={msg.id}
                  className={cn(
                    "flex flex-col max-w-[80%] sm:max-w-[70%]",
                    msg.senderId === "me" ? "ml-auto items-end" : "mr-auto items-start",
                  )}
                >
                  <div
                    className={cn(
                      "rounded-2xl p-3 text-sm shadow-sm",
                      msg.senderId === "me"
                        ? "bg-primary text-primary-foreground rounded-tr-none"
                        : "bg-muted text-foreground rounded-tl-none border border-border",
                    )}
                  >
                    {msg.type === "text" && <p>{msg.text}</p>}

                    {msg.type === "pdf" && (
                      <div className="flex items-center gap-3 bg-background/10 p-2 rounded-lg">
                        <div className="bg-background/20 p-2 rounded">
                          <FileText className="h-6 w-6" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-xs truncate">{msg.file?.name}</p>
                          <p className="text-[10px] opacity-70">{msg.file?.size}</p>
                        </div>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Download className="h-4 w-4" />
                        </Button>
                      </div>
                    )}

                    {msg.type === "voice" && (
                      <div className="flex items-center gap-3 min-w-[200px]">
                        <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full bg-background/20">
                          <Play className="h-4 w-4 fill-current" />
                        </Button>
                        <div className="flex-1 h-1 bg-background/30 rounded-full relative">
                          <div className="absolute inset-y-0 left-0 w-1/3 bg-background/60 rounded-full" />
                        </div>
                        <span className="text-[10px]">{msg.voice?.duration}</span>
                        <Mic className="h-3 w-3 opacity-60" />
                      </div>
                    )}

                    {msg.type === "image" && (
                      <div className="rounded-lg overflow-hidden border border-border/20">
                        <img src={msg.image || "/placeholder.svg"} alt="Sent image" className="max-w-full h-auto" />
                      </div>
                    )}
                  </div>
                  <span className="text-[10px] text-muted-foreground mt-1">{msg.time}</span>
                </div>
              ))}
            </div>
          </ScrollArea>

          {/* Input Area */}
          <footer className="flex-shrink-0 p-4 bg-card border-t border-border z-10 relative">
            {/* Preview des fichiers/images sélectionnés */}
            {selectedFiles.length > 0 && (
              <div className="mb-3 flex gap-2 overflow-x-auto pb-2">
                {selectedFiles.map((fileItem: any, index: number) => {
                  const { file, preview } = fileItem
                  return (
                    <div key={index} className="relative flex-shrink-0">
                      {file.type.startsWith("image/") && preview ? (
                        <div className="relative group">
                          <img
                            src={preview}
                            alt={file.name}
                            className="h-20 w-20 object-cover rounded-lg border border-border"
                          />
                          <Button
                            variant="destructive"
                            size="icon"
                            className="absolute -top-2 -right-2 h-6 w-6 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                            onClick={() => removeFile(index)}
                          >
                            ×
                          </Button>
                        </div>
                      ) : (
                        <div className="relative group h-20 w-20 bg-muted rounded-lg border border-border flex items-center justify-center">
                          <FileText className="h-8 w-8 text-muted-foreground" />
                          <Button
                            variant="destructive"
                            size="icon"
                            className="absolute -top-2 -right-2 h-6 w-6 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                            onClick={() => removeFile(index)}
                          >
                            ×
                          </Button>
                          <p className="absolute bottom-0 left-0 right-0 text-[10px] truncate px-1 bg-black/50 text-white rounded-b-lg">
                            {file.name}
                          </p>
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            )}

            <div className="flex items-end gap-2 max-w-4xl mx-auto">
              {/* Inputs cachés pour fichiers et images */}
              <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                multiple
                accept=".pdf,.doc,.docx,.txt"
                onChange={handleFileSelect}
              />
              <input
                type="file"
                ref={imageInputRef}
                className="hidden"
                multiple
                accept="image/*"
                onChange={handleImageSelect}
              />

              <div className="flex gap-1 mb-1">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-10 w-10 text-muted-foreground hover:text-primary hover:bg-muted"
                  onClick={() => fileInputRef.current?.click()}
                  type="button"
                >
                  <Paperclip className="h-5 w-5" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-10 w-10 text-muted-foreground hover:text-primary hover:bg-muted"
                  onClick={() => imageInputRef.current?.click()}
                  type="button"
                >
                  <ImageIcon className="h-5 w-5" />
                </Button>
              </div>

              <div className="flex-1 relative bg-muted rounded-2xl border border-border focus-within:ring-1 focus-within:ring-primary">
                <textarea
                  ref={textareaRef}
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault()
                      handleSendMessage()
                    }
                  }}
                  placeholder="Type a message..."
                  className="w-full bg-transparent rounded-2xl py-2.5 px-4 pr-12 text-sm focus:outline-none resize-none min-h-[44px] max-h-[120px]"
                  rows={1}
                />
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-2 bottom-1.5 h-8 w-8 text-muted-foreground hover:text-primary"
                  type="button"
                >
                  <Mic className="h-5 w-5" />
                </Button>
              </div>

              <Button
                className="rounded-full h-11 w-11 p-0 flex-shrink-0 bg-primary hover:bg-primary/90 shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={handleSendMessage}
                disabled={!newMessage.trim() && selectedFiles.length === 0}
                type="button"
              >
                <Send className="h-5 w-5" />
              </Button>
            </div>
          </footer>
        </main>
      </div>
    </div>
  )
}

"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Key } from "lucide-react"
import { useKeys } from "@/hooks/use-keys"
import { Skeleton } from "@/components/ui/skeleton"

interface KeysBalanceCardProps {
  userId?: string
  balance?: number
  className?: string
}

export function KeysBalanceCard({ userId, balance, className }: KeysBalanceCardProps) {
  const { balance: keysBalance, loading } = useKeys(userId)
  const displayBalance = balance !== undefined ? balance : keysBalance

  if (loading && balance === undefined) {
    return (
      <Card className={className}>
        <CardContent className="p-4">
          <div className="flex items-center gap-2">
            <Key className="size-5 text-primary" />
            <div className="flex-1">
              <Skeleton className="h-4 w-16 mb-2" />
              <Skeleton className="h-6 w-20" />
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className={`border-primary/20 bg-primary/5 ${className}`}>
      <CardContent className="p-4">
        <div className="flex items-center gap-3">
          <div className="size-10 rounded-lg bg-primary/10 flex items-center justify-center">
            <Key className="size-5 text-primary" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Votre solde</p>
            <p className="text-2xl font-bold text-primary">{displayBalance} Keys</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

"use client"

import { useState, useEffect } from "react"
import { keysService, INITIAL_FREE_KEYS, type UserKeys } from "@/lib/keys"

export function useKeys(userId?: string) {
  const [keys, setKeys] = useState<UserKeys | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const loadKeys = async () => {
      if (!userId) {
        setLoading(false)
        return
      }

      try {
        setLoading(true)
        setError(null)
        const userKeys = await keysService.getUserKeys(userId)
        setKeys(userKeys)
      } catch (err) {
        setError(err instanceof Error ? err.message : "Erreur lors du chargement des Keys")
        // En cas d'erreur, utiliser le solde initial par défaut
        setKeys({
          userId,
          balance: INITIAL_FREE_KEYS,
          totalEarned: INITIAL_FREE_KEYS,
          totalSpent: 0,
          createdAt: new Date(),
          updatedAt: new Date(),
        })
      } finally {
        setLoading(false)
      }
    }

    loadKeys()
  }, [userId])

  const refreshKeys = async () => {
    if (!userId) return

    try {
      setError(null)
      const userKeys = await keysService.getUserKeys(userId)
      setKeys(userKeys)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erreur lors du rafraîchissement")
    }
  }

  return {
    keys,
    balance: keys?.balance ?? INITIAL_FREE_KEYS,
    loading,
    error,
    refreshKeys,
  }
}

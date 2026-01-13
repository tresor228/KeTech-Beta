// Types pour le système de Keys
export type KeyTransactionType = "credit" | "debit"
export type KeyTransactionSource = 
  | "registration" 
  | "purchase" 
  | "bonus" 
  | "job_application" 
  | "profile_completion"
  | "kyc_verification"
  | "test_completion"
  | "project_completion"
  | "hackathon_participation"
  | "refund"

export type KeyTransactionStatus = "pending" | "completed" | "failed" | "refunded"

export interface UserKeys {
  userId: string
  balance: number
  totalEarned: number
  totalSpent: number
  createdAt: Date
  updatedAt: Date
}

export interface KeyTransaction {
  transactionId: string
  userId: string
  type: KeyTransactionType
  amount: number
  source: KeyTransactionSource
  description: string
  referenceId?: string // ID de l'élément lié (ex: job_id, test_id)
  status: KeyTransactionStatus
  createdAt: Date
}

// Constantes
export const INITIAL_FREE_KEYS = 100 // Keys gratuites à l'inscription
export const DEFAULT_JOB_APPLICATION_COST = 5 // Coût par défaut pour postuler à une offre

// Fonctions utilitaires (pour simulation, à remplacer par des appels API)
export const keysService = {
  // Simuler l'allocation de Keys initiales
  allocateInitialKeys: async (userId: string): Promise<UserKeys> => {
    // TODO: Appel API réel
    return {
      userId,
      balance: INITIAL_FREE_KEYS,
      totalEarned: INITIAL_FREE_KEYS,
      totalSpent: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
    }
  },

  // Simuler le solde de Keys d'un utilisateur
  getUserKeys: async (userId: string): Promise<UserKeys | null> => {
    // TODO: Appel API réel
    // Pour le mock, retourner un solde par défaut si l'utilisateur n'existe pas
    return {
      userId,
      balance: INITIAL_FREE_KEYS,
      totalEarned: INITIAL_FREE_KEYS,
      totalSpent: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
    }
  },

  // Simuler l'utilisation de Keys pour postuler à une offre
  useKeysForJobApplication: async (
    userId: string,
    jobId: string,
    cost: number
  ): Promise<{ success: boolean; transactionId?: string; newBalance?: number; error?: string }> => {
    // TODO: Appel API réel avec vérification de solde
    const userKeys = await keysService.getUserKeys(userId)
    
    if (!userKeys) {
      return { success: false, error: "Utilisateur non trouvé" }
    }

    if (userKeys.balance < cost) {
      return { success: false, error: "Solde insuffisant" }
    }

    // Simuler la transaction
    const newBalance = userKeys.balance - cost
    return {
      success: true,
      transactionId: `tx_${Date.now()}`,
      newBalance,
    }
  },

  // Simuler l'historique des transactions
  getTransactionHistory: async (userId: string): Promise<KeyTransaction[]> => {
    // TODO: Appel API réel
    return []
  },
}

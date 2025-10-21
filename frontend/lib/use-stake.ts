import { useState } from "react"
import { useWallet } from "./wallet-context"
import { stakeOnMatch } from "./contract-utils"
import { toast } from "sonner"

export interface StakeParams {
  matchId: number
  outcome: 0 | 1 | 2 // 0: Team A, 1: Team B, 2: Draw
  amount: string
}

export function useStake() {
  const { provider, isConnected } = useWallet()
  const [isStaking, setIsStaking] = useState(false)

  const stake = async ({ matchId, outcome, amount }: StakeParams) => {
    if (!isConnected || !provider) {
      toast.error("Please connect your wallet first")
      return { success: false }
    }

    setIsStaking(true)
    try {
      const tx = await stakeOnMatch(provider, matchId, outcome, amount)
      
      toast.loading("Transaction pending...", { id: "stake-tx" })
      
      const receipt = await tx.wait()
      
      toast.success("Stake placed successfully!", { id: "stake-tx" })
      
      return {
        success: true,
        txHash: receipt.hash,
        receipt
      }
    } catch (error: any) {
      console.error("Error staking:", error)
      
      let errorMessage = "Failed to place stake"
      if (error.code === "ACTION_REJECTED") {
        errorMessage = "Transaction rejected by user"
      } else if (error.message) {
        errorMessage = error.message
      }
      
      toast.error(errorMessage, { id: "stake-tx" })
      
      return {
        success: false,
        error: errorMessage
      }
    } finally {
      setIsStaking(false)
    }
  }

  return {
    stake,
    isStaking
  }
}


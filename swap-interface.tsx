"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { ChevronDown, ArrowDownUp } from "lucide-react"

interface Token {
  symbol: string
  icon: string
  color: string
}

const tokens: Record<string, Token> = {
  INR: { symbol: "INR", icon: "₹", color: "from-orange-500 to-green-500" },
  USDC: { symbol: "USDC", icon: "$", color: "from-[#03E1FF] to-[#00FFA3]" },
}

export default function SwapInterface() {
  const [sellToken, setSellToken] = useState<string>("INR")
  const [buyToken, setBuyToken] = useState<string>("USDC")
  const [sellAmount, setSellAmount] = useState<string>("0")
  const [buyAmount, setBuyAmount] = useState<string>("0")
  const [walletAddress, setWalletAddress] = useState<string>("")
  const [showSellDropdown, setShowSellDropdown] = useState(false)
  const [showBuyDropdown, setShowBuyDropdown] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [usdcPrice] = useState(83) // INR per USDC

  // Calculate conversion when sellAmount changes
  useEffect(() => {
    if (sellAmount && sellToken === "INR" && buyToken === "USDC") {
      const usdc = (parseFloat(sellAmount) / usdcPrice).toFixed(6)
      setBuyAmount(usdc)
    } else if (sellAmount && sellToken === "USDC" && buyToken === "INR") {
      const inr = (parseFloat(sellAmount) * usdcPrice).toFixed(2)
      setBuyAmount(inr)
    } else if (!sellAmount) {
      setBuyAmount("0")
    }
  }, [sellAmount, sellToken, buyToken, usdcPrice])

  const handleSwapTokens = () => {
    setSellToken(buyToken)
    setBuyToken(sellToken)
    setSellAmount(buyAmount)
    setBuyAmount(sellAmount)
  }

  const handleSelectSellToken = (token: string) => {
    setSellToken(token)
    setShowSellDropdown(false)
  }

  const handleSelectBuyToken = (token: string) => {
    setBuyToken(token)
    setShowBuyDropdown(false)
  }

  const handleContinue = async () => {
    setIsLoading(true)
    // Swap logic will be implemented here
    setTimeout(() => {
      alert('Swap functionality will be implemented!')
      setIsLoading(false)
    }, 1000)
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-6 py-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md"
      >
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">
            Swap Tokens
          </h1>
          <p className="text-white/60">
            Convert INR to USDC on Solana
          </p>
        </div>

        {/* Main swap card */}
        <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-8 shadow-2xl space-y-6">
          {/* Sell section */}
          <div className="space-y-3">
            <label className="text-white/80 text-sm font-medium">From</label>
            <div className="flex items-end gap-3">
              <div className="flex-1">
                <input
                  type="number"
                  value={sellAmount}
                  onChange={(e) => setSellAmount(e.target.value)}
                  placeholder="0"
                  className="w-full bg-transparent text-4xl font-light text-white placeholder-white/40 outline-none focus:outline-none"
                />
                <p className="text-white/50 text-sm mt-1">
                  {sellToken === "INR" ? `₹${sellAmount || "0"}` : `$${sellAmount || "0"}`}
                </p>
              </div>
              <div className="relative">
                <button
                  onClick={() => setShowSellDropdown(!showSellDropdown)}
                  className="flex items-center gap-2 px-4 py-3 bg-white/10 hover:bg-white/20 rounded-xl transition-all border border-white/20 backdrop-blur-sm"
                >
                  <div
                    className={`w-6 h-6 rounded-full bg-gradient-to-br ${tokens[sellToken].color} flex items-center justify-center text-white text-xs font-bold`}
                  >
                    {tokens[sellToken].icon}
                  </div>
                  <span className="text-white font-medium">{sellToken}</span>
                  <ChevronDown className="w-4 h-4 text-white/60" />
                </button>
                {showSellDropdown && (
                  <div className="absolute top-full right-0 mt-2 bg-white/10 backdrop-blur-xl border border-white/20 rounded-lg overflow-hidden z-10 min-w-max">
                    {Object.keys(tokens).map((token) => (
                      <button
                        key={token}
                        onClick={() => handleSelectSellToken(token)}
                        className="w-full px-4 py-2 text-left text-white hover:bg-white/20 transition-colors flex items-center gap-2"
                      >
                        <div className={`w-5 h-5 rounded-full bg-gradient-to-br ${tokens[token].color}`} />
                        {token}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Swap button */}
          <div className="flex justify-center -my-2 relative z-5">
            <motion.button
              onClick={handleSwapTokens}
              whileHover={{ rotate: 180 }}
              transition={{ duration: 0.3 }}
              className="p-3 bg-white/10 hover:bg-white/20 rounded-full border-4 border-white/20 backdrop-blur-sm transition-colors"
            >
              <ArrowDownUp className="w-5 h-5 text-white" />
            </motion.button>
          </div>

          {/* Buy section */}
          <div className="space-y-3">
            <label className="text-white/80 text-sm font-medium">To</label>
            <div className="flex items-end gap-3">
              <div className="flex-1">
                <input
                  type="number"
                  value={buyAmount}
                  readOnly
                  placeholder="0"
                  className="w-full bg-transparent text-4xl font-light text-white placeholder-white/40 outline-none cursor-not-allowed"
                />
                <p className="text-white/50 text-sm mt-1">
                  {buyToken === "INR" ? `₹${buyAmount || "0"}` : `$${buyAmount || "0"}`}
                </p>
              </div>
              <div className="relative">
                <button
                  onClick={() => setShowBuyDropdown(!showBuyDropdown)}
                  className="flex items-center gap-2 px-4 py-3 bg-white/10 hover:bg-white/20 rounded-xl transition-all border border-white/20 backdrop-blur-sm"
                >
                  <div
                    className={`w-6 h-6 rounded-full bg-gradient-to-br ${tokens[buyToken].color} flex items-center justify-center text-white text-xs font-bold`}
                  >
                    {tokens[buyToken].icon}
                  </div>
                  <span className="text-white font-medium">{buyToken}</span>
                  <ChevronDown className="w-4 h-4 text-white/60" />
                </button>
                {showBuyDropdown && (
                  <div className="absolute top-full right-0 mt-2 bg-white/10 backdrop-blur-xl border border-white/20 rounded-lg overflow-hidden z-10 min-w-max">
                    {Object.keys(tokens).map((token) => (
                      <button
                        key={token}
                        onClick={() => handleSelectBuyToken(token)}
                        className="w-full px-4 py-2 text-left text-white hover:bg-white/20 transition-colors flex items-center gap-2"
                      >
                        <div className={`w-5 h-5 rounded-full bg-gradient-to-br ${tokens[token].color}`} />
                        {token}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Exchange Rate Display */}
          <div className="p-4 bg-white/5 rounded-xl border border-white/10">
            <div className="flex justify-between items-center text-sm">
              <span className="text-white/60">Exchange Rate</span>
              <span className="text-white font-semibold">1 USDC = ₹{usdcPrice}</span>
            </div>
          </div>
        </div>

        {/* Wallet address input section */}
        <div className="mt-6 space-y-3">
          <label className="text-white/80 text-sm font-medium block">
            {buyToken === "USDC" ? "Receive USDC to wallet address" : "Wallet Address"}
          </label>
          <input
            type="text"
            value={walletAddress}
            onChange={(e) => setWalletAddress(e.target.value)}
            placeholder="Enter your Solana wallet address"
            className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/40 outline-none focus:ring-2 focus:ring-[#00FFA3]/50 focus:border-transparent backdrop-blur-sm font-mono text-sm"
          />
        </div>

        {/* Continue button */}
        <motion.button
          onClick={handleContinue}
          disabled={!sellAmount || !walletAddress || isLoading}
          whileHover={{ scale: (!sellAmount || !walletAddress) ? 1 : 1.02 }}
          whileTap={{ scale: (!sellAmount || !walletAddress) ? 1 : 0.98 }}
          className={`w-full mt-6 py-4 rounded-xl font-semibold text-white transition-all duration-300 ${
            sellAmount && walletAddress && !isLoading
              ? 'bg-gradient-to-r from-[#00FFA3] to-[#03E1FF] hover:shadow-lg hover:shadow-[#00FFA3]/25'
              : 'bg-white/10 cursor-not-allowed'
          }`}
        >
          {isLoading ? (
            <div className="flex items-center justify-center space-x-2">
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              <span>Processing...</span>
            </div>
          ) : (
            'Continue'
          )}
        </motion.button>

        {/* Info */}
        <div className="mt-6 p-4 bg-[#00FFA3]/10 border border-[#00FFA3]/20 rounded-xl">
          <p className="text-xs text-white/70 text-center">
            🔒 Secure • Fast • Low Fees
          </p>
        </div>
      </motion.div>
    </div>
  )
}

"use client"

import { useEffect, useState } from "react"

export default function HeroImage() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div className="flex items-center justify-center">
      <div className="relative h-[400px] w-[400px] sm:h-[500px] sm:w-[500px]">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full opacity-20 blur-3xl" />
        <div className="relative h-full w-full rounded-xl border bg-background p-4 shadow-lg">
          <div className="flex items-center gap-2 border-b pb-3">
            <div className="h-10 w-10 rounded-full bg-primary" />
            <div>
              <div className="font-semibold">Sarah Johnson</div>
              <div className="text-xs text-muted-foreground">@sarah_j • Verified Human</div>
            </div>
          </div>
          <div className="py-3">
            <p className="text-sm">
              Just posted my first human-verified tweet on ProofTweet! Love that this platform is completely bot-free.
              Check out my verification proof on the blockchain! #HumanityProtocol #ProofTweet
            </p>
          </div>
          <div className="flex items-center justify-between border-t pt-3 text-xs text-muted-foreground">
            <div>10:30 AM • Feb 27, 2025</div>
            <div className="flex items-center gap-1">
              <div className="h-4 w-4 rounded-full bg-green-500" />
              <span>Humanity Verified</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}


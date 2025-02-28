"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Stepper, Step } from "@/components/ui/stepper"
import { CheckCircle, Loader2 } from "lucide-react"

export default function VerifyPage() {
  const [currentStep, setCurrentStep] = useState(0)
  const [loading, setLoading] = useState(false)
  const [verified, setVerified] = useState(false)

  const handleVerify = () => {
    setLoading(true)
    // Simulate verification process
    setTimeout(() => {
      setLoading(false)
      setCurrentStep(1)
      setTimeout(() => {
        setCurrentStep(2)
        setVerified(true)
      }, 1500)
    }, 2000)
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-2xl font-bold">Verify Your Humanity</CardTitle>
          <CardDescription>Complete the verification process to start posting</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-6">
          <Stepper currentStep={currentStep} className="py-4">
            <Step title="Connect" description="Connect Twitter account" />
            <Step title="Verify" description="Verify with Humanity Protocol" />
            <Step title="Complete" description="Start posting verified tweets" />
          </Stepper>

          {currentStep === 0 && (
            <div className="space-y-4">
              <div className="rounded-lg border bg-background p-4">
                <h3 className="font-medium">What is Humanity Protocol?</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Humanity Protocol is a decentralized identity verification system that ensures you're a real human
                  without storing your personal data.
                </p>
              </div>
              <Button className="w-full" size="lg" onClick={handleVerify} disabled={loading}>
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Connecting...
                  </>
                ) : (
                  "Start Verification"
                )}
              </Button>
            </div>
          )}

          {currentStep === 1 && (
            <div className="space-y-4 text-center">
              <div className="mx-auto h-16 w-16 animate-pulse rounded-full bg-primary/20 flex items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
              </div>
              <h3 className="font-medium">Verifying with Humanity Protocol</h3>
              <p className="text-sm text-muted-foreground">Please wait while we verify your humanity credentials...</p>
            </div>
          )}

          {currentStep === 2 && verified && (
            <div className="space-y-4 text-center">
              <div className="mx-auto h-16 w-16 rounded-full bg-green-100 flex items-center justify-center">
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="font-medium">Verification Complete!</h3>
              <p className="text-sm text-muted-foreground">
                You've been successfully verified as human. You can now post human-verified tweets.
              </p>
              <Link href="/dashboard">
                <Button className="w-full" size="lg">
                  Go to Dashboard
                </Button>
              </Link>
            </div>
          )}
        </CardContent>
        <CardFooter className="flex justify-center">
          <p className="text-xs text-muted-foreground">
            Your verification is stored on the blockchain and linked to your Twitter account
          </p>
        </CardFooter>
      </Card>
    </div>
  )
}


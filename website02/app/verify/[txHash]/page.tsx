import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, ExternalLink, Twitter } from "lucide-react"

interface VerifyPageProps {
  params: {
    txHash: string
  }
}

export default function VerifyTweetPage({ params }: VerifyPageProps) {
  const { txHash } = params

  // In a real implementation, this would fetch the tweet data from the blockchain
  // using the transaction hash

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted p-4">
      <Card className="w-full max-w-lg">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 h-12 w-12 rounded-full bg-green-100 flex items-center justify-center">
            <CheckCircle className="h-6 w-6 text-green-600" />
          </div>
          <CardTitle className="text-2xl font-bold">Verified Human Tweet</CardTitle>
          <CardDescription>This tweet has been verified on the blockchain using Humanity Protocol</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="rounded-lg border bg-card p-4">
            <div className="flex items-center gap-2 mb-2">
              <div className="h-8 w-8 rounded-full bg-primary" />
              <div>
                <div className="font-semibold">Sarah Johnson</div>
                <div className="text-xs text-muted-foreground">@sarah_j</div>
              </div>
              <Badge variant="outline" className="bg-green-100 text-green-800 hover:bg-green-100 ml-auto">
                Verified Human
              </Badge>
            </div>
            <p className="mb-2">
              Just posted my first human-verified tweet on ProofTweet! Love that this platform is completely bot-free.
              Check out my verification proof on the blockchain! #HumanityProtocol #ProofTweet
            </p>
            <div className="text-xs text-muted-foreground">10:30 AM • Feb 27, 2025</div>
          </div>

          <div className="space-y-2">
            <h3 className="font-medium">Blockchain Verification</h3>
            <div className="rounded-lg border bg-card p-4 space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Transaction Hash:</span>
                <Link
                  href={`https://etherscan.io/tx/${txHash}`}
                  target="_blank"
                  className="text-sm text-primary hover:underline flex items-center gap-1"
                >
                  {txHash}
                  <ExternalLink className="h-3 w-3" />
                </Link>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Verification Time:</span>
                <span className="text-sm">Feb 27, 2025, 10:30:15 AM</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Humanity Protocol ID:</span>
                <span className="text-sm">humanity-1234567890</span>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col gap-4">
          <div className="flex w-full gap-4">
            <Button className="w-1/2 gap-2" variant="outline">
              <Twitter className="h-4 w-4" />
              View on Twitter
            </Button>
            <Link href="/explore" className="w-1/2">
              <Button className="w-full">Explore More Tweets</Button>
            </Link>
          </div>
          <div className="text-center text-xs text-muted-foreground">Powered by Humanity Protocol and ProofTweet</div>
        </CardFooter>
      </Card>
    </div>
  )
}


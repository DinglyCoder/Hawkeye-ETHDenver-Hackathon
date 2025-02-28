"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Loader2, Send, Twitter } from "lucide-react"
import TweetCard from "@/components/tweet-card"

export default function DashboardPage() {
  const [tweet, setTweet] = useState("")
  const [isPosting, setIsPosting] = useState(false)
  const [tweets, setTweets] = useState([
    {
      id: "1",
      content:
        "Just posted my first human-verified tweet on ProofTweet! Love that this platform is completely bot-free.",
      timestamp: "10:30 AM • Feb 27, 2025",
      verified: true,
      txHash: "0x1a2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p7q8r9s0t",
    },
  ])

  const handlePost = () => {
    if (!tweet.trim()) return

    setIsPosting(true)

    // Simulate posting and blockchain verification
    setTimeout(() => {
      const newTweet = {
        id: Date.now().toString(),
        content: tweet,
        timestamp: new Date().toLocaleString(),
        verified: true,
        txHash: `0x${Math.random().toString(16).substring(2, 42)}`,
      }

      setTweets([newTweet, ...tweets])
      setTweet("")
      setIsPosting(false)
    }, 2000)
  }

  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <Avatar className="h-12 w-12">
            <AvatarImage src="/placeholder-user.jpg" alt="@username" />
            <AvatarFallback>UN</AvatarFallback>
          </Avatar>
          <div>
            <h1 className="text-xl font-bold">Sarah Johnson</h1>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span>@sarah_j</span>
              <Badge variant="outline" className="bg-green-100 text-green-800 hover:bg-green-100">
                Verified Human
              </Badge>
            </div>
          </div>
        </div>
        <Button variant="outline" size="sm" className="gap-2">
          <Twitter className="h-4 w-4" />
          View on Twitter
        </Button>
      </div>

      <Card className="mb-6">
        <CardContent className="p-4">
          <Textarea
            placeholder="What's happening? Your tweet will be verified and stored on the blockchain..."
            className="mb-4 resize-none border-none p-0 focus-visible:ring-0 text-lg"
            value={tweet}
            onChange={(e) => setTweet(e.target.value)}
            rows={3}
          />
          <div className="flex items-center justify-between">
            <div className="text-sm text-muted-foreground">{tweet.length}/280 characters</div>
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => setTweet("")} disabled={!tweet.trim() || isPosting}>
                Clear
              </Button>
              <Button onClick={handlePost} disabled={!tweet.trim() || isPosting} className="gap-2">
                {isPosting ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Verifying...
                  </>
                ) : (
                  <>
                    <Send className="h-4 w-4" />
                    Post
                  </>
                )}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="my-tweets">
        <TabsList className="mb-4">
          <TabsTrigger value="my-tweets">My Tweets</TabsTrigger>
          <TabsTrigger value="verified-feed">Verified Feed</TabsTrigger>
        </TabsList>
        <TabsContent value="my-tweets" className="space-y-4">
          {tweets.map((tweet) => (
            <TweetCard key={tweet.id} tweet={tweet} />
          ))}
        </TabsContent>
        <TabsContent value="verified-feed" className="space-y-4">
          <TweetCard
            tweet={{
              id: "global1",
              content:
                "The Humanity Protocol integration with ProofTweet is a game-changer for social media. No more bots, just real human interaction!",
              timestamp: "9:45 AM • Feb 27, 2025",
              verified: true,
              txHash: "0x9a8b7c6d5e4f3g2h1i0j9k8l7m6n5o4p3q2r1s0t",
              author: {
                name: "Alex Chen",
                handle: "@alex_blockchain",
              },
            }}
          />
          <TweetCard
            tweet={{
              id: "global2",
              content:
                "Just discovered ProofTweet and I'm impressed by how they're using verifiable credentials to create a bot-free social experience. #ETHDenver2025",
              timestamp: "8:15 AM • Feb 27, 2025",
              verified: true,
              txHash: "0x2s3t4u5v6w7x8y9z0a1b2c3d4e5f6g7h8i9j0k",
              author: {
                name: "Maya Williams",
                handle: "@maya_web3",
              },
            }}
          />
        </TabsContent>
      </Tabs>
    </div>
  )
}


import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search } from "lucide-react"
import TweetCard from "@/components/tweet-card"

export default function ExplorePage() {
  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <h1 className="text-3xl font-bold mb-6">Explore Verified Tweets</h1>

      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input placeholder="Search verified tweets..." className="pl-10" />
      </div>

      <Tabs defaultValue="trending">
        <TabsList className="mb-4">
          <TabsTrigger value="trending">Trending</TabsTrigger>
          <TabsTrigger value="latest">Latest</TabsTrigger>
          <TabsTrigger value="verified">Newly Verified</TabsTrigger>
        </TabsList>

        <TabsContent value="trending" className="space-y-4">
          <TweetCard
            tweet={{
              id: "trending1",
              content:
                "The Humanity Protocol integration with ProofTweet is a game-changer for social media. No more bots, just real human interaction! #ETHDenver2025 #Web3Social",
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
              id: "trending2",
              content:
                "Just discovered ProofTweet and I'm impressed by how they're using verifiable credentials to create a bot-free social experience. The future of social media is human-verified!",
              timestamp: "8:15 AM • Feb 27, 2025",
              verified: true,
              txHash: "0x2s3t4u5v6w7x8y9z0a1b2c3d4e5f6g7h8i9j0k",
              author: {
                name: "Maya Williams",
                handle: "@maya_web3",
              },
            }}
          />
          <TweetCard
            tweet={{
              id: "trending3",
              content:
                "ProofTweet is revolutionizing how we think about social media verification. By combining Twitter's reach with blockchain verification, we're creating a new standard for authentic online interaction.",
              timestamp: "7:30 AM • Feb 27, 2025",
              verified: true,
              txHash: "0x3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0u1v",
              author: {
                name: "Jordan Taylor",
                handle: "@jordan_crypto",
              },
            }}
          />
        </TabsContent>

        <TabsContent value="latest" className="space-y-4">
          <TweetCard
            tweet={{
              id: "latest1",
              content:
                "Just posted my first human-verified tweet through ProofTweet! The verification process was smooth and now I have proof that I'm a real human on the blockchain.",
              timestamp: "11:20 AM • Feb 27, 2025",
              verified: true,
              txHash: "0x4f5g6h7i8j9k0l1m2n3o4p5q6r7s8t9u0v1w2x",
              author: {
                name: "Chris Morgan",
                handle: "@chris_m",
              },
            }}
          />
          <TweetCard
            tweet={{
              id: "latest2",
              content:
                "Testing out ProofTweet's blockchain verification. Each tweet gets its own transaction hash and proof of humanity. This is the future of social media!",
              timestamp: "11:05 AM • Feb 27, 2025",
              verified: true,
              txHash: "0x5g6h7i8j9k0l1m2n3o4p5q6r7s8t9u0v1w2x3y",
              author: {
                name: "Priya Sharma",
                handle: "@priya_tech",
              },
            }}
          />
        </TabsContent>

        <TabsContent value="verified" className="space-y-4">
          <TweetCard
            tweet={{
              id: "verified1",
              content:
                "Just completed my humanity verification on ProofTweet! The Humanity Protocol integration makes the process simple while ensuring strong verification.",
              timestamp: "10:50 AM • Feb 27, 2025",
              verified: true,
              txHash: "0x6h7i8j9k0l1m2n3o4p5q6r7s8t9u0v1w2x3y4z",
              author: {
                name: "David Wilson",
                handle: "@david_w",
              },
            }}
          />
          <TweetCard
            tweet={{
              id: "verified2",
              content:
                "New to ProofTweet and loving the human-only experience. Just got verified through Humanity Protocol and it was surprisingly easy!",
              timestamp: "10:30 AM • Feb 27, 2025",
              verified: true,
              txHash: "0x7i8j9k0l1m2n3o4p5q6r7s8t9u0v1w2x3y4z5a",
              author: {
                name: "Emma Johnson",
                handle: "@emma_j",
              },
            }}
          />
        </TabsContent>
      </Tabs>

      <div className="mt-8 text-center">
        <p className="text-muted-foreground mb-4">Want to join the conversation?</p>
        <Link href="/login">
          <Button size="lg">Sign in to Post</Button>
        </Link>
      </div>
    </div>
  )
}


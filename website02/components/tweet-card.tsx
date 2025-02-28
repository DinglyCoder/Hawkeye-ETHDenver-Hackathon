import Link from "next/link"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ExternalLink, Heart, MessageCircle, Repeat, Share2 } from "lucide-react"

interface TweetCardProps {
  tweet: {
    id: string
    content: string
    timestamp: string
    verified: boolean
    txHash: string
    author?: {
      name: string
      handle: string
    }
  }
}

export default function TweetCard({ tweet }: TweetCardProps) {
  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex gap-3">
          <Avatar>
            <AvatarImage src="/placeholder-user.jpg" alt="@username" />
            <AvatarFallback>{tweet.author ? tweet.author.name.charAt(0) : "S"}</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <span className="font-semibold">{tweet.author ? tweet.author.name : "Sarah Johnson"}</span>
              <span className="text-sm text-muted-foreground">{tweet.author ? tweet.author.handle : "@sarah_j"}</span>
              <Badge variant="outline" className="bg-green-100 text-green-800 hover:bg-green-100 ml-auto">
                Verified Human
              </Badge>
            </div>
            <p className="mb-2">{tweet.content}</p>
            <div className="text-xs text-muted-foreground mb-3">{tweet.timestamp}</div>
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <span>Verified on blockchain:</span>
              <Link
                href={`https://etherscan.io/tx/${tweet.txHash}`}
                target="_blank"
                className="flex items-center gap-1 text-primary hover:underline"
              >
                {`${tweet.txHash.substring(0, 6)}...${tweet.txHash.substring(tweet.txHash.length - 4)}`}
                <ExternalLink className="h-3 w-3" />
              </Link>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="border-t p-2">
        <div className="flex w-full justify-between">
          <Button variant="ghost" size="sm" className="gap-1">
            <MessageCircle className="h-4 w-4" />
            <span className="text-xs">12</span>
          </Button>
          <Button variant="ghost" size="sm" className="gap-1">
            <Repeat className="h-4 w-4" />
            <span className="text-xs">4</span>
          </Button>
          <Button variant="ghost" size="sm" className="gap-1">
            <Heart className="h-4 w-4" />
            <span className="text-xs">24</span>
          </Button>
          <Button variant="ghost" size="sm">
            <Share2 className="h-4 w-4" />
          </Button>
        </div>
      </CardFooter>
    </Card>
  )
}


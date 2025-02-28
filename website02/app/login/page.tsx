import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { TwitterIcon } from "lucide-react"

export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-muted p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-2xl font-bold">Sign in to ProofTweet</CardTitle>
          <CardDescription>Connect with Twitter and verify your humanity</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <Button className="w-full gap-2" size="lg">
            <TwitterIcon className="h-5 w-5" />
            Continue with Twitter
          </Button>
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-muted px-2 text-muted-foreground">Or</span>
            </div>
          </div>
          <div className="text-center text-sm">
            By continuing, you agree to our{" "}
            <Link href="/terms" className="underline underline-offset-4">
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link href="/privacy" className="underline underline-offset-4">
              Privacy Policy
            </Link>
            .
          </div>
        </CardContent>
        <CardFooter className="flex flex-col gap-2">
          <div className="text-center text-sm text-muted-foreground">
            New to ProofTweet?{" "}
            <Link href="/about" className="underline underline-offset-4">
              Learn more
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}


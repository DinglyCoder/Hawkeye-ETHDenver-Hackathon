import Link from "next/link"
import { Button } from "@/components/ui/button"
import { TwitterIcon } from "lucide-react"
import HeroImage from "@/components/hero-image"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="border-b">
        <div className="container flex h-16 items-center px-4 sm:px-6 lg:px-8">
          <Link href="/" className="flex items-center gap-2 font-bold text-xl">
            <span className="text-primary">ProofTweet</span>
          </Link>
          <nav className="ml-auto flex gap-4">
            <Link href="/about">
              <Button variant="ghost">About</Button>
            </Link>
            <Link href="/explore">
              <Button variant="ghost">Explore</Button>
            </Link>
            <Link href="/login">
              <Button>Login</Button>
            </Link>
          </nav>
        </div>
      </header>
      <main className="flex-1">
        <section className="py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 xl:grid-cols-2">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                    Social Media for Humans, Not Bots
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    ProofTweet uses Humanity Protocol to verify real humans, creating a social space free from bots and
                    spam.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Link href="/login">
                    <Button size="lg" className="gap-1">
                      <TwitterIcon className="h-5 w-5" />
                      Connect with Twitter
                    </Button>
                  </Link>
                  <Link href="/explore">
                    <Button size="lg" variant="outline">
                      Explore Verified Tweets
                    </Button>
                  </Link>
                </div>
              </div>
              <HeroImage />
            </div>
          </div>
        </section>
        <section className="bg-muted py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-2 lg:gap-12">
              <div className="space-y-4">
                <div className="inline-block rounded-lg bg-primary px-3 py-1 text-sm text-primary-foreground">
                  How It Works
                </div>
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                  Blockchain-Verified Human Tweets
                </h2>
                <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Every tweet on ProofTweet is verified using Humanity Protocol and stored on the blockchain, ensuring
                  only real humans can participate.
                </p>
              </div>
              <div className="flex flex-col gap-2 rounded-xl border bg-background p-4 shadow-sm">
                <div className="flex items-start gap-4">
                  <div className="grid gap-1">
                    <div className="font-semibold">1. Connect Your Twitter Account</div>
                    <div className="text-sm text-muted-foreground">Securely login with Twitter OAuth 2.0</div>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="grid gap-1">
                    <div className="font-semibold">2. Verify Your Humanity</div>
                    <div className="text-sm text-muted-foreground">
                      Complete a one-time verification process with Humanity Protocol
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="grid gap-1">
                    <div className="font-semibold">3. Post Human-Verified Tweets</div>
                    <div className="text-sm text-muted-foreground">
                      Each tweet is stored on the blockchain with proof of humanity
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="border-t py-6 md:py-0">
        <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
          <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
            © 2025 ProofTweet. All rights reserved.
          </p>
          <div className="flex gap-4">
            <Link href="/terms" className="text-sm text-muted-foreground underline underline-offset-4">
              Terms
            </Link>
            <Link href="/privacy" className="text-sm text-muted-foreground underline underline-offset-4">
              Privacy
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}


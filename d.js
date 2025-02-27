/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [],
};

import NextAuth from "next-auth";
import TwitterProvider from "next-auth/providers/twitter";

export default NextAuth({
  providers: [
    TwitterProvider({
      clientId: process.env.TWITTER_CLIENT_ID,
      clientSecret: process.env.TWITTER_CLIENT_SECRET,
      version: "2.0",
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      session.user.id = token.sub;
      return session;
    },
  },
});

TWITTER_CLIENT_ID=your-twitter-client-id
TWITTER_CLIENT_SECRET=your-twitter-client-secret
NEXTAUTH_URL=http://localhost:3000


import { signIn, signOut, useSession } from "next-auth/react";

export default function LoginButton() {
  const { data: session } = useSession();

  return session ? (
    <div className="flex items-center space-x-4">
      <img src={session.user.image} className="w-10 h-10 rounded-full" />
      <span>{session.user.name}</span>
      <button onClick={() => signOut()} className="bg-red-500 text-white px-4 py-2 rounded">
        로그아웃
      </button>
    </div>
  ) : (
    <button onClick={() => signIn("twitter")} className="bg-blue-500 text-white px-4 py-2 rounded">
      Sign in with Twitter
    </button>
  );
}

import { useState } from "react";

export default function TweetForm({ user }) {
  const [tweet, setTweet] = useState("");

  const handlePostTweet = async () => {
    if (tweet.length > 280) return alert("트윗은 280자 이내여야 합니다.");
    if (!user) return alert("로그인이 필요합니다.");

    const res = await fetch("/api/postTweet", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ tweet, userId: user.id }),
    });

    if (res.ok) {
      alert("트윗이 성공적으로 게시되었습니다!");
      setTweet("");
    } else {
      alert("트윗 게시 실패");
    }
  };

  return (
    <div className="p-4 border rounded-lg shadow-lg">
      <textarea
        value={tweet}
        onChange={(e) => setTweet(e.target.value)}
        className="w-full h-20 border p-2"
        placeholder="트윗을 입력하세요..."
      />
      <button onClick={handlePostTweet} className="bg-green-500 text-white px-4 py-2 mt-2 rounded-lg">
        트윗 게시
      </button>
    </div>
  );
}

import { useState } from "react";

export default function TweetForm({ user }) {
  const [tweet, setTweet] = useState("");

  const handlePostTweet = async () => {
    if (tweet.length > 280) return alert("트윗은 280자 이내여야 합니다.");
    if (!user) return alert("로그인이 필요합니다.");

    const res = await fetch("/api/postTweet", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ tweet, userId: user.id }),
    });

    if (res.ok) {
      alert("트윗이 성공적으로 게시되었습니다!");
      setTweet("");
    } else {
      alert("트윗 게시 실패");
    }
  };

  return (
    <div className="p-4 border rounded-lg shadow-lg">
      <textarea
        value={tweet}
        onChange={(e) => setTweet(e.target.value)}
        className="w-full h-20 border p-2"
        placeholder="트윗을 입력하세요..."
      />
      <button onClick={handlePostTweet} className="bg-green-500 text-white px-4 py-2 mt-2 rounded-lg">
        트윗 게시
      </button>
    </div>
  );
}

import { useEffect, useState } from "react";

export default function VerifiedTweets() {
  const [tweets, setTweets] = useState([]);

  useEffect(() => {
    async function fetchTweets() {
      const res = await fetch("/api/getVerifiedTweets");
      const data = await res.json();
      setTweets(data);
    }
    fetchTweets();
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-lg font-bold">🔹 Verified Tweets</h2>
      {tweets.map((tweet) => (
        <div key={tweet.id} className="border p-4 rounded-lg my-2">
          <p>{tweet.text}</p>
          <span className="text-sm text-gray-500">✅ Proof of Humanity Verified</span>
          <a href={`https://etherscan.io/tx/${tweet.txHash}`} className="text-blue-500">
            🔗 View on Blockchain
          </a>
        </div>
      ))}
    </div>
  );
}

import { useSession } from "next-auth/react";
import LoginButton from "../components/LoginButton";
import TweetForm from "../components/TweetForm";
import VerifiedTweets from "../components/VerifiedTweets";

export default function Home() {
  const { data: session } = useSession();

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold">🚀 Bot-Free Twitter</h1>
      <LoginButton />
      {session && <TweetForm user={session.user} />}
      <VerifiedTweets />
    </div>
  );
}

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ message: "Method Not Allowed" });

  const { tweet, userId } = req.body;

  // 트윗을 블록체인 & Twitter API에 저장 (가상 로직)
  const txHash = "0x123abc456def"; // 블록체인 트랜잭션 해시 (가상값)

  return res.status(200).json({ message: "트윗 성공!", txHash });
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const { tweet, userId } = req.body;

  // 가짜 블록체인 트랜잭션 ID 생성 (실제는 스마트 컨트랙트 연동 필요)
  const fakeTxHash = `0x${Math.random().toString(36).substring(2, 15)}`;

  // Proof of Humanity 태그 추가
  const proofMessage = `
✅ Proof of Humanity Verified
🛡️ Verified Human via Humanity Protocol
🔗 Blockchain Record: https://etherscan.io/tx/${fakeTxHash}
  `;

  const finalTweet = `${tweet}\n\n${proofMessage}`;

  // 여기서 실제 Twitter API를 호출해서 트윗을 게시해야 함
  // 현재는 가짜 응답 처리
  console.log("Posting tweet:", finalTweet);

  return res.status(200).json({ message: "Tweet posted!", tweet: finalTweet, txHash: fakeTxHash });
}
import { useState } from "react";

export default function TweetForm({ user }) {
  const [tweet, setTweet] = useState("");
  const [loading, setLoading] = useState(false);

  const handlePostTweet = async () => {
    if (tweet.length > 280) return alert("트윗은 280자 이내여야 합니다.");
    if (!user) return alert("로그인이 필요합니다.");

    setLoading(true);

    const res = await fetch("/api/postTweet", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ tweet, userId: user.id }),
    });

    const data = await res.json();
    setLoading(false);

    if (res.ok) {
      alert(`트윗이 성공적으로 게시되었습니다!\n\n${data.tweet}`);
      setTweet("");
    } else {
      alert("트윗 게시 실패");
    }
  };

  return (
    <div className="p-4 border rounded-lg shadow-lg">
      <textarea
        value={tweet}
        onChange={(e) => setTweet(e.target.value)}
        className="w-full h-20 border p-2"
        placeholder="트윗을 입력하세요..."
      />
      <button
        onClick={handlePostTweet}
        className={`bg-green-500 text-white px-4 py-2 mt-2 rounded-lg ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
        disabled={loading}
      >
        {loading ? "게시 중..." : "트윗 게시"}
      </button>
    </div>
  );
}
``



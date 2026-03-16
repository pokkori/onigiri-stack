"use client";
import dynamic from "next/dynamic";
import Link from "next/link";

const GameCanvas = dynamic(() => import("@/components/GameCanvas"), { ssr: false });

export default function GamePage() {
  return (
    <div className="min-h-screen bg-gray-950">
      <GameCanvas />
      <div className="flex justify-center gap-4 py-3 text-xs text-gray-600">
        <Link href="/">ホーム</Link>
        <Link href="/legal">特定商取引法</Link>
        <Link href="/privacy">プライバシー</Link>
      </div>
    </div>
  );
}
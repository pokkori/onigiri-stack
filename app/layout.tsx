import type { Metadata } from "next";
import "./globals.css";
import OrbBackground from "@/components/OrbBackground";

const SITE_URL = "https://onigiri-stack.vercel.app";

export const metadata: Metadata = {
  title: "おにぎりスタック - おにぎりを積んで合体！",
  description:
    "おにぎりを積んで合体させてハイスコアを狙え！スイカゲームのように中毒性のある落下系パズルゲーム",
  keywords: ["おにぎりスタック", "落下パズル", "スイカゲーム", "ブラウザゲーム", "無料ゲーム"],
  metadataBase: new URL(SITE_URL),
  icons: {
    icon: "data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 64 64%22><path d=%22M32 6L8 44c0 8 10 14 24 14s24-6 24-14L32 6z%22 fill=%22%23f59e0b%22/><rect x=%2212%22 y=%2238%22 width=%2240%22 height=%2214%22 rx=%224%22 fill=%22%231a1a2e%22 opacity=%220.7%22/></svg>",
  },
  openGraph: {
    title: "おにぎりスタック - おにぎりを積んで合体！",
    description:
      "おにぎりを積んで合体させてハイスコアを狙え！中毒性のある落下系パズルゲーム",
    type: "website",
    url: SITE_URL,
    siteName: "おにぎりスタック",
    locale: "ja_JP",
  },
  twitter: {
    card: "summary_large_image",
    title: "おにぎりスタック - おにぎりを積んで合体！",
    description: "おにぎりを積んで合体させてハイスコアを狙え！中毒性のある落下系パズルゲーム",
  },
};


const _faqLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "このゲームは無料で遊べますか？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "はい、基本プレイは完全無料でお楽しみいただけます。ブラウザから即座にプレイ開始できます。"
      }
    },
    {
      "@type": "Question",
      "name": "スマートフォンでも遊べますか？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "はい、スマートフォン・タブレット・PCすべてに対応しています。ブラウザからそのままプレイできます。"
      }
    },
    {
      "@type": "Question",
      "name": "アプリのダウンロードは必要ですか？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "ダウンロード不要です。ブラウザを開いてアクセスするだけですぐに遊べます。"
      }
    }
  ]
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(_faqLd) }}
        />

        <link rel="manifest" href="/manifest.json" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="theme-color" content="#0a0a0a" />
      </head>
      <body>
        <OrbBackground theme="game" />
        <div style={{ position: "relative", zIndex: 1 }}>{children}</div>
      </body>
    </html>
  );
}

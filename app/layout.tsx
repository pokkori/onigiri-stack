import type { Metadata } from "next";
import "./globals.css";

const SITE_URL = "https://onigiri-stack.vercel.app";

export const metadata: Metadata = {
  title: "おにぎりスタック - おにぎりを積んで合体！",
  description:
    "おにぎりを積んで合体させてハイスコアを狙え！スイカゲームのように中毒性のある落下系パズルゲーム",
  keywords: ["おにぎりスタック", "落下パズル", "スイカゲーム", "ブラウザゲーム", "無料ゲーム"],
  metadataBase: new URL(SITE_URL),
  icons: {
    icon: "data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🍙</text></svg>",
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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body>{children}</body>
    </html>
  );
}

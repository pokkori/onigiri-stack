import Link from "next/link";
import { ITEMS } from "@/lib/items";

/* ---------- Inline SVG icons ---------- */
function OnigiriIcon({ size = 48, color = "#f59e0b" }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" aria-hidden="true">
      <path d="M32 6L8 44c0 8 10 14 24 14s24-6 24-14L32 6z" fill={color} />
      <rect x="12" y="38" width="40" height="14" rx="4" fill="#1a1a2e" opacity={0.7} />
      <ellipse cx="24" cy="30" rx="2" ry="2" fill="#1a1a2e" opacity={0.4} />
      <ellipse cx="38" cy="32" rx="1.5" ry="1.5" fill="#1a1a2e" opacity={0.3} />
    </svg>
  );
}

function TapIcon() {
  return (
    <svg width={28} height={28} viewBox="0 0 28 28" fill="none" aria-hidden="true">
      <circle cx="14" cy="10" r="5" stroke="#f59e0b" strokeWidth="2" fill="none" />
      <path d="M14 15v8" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" />
      <path d="M10 20l4 4 4-4" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function MergeIcon() {
  return (
    <svg width={28} height={28} viewBox="0 0 28 28" fill="none" aria-hidden="true">
      <circle cx="9" cy="14" r="5" stroke="#22c55e" strokeWidth="2" fill="none" />
      <circle cx="19" cy="14" r="5" stroke="#22c55e" strokeWidth="2" fill="none" />
      <path d="M14 9v10" stroke="#22c55e" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function ScoreUpIcon() {
  return (
    <svg width={28} height={28} viewBox="0 0 28 28" fill="none" aria-hidden="true">
      <path d="M14 4l4 8H10l4-8z" fill="#FFD93D" />
      <rect x="12" y="12" width="4" height="12" rx="1" fill="#FFD93D" />
    </svg>
  );
}

function WarningIcon() {
  return (
    <svg width={28} height={28} viewBox="0 0 28 28" fill="none" aria-hidden="true">
      <path d="M14 3L2 25h24L14 3z" stroke="#FF4444" strokeWidth="2" fill="none" />
      <line x1="14" y1="11" x2="14" y2="18" stroke="#FF4444" strokeWidth="2" strokeLinecap="round" />
      <circle cx="14" cy="22" r="1.2" fill="#FF4444" />
    </svg>
  );
}

/* ---------- Particle field (decorative) ---------- */
function ParticleField() {
  const particles = [
    { top: "12%", left: "8%", size: 4, delay: "0s", dur: "6s", color: "rgba(245,158,11,0.4)" },
    { top: "25%", left: "85%", size: 6, delay: "1s", dur: "7s", color: "rgba(34,197,94,0.35)" },
    { top: "45%", left: "15%", size: 3, delay: "2s", dur: "5s", color: "rgba(255,217,61,0.45)" },
    { top: "60%", left: "78%", size: 5, delay: "0.5s", dur: "8s", color: "rgba(238,90,36,0.3)" },
    { top: "75%", left: "50%", size: 4, delay: "3s", dur: "6s", color: "rgba(99,179,237,0.3)" },
    { top: "18%", left: "55%", size: 3, delay: "1.5s", dur: "7s", color: "rgba(245,158,11,0.35)" },
    { top: "88%", left: "25%", size: 5, delay: "2.5s", dur: "5.5s", color: "rgba(34,197,94,0.3)" },
    { top: "35%", left: "92%", size: 4, delay: "4s", dur: "6.5s", color: "rgba(255,217,61,0.3)" },
  ];
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
      {particles.map((p, i) => (
        <div
          key={i}
          className="absolute rounded-full"
          style={{
            top: p.top,
            left: p.left,
            width: p.size,
            height: p.size,
            backgroundColor: p.color,
            animation: `floatParticle ${p.dur} ${p.delay} ease-in-out infinite`,
          }}
        />
      ))}
      <style>{`
        @keyframes floatParticle {
          0%, 100% { transform: translateY(0) scale(1); opacity: 0.6; }
          50% { transform: translateY(-20px) scale(1.5); opacity: 1; }
        }
      `}</style>
    </div>
  );
}

/* ---------- Rule icons map ---------- */
const RULE_ICONS = [<TapIcon key="tap" />, <MergeIcon key="merge" />, <ScoreUpIcon key="score" />, <WarningIcon key="warn" />];

export default function HomePage() {
  return (
    <div
      className="min-h-screen text-gray-100"
      role="main"
      aria-label="おにぎりスタック ホーム"
      style={{
        background:
          "radial-gradient(ellipse at 20% 50%, rgba(120,119,198,0.15) 0%, transparent 50%), radial-gradient(ellipse at 80% 20%, rgba(255,119,198,0.1) 0%, transparent 50%), radial-gradient(ellipse at 50% 80%, rgba(99,179,237,0.1) 0%, transparent 50%), #0F0F1A",
      }}
    >
      <ParticleField />

      {/* Hero */}
      <section
        className="flex flex-col items-center justify-center min-h-screen px-4 text-center relative overflow-hidden"
        aria-label="ヒーローセクション"
      >
        <div className="mb-6">
          <OnigiriIcon size={80} color="#f59e0b" />
        </div>
        <div
          className="text-5xl font-black mb-2 tracking-tight"
          aria-hidden="true"
          style={{
            background: "linear-gradient(135deg, #FFD93D, #f59e0b, #EE5A24)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            filter: "drop-shadow(0 0 20px rgba(255,217,61,0.3))",
          }}
        >
          ONIGIRI
        </div>
        <h1
          className="text-4xl font-black mb-2 tracking-tight"
          style={{
            background: "linear-gradient(135deg, #FFD93D, #FF6B6B, #EE5A24)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            filter: "drop-shadow(0 0 20px rgba(255,217,61,0.3))",
          }}
        >
          おにぎりスタック
        </h1>
        <p className="text-lg text-gray-300 mb-2 max-w-xs">おにぎりを積んで、合体させて、</p>
        <p className="text-2xl font-bold mb-8" style={{ color: "#22c55e" }}>
          ハイスコアを狙え!
        </p>
        <Link
          href="/game"
          className="px-10 py-4 rounded-2xl text-xl font-black text-white min-h-[52px] transition-all duration-200 hover:-translate-y-0.5 active:scale-[0.97]"
          aria-label="おにぎりスタックゲームを今すぐプレイする"
          style={{
            background: "linear-gradient(135deg, #FF6B6B 0%, #EE5A24 100%)",
            boxShadow: "0 0 20px rgba(238,90,36,0.4)",
          }}
        >
          今すぐ遊ぶ
        </Link>
        <p className="mt-4 text-gray-500 text-sm">無料 -- ブラウザで即プレイ</p>
      </section>

      {/* Rules */}
      <section className="px-6 py-16 max-w-lg mx-auto">
        <h2
          className="text-2xl font-bold text-center mb-8"
          style={{
            background: "linear-gradient(135deg, #FFD93D, #f59e0b)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          あそびかた
        </h2>
        <div className="space-y-4">
          {[
            { title: "タップで落とす", desc: "画面をタップすると、おにぎりが落下します。タップ位置で左右を調整!" },
            { title: "同じおにぎりを合体", desc: "同じ種類のおにぎりが触れると合体して、より大きなおにぎりに進化!" },
            { title: "スコアを積み上げろ", desc: "合体するほど高得点。神おにぎりを目指して積み上げよう!" },
            { title: "ゲームオーバーに注意", desc: "赤いラインを超えたまま2.5秒経過するとゲームオーバー!" },
          ].map((r, i) => (
            <div
              key={i}
              className="flex items-start gap-4 p-4 rounded-[20px]"
              style={{
                background: "rgba(255,255,255,0.03)",
                backdropFilter: "blur(16px)",
                border: "1px solid rgba(255,255,255,0.08)",
              }}
            >
              <div className="flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center" style={{ background: "rgba(255,255,255,0.05)" }}>
                {RULE_ICONS[i]}
              </div>
              <div>
                <div className="font-bold text-white">{r.title}</div>
                <div className="text-gray-400 text-sm mt-1">{r.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Evolution Table */}
      <section className="px-6 py-12 max-w-lg mx-auto">
        <h2
          className="text-2xl font-bold text-center mb-8"
          style={{
            background: "linear-gradient(135deg, #22c55e, #10b981)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          進化表 -- 10段階
        </h2>
        <div className="space-y-2">
          {ITEMS.map((item, i) => (
            <div
              key={item.level}
              className="flex items-center gap-4 p-3 rounded-[20px]"
              style={{
                background: "rgba(255,255,255,0.03)",
                backdropFilter: "blur(16px)",
                border: `1px solid ${item.color}44`,
              }}
            >
              <div className="flex-shrink-0">
                <OnigiriIcon size={36} color={item.color} />
              </div>
              <div className="flex-1">
                <div className="font-bold text-white text-sm">{item.name}</div>
                <div className="text-gray-400 text-xs">
                  Lv.{item.level} -- +{item.score}点
                </div>
              </div>
              {i < ITEMS.length - 1 && (
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <path d="M4 8h8M9 5l3 3-3 3" stroke="#666" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="flex flex-col items-center py-16 px-4">
        <h2 className="text-2xl font-bold mb-6 text-white">神おにぎりを目指せ!</h2>
        <Link
          href="/game"
          className="px-12 py-5 rounded-2xl text-2xl font-black text-white min-h-[52px] transition-all duration-200 hover:-translate-y-0.5 active:scale-[0.97]"
          aria-label="おにぎりスタックのゲームをプレイスタートする"
          style={{
            background: "linear-gradient(135deg, #FF6B6B 0%, #EE5A24 100%)",
            boxShadow: "0 0 20px rgba(238,90,36,0.4)",
          }}
        >
          プレイスタート
        </Link>
      </section>

      {/* Footer */}
      <footer className="text-center py-8 text-gray-500 text-xs border-t border-gray-800/50">
        <div className="flex justify-center gap-4 mb-2">
          <Link href="/legal" className="hover:text-gray-300 min-h-[44px] flex items-center">
            特定商取引法に基づく表示
          </Link>
          <Link href="/privacy" className="hover:text-gray-300 min-h-[44px] flex items-center">
            プライバシーポリシー
          </Link>
        </div>
        <p>(C) 2026 ポッコリラボ</p>
      </footer>
    </div>
  );
}

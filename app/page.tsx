import Link from "next/link";
import { ITEMS } from "@/lib/items";

export default function HomePage() {
  return (
    <div className="min-h-screen text-gray-100" style={{background:"linear-gradient(180deg,#0a0a0a 0%,#111827 100%)"}}>

      {/* Hero */}
      <section className="flex flex-col items-center justify-center min-h-screen px-4 text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-5" style={{backgroundImage:"repeating-linear-gradient(0deg,transparent,transparent 40px,#f59e0b44 40px,#f59e0b44 41px),repeating-linear-gradient(90deg,transparent,transparent 40px,#f59e0b44 40px,#f59e0b44 41px)"}} />
        <div className="text-8xl mb-4">🍙</div>
        <h1 className="text-4xl font-black mb-2 tracking-tight">
          <span style={{color:"#f59e0b"}}>おにぎり</span>スタック
        </h1>
        <p className="text-lg text-gray-300 mb-2 max-w-xs">
          おにぎりを積んで、合体させて、
        </p>
        <p className="text-2xl font-bold mb-8" style={{color:"#22c55e"}}>
          ハイスコアを狙え！
        </p>
        <Link
          href="/game"
          className="px-10 py-4 rounded-2xl text-xl font-black text-black glow-pulse"
          style={{backgroundColor:"#f59e0b",boxShadow:"0 0 30px #f59e0b66"}}
        >
          今すぐ遊ぶ 🎮
        </Link>
        <p className="mt-4 text-gray-500 text-sm">無料 · ブラウザで即プレイ</p>
      </section>

      {/* Rules */}
      <section className="px-6 py-16 max-w-lg mx-auto">
        <h2 className="text-2xl font-bold text-center mb-8" style={{color:"#f59e0b"}}>あそびかた</h2>
        <div className="space-y-6">
          {[
            { icon:"👆", title:"タップで落とす", desc:"画面をタップすると、おにぎりが落下します。タップ位置で左右を調整！" },
            { icon:"🤝", title:"同じおにぎりを合体", desc:"同じ種類のおにぎりが触れると合体して、より大きなおにぎりに進化！" },
            { icon:"📈", title:"スコアを積み上げろ", desc:"合体するほど高得点。神おにぎりを目指して積み上げよう！" },
            { icon:"⚠️", title:"ゲームオーバーに注意", desc:"赤いラインを超えたまま2.5秒経過するとゲームオーバー！" },
          ].map((r,i) => (
            <div key={i} className="flex items-start gap-4 p-4 rounded-xl" style={{backgroundColor:"#ffffff0a",border:"1px solid #ffffff11"}}>
              <div className="text-3xl">{r.icon}</div>
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
        <h2 className="text-2xl font-bold text-center mb-8" style={{color:"#22c55e"}}>進化表 — 10段階</h2>
        <div className="space-y-2">
          {ITEMS.map((item, i) => (
            <div key={item.level} className="flex items-center gap-4 p-3 rounded-xl" style={{backgroundColor:item.color+"18",border:"1px solid "+item.color+"44"}}>
              <div className="text-3xl w-10 text-center">{item.emoji}</div>
              <div className="flex-1">
                <div className="font-bold text-white text-sm">{item.name}</div>
                <div className="text-gray-400 text-xs">Lv.{item.level} · +{item.score}点</div>
              </div>
              {i < ITEMS.length-1 && <div className="text-gray-600 text-xl">→</div>}
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="flex flex-col items-center py-16 px-4">
        <h2 className="text-2xl font-bold mb-6 text-white">神おにぎりを目指せ！</h2>
        <Link
          href="/game"
          className="px-12 py-5 rounded-2xl text-2xl font-black text-black"
          style={{backgroundColor:"#f59e0b",boxShadow:"0 0 40px #f59e0b88"}}
        >
          プレイスタート 🍙
        </Link>
      </section>

      {/* Footer */}
      <footer className="text-center py-8 text-gray-600 text-xs border-t border-gray-800">
        <div className="flex justify-center gap-4 mb-2">
          <Link href="/legal" className="hover:text-gray-400">特定商取引法に基づく表示</Link>
          <Link href="/privacy" className="hover:text-gray-400">プライバシーポリシー</Link>
        </div>
        <p>© 2026 ポッコリラボ</p>
      </footer>
    </div>
  );
}
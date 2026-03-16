export default function LegalPage() {
  return (
    <div className="min-h-screen bg-gray-950 text-gray-200 p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-amber-400">特定商取引法に基づく表示</h1>
      <table className="w-full text-sm border-collapse">
        <tbody>
          {[
            ["販売事業者","ポッコリラボ"],
            ["運営責任者","新美"],
            ["所在地","〒475-0077 愛知県半田市元山町"],
            ["お問い合わせ","X(Twitter): @levona_design へのDM"],
            ["販売価格","無料（本アプリは現在無料でご利用いただけます）"],
            ["支払方法","無料のためお支払いは不要です"],
            ["提供時期","お申し込み後、即時提供"],
          ].map(([k,v])=>(
            <tr key={k} className="border-b border-gray-800">
              <td className="py-3 pr-4 text-gray-400 font-medium whitespace-nowrap">{k}</td>
              <td className="py-3">{v}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <p className="mt-6 text-gray-500 text-xs">本ゲームはブラウザで遊べる無料ゲームです。</p>
    </div>
  );
}
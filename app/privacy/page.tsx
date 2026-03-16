export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gray-950 text-gray-200 p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-amber-400">プライバシーポリシー</h1>
      <div className="space-y-6 text-sm text-gray-300">
        <section>
          <h2 className="font-bold text-white mb-2">収集する情報</h2>
          <p>本アプリはお客様の個人情報を収集しません。ハイスコアはお使いのデバイスのlocalStorageにのみ保存されます。</p>
        </section>
        <section>
          <h2 className="font-bold text-white mb-2">アクセス解析</h2>
          <p>サービス改善のためアクセス解析ツールを使用することがあります。これによりCookieを通じて匿名の利用情報が収集される場合があります。</p>
        </section>
        <section>
          <h2 className="font-bold text-white mb-2">お問い合わせ</h2>
          <p>X(Twitter): @levona_design へのDM</p>
        </section>
        <p className="text-gray-500 text-xs">2026年3月16日 制定 — ポッコリラボ</p>
      </div>
    </div>
  );
}
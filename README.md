# Flourb（フルーブ）公式サイト（静的1ページ）

名古屋・伏見のハーブピーリング専門サロン向けのシンプルなランディングページです。

## 公開前に必ず直す箇所

1. **`index.html`**
   - `YOUR-DOMAIN.example` → 実際のドメイン（`https://...`）
   - `canonical` / `og:url` / JSON-LD の `url` / `@id`
   - `YOUR_LINE_URL` → LINE公式の「友だち追加」URL
   - 料金表記（税込・税別など店舗ルールに合わせる）
   - `og-image.jpg` を用意するか、`image` を削除／差し替え
2. **電話番号を掲載する場合**  
   JSON-LD に `"telephone": "+81-XX-XXXX-XXXX"` を追加し、フッターや問い合わせ欄にも記載

## ローカルで確認

```bash
cd /Users/kawabetatsuya/Projects/flourb-nagoya-salon-site
python3 -m http.server 8080
```

ブラウザで `http://localhost:8080` を開く。

## 無料でホスティングする例

- **Cloudflare Pages / Netlify / Vercel**: このフォルダをそのままデプロイ（ビルド不要）
- **GitHub Pages**: リポジトリのルートに `index.html` がある状態で公開

公開後、**Googleビジネスプロフィールの「ウェブサイト」**にそのURLを登録し、**Google Search Console**でプロパティ追加すると検索側の把握が早まります。

## 同梱ファイル

- `marketing/gbp-copy.md` … GBP貼り付け用文案・Q&A・レビュー依頼文

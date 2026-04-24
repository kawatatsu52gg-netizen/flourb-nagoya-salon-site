# Flourb（フルーブ）ランディングページ

名古屋・伏見のハーブピーリング専門サロン向け。**教育コンテンツ（ハーブピーリングとは・対象・流れ）** → **LINE / Square 予約** の導線です。ミニモへのリンクはありません。

## Notion（Cursor MCP）

このリポジトリの **`.cursor/mcp.json`** に、Notion 公式のリモート MCP（`https://mcp.notion.com/mcp`）を入れてあります。

1. **Cursor を一度リロード**（ウィンドウの再読み込み）するか、プロジェクトを開き直す。
2. **Cursor Settings → MCP** で `notion` が一覧に出ているか確認する。
3. **初めて Notion 系のツールを使うとき**、ブラウザで **Notion の OAuth（ログイン・許可）** が求められたら、そのまま完了させる。
4. 他のプロジェクトでも使いたい場合は、同じ JSON を **`~/.cursor/mcp.json`** にコピーする（グローバル設定）。

公式の案内: [Connecting to Notion MCP](https://developers.notion.com/docs/get-started-with-mcp)

## 公開前に必ず直す箇所

### URLの置換（`index.html` 内の複数箇所）

| プレースホルダー | 差し替え先の例 |
|------------------|----------------|
| 本番URL | **設定済み** `https://flourb.com`（canonical / OG / JSON-LD / robots / sitemap） |
| LINE友だち追加 | **設定済み**（`https://lin.ee/MvZoH1V`） |
| Square予約URL | **設定済み**（`index.html` 内の Square リンク）。差し替える場合は Square ダッシュボードの予約ページURLを使用 |

Squareの予約ページは [Square：ネット予約・予約ページ](https://squareup.com/jp/ja/appointments/features/online-booking-website) の案内どおり、ダッシュボードから発行します（プラン・手数料は公式を確認）。

### その他

- `og-image.jpg` を置くか、JSON-LD の `image` を差し替え／削除
- 電話を出す場合は JSON-LD に `"telephone": "+81-..."` を追加し、必要なら本文にも記載

## 導線の考え方（調査メモ）

- **LINE**: 相談・信頼形成に向く。リッチメニューに「予約（Squareへ）」「アクセス」「公式サイト」を並べる構成が美容サロンでは一般的です。
- **Square**: 24時間・カレンダー選びのわかりやすさ。LPからは **「ネット予約はこちら」** で直リンクするのがシンプルです。
- 両方を並べる場合、**LINE＝相談・初回層 / Square＝日程確定したい層** に分けると運用しやすいです（どちらを主ボタンにするかは店の運用に合わせて `index.html` のボタン順を入れ替えてOKです）。

## ローカルで確認

```bash
cd ~/Projects/flourb-nagoya-salon-site
python3 -m http.server 8080
```

`http://localhost:8080` を開く。

## ドメインとサイト公開（ここが分かりにくいところ）

### 先に知っておくこと

- **ドメイン（例: `flourb.jp`）を取る＝レンタル**です。年払いが一般的で、**クレジットカード等であなた本人が登録・支払い**します。
- こちらから **あなたの代わりにドメイン契約や決済を実行することはできません**（本人確認と支払いが必要なため）。
- ただし **独自ドメインなしでも、無料のURLで今日から公開**できます（下の A）。あとからドメインを足す流れがいちばん失敗しにくいです。

### A. まず無料のURLだけで公開する（おすすめ・独自ドメインは後回し）

1. 無料で [Cloudflare](https://www.cloudflare.com/) にアカウントを作る。
2. ダッシュボードの **Workers & Pages** → **Pages** → **Create**。
3. **Upload assets** を選び、このプロジェクトのフォルダ（`index.html` がある階層）を ZIP にしてアップロードするか、**GitHub にリポジトリを作って連携**する。
4. プロジェクト名を例: `flourb-nagoya` にすると、公開URLは **`https://flourb-nagoya.pages.dev`** のようになります（空いている名前にする）。
5. ブラウザで表示を確認できたら、**GBP（Googleビジネス）のウェブサイト欄にこのURL**を入れてよいです。

独自ドメインを使わず **pages.dev だけで試す**場合は、`index.html` などの `https://flourb.com` をその **一時URL** に差し替えてください。

### B. 独自ドメインを取る（例: `flourb.jp` や `flourb.com`）

1. **レジストラ**（ドメイン販売店）で空き状況を検索して購入する。例:
   - [ムームードメイン](https://muumuu-domain.com/)（国内でよく使われる）
   - [お名前.com](https://www.onamae.com/)
   - [Cloudflare Registrar](https://www.cloudflare.com/products/registrar/)（原価に近い料金のことが多い。DNSも同じ画面で管理しやすい）
2. 希望名が埋まっていたら、`flourb-salon.jp` のように別案を試す。
3. **`.jp` は取得条件や審査の説明がレジストラにあります**（個人・法人どちらで取るかなど）。画面の指示に従ってください。
4. 支払いまで完了すると、そのドメインの **DNS設定**ができるようになります。

### C. 独自ドメインを Cloudflare Pages にくっつける（A のあと）

1. Cloudflare Pages の該当プロジェクト → **Custom domains** → ドメインを追加。
2. 表示される **DNSの指示**（CNAME など）を、ドメインを買った場所のDNS画面にそのまま入れる。  
   - ドメインも Cloudflare で買っている場合は、画面の案内が一番スムーズです。
3. SSLが有効になったら（数分〜）、`https://あなたのドメイン/` で開けることを確認。
4. リポジトリ内の本番URL（`https://flourb.com`）が DNS と一致しているか確認（canonical・OG・JSON-LD・`robots.txt`・`sitemap.xml`）。

### 公開後にやること（SEO用）

- Googleビジネスプロフィールの **ウェブサイト** に本番URLを登録。
- [Google Search Console](https://search.google.com/search-console) にそのURLを追加し、必要ならサイトマップ `https://本番URL/sitemap.xml` を登録。

## デプロイ（要約）

このフォルダは **ビルド不要の静的サイト**です。Cloudflare Pages / Netlify / Vercel のどれでも「フォルダごと」デプロイ可能。手順の詳細は上の **A〜C** を参照。

## AI診断機能の環境変数

AI診断（`/diagnosis`）でClaude APIを使うため、以下の環境変数が必要です。

- `ANTHROPIC_API_KEY`

ローカルでは `.env.local` に設定してください。  
Cloudflare Pages にデプロイする際は、**Production / Preview の両方**で同名の環境変数を設定してください。

## 同梱

- `marketing/gbp-copy.md` … GBP貼り付け用文案

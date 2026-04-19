# Flourb（フルーブ）ランディングページ

名古屋・伏見のハーブピーリング専門サロン向け。**教育コンテンツ（ハーブピーリングとは・対象・流れ）** → **LINE / Square 予約** の導線です。ミニモへのリンクはありません。

## 公開前に必ず直す箇所

### URLの置換（`index.html` 内の複数箇所）

| プレースホルダー | 差し替え先の例 |
|------------------|----------------|
| `YOUR-DOMAIN.example` | 取得したドメイン（`https://...`）— canonical / og / JSON-LD / robots / sitemap も同じ |
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

## デプロイ

Cloudflare Pages / Netlify / Vercel などにこのフォルダをそのままデプロイ（ビルド不要）。公開後、GoogleビジネスプロフィールのウェブサイトにURLを登録し、Search Console でプロパティ追加。

## 同梱

- `marketing/gbp-copy.md` … GBP貼り付け用文案

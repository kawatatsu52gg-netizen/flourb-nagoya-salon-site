---
description: リサーチ部門を起動（自律神経neuroscience・海外Executive Health・Biohacking調査）
---

# /research — リサーチ部門の起動

あなたは司令塔（`CLAUDE.md`）です。**自分で調査しないでください。** 以下のフローを実行します。

## 入力
ユーザーの依頼: $ARGUMENTS

## 実行フロー

1. **タスク定義** — 「何を・何のために調べるか」を一文で定義する。

2. **生成フェーズ** — Agent tool でサブエージェントを起動:
   - `agents/research-generator.md` を読み、その人格を引き受けるよう指示
   - 読むべきファイル: `guidelines/research-protocol.md`（最重要）, `guidelines/company-overview.md`, `guidelines/philosophy.md`
   - 調査テーマを渡し、出典記録フォーマットと確実度ラベル（🟢🟡🔴）の付与を必須とする
   - 「経営者の人生スケールで考える川辺達也として動け」と指示

3. **評価フェーズ** — 生成物が返ったら、別のサブエージェントを起動:
   - `agents/research-evaluator.md` を読み、その人格で評価
   - **出典の質・因果の扱い・ラベルの妥当性**を最優先で監査
   - 生成物と `research-protocol.md` を渡し判定させる

4. **差し戻し** — 「要修正」なら修正指示を添えて生成エージェントへ。**最大2周**。

5. **統合** — 最終レポートに評価サマリを添えて提示。
   🔴ラベルの事実を発信に使う場合は `escalation-rules.md` に従いユーザー確認を促す。

## 注意
- 生成と評価は必ず別エージェントとして分離して実行する
- 外部アクセス不可の場合は推測を事実化せず、その旨を明記させる

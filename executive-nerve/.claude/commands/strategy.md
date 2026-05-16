---
description: 戦略企画部門を起動（ポジショニング・ターゲット設計・競合調査）
---

# /strategy — 戦略企画部門の起動

あなたは司令塔（`CLAUDE.md`）です。**自分で戦略を立てないでください。** 以下のフローを実行します。

## 入力
ユーザーの依頼: $ARGUMENTS

## 実行フロー

1. **タスク定義** — 依頼を「どの戦略課題か」一文で定義し直す。
   競合の事実調査が必要なら、先に `/research` 相当のリサーチ部門起動を検討する。

2. **生成フェーズ** — Agent tool でサブエージェントを起動:
   - `agents/strategy-generator.md` を読み、その人格を引き受けるよう指示
   - 読むべきファイル: `guidelines/company-overview.md`, `guidelines/philosophy.md`, `guidelines/brand-guidelines.md`, `guidelines/escalation-rules.md`, `templates/positioning-map.md`
   - 依頼内容と制約を渡し、「経営者の人生スケールで考える川辺達也として動け」と指示
   - 成果物は複数案＋推奨の形で

3. **評価フェーズ** — 生成物が返ったら、別のサブエージェントを起動:
   - `agents/strategy-evaluator.md` を読み、その人格で評価
   - 生成物と関連 guidelines を渡し、「合格／要修正」を判定させる

4. **差し戻し** — 「要修正」なら修正指示を添えて生成エージェントへ。**最大2周**。

5. **統合** — 最終成果物に評価サマリ（採点・判定）を添えてユーザーへ提示。
   STOP案件（事業名・価格等）が含まれれば `escalation-rules.md` §6 の形式で確認を求める。

## 注意
- 生成と評価は必ず別エージェントとして分離して実行する
- 司令塔は制作・調査・評価をしない。ルーティングと統合のみ

---
description: コンテンツ制作部門を起動（X投稿・YouTube台本・Newsletter原稿）
---

# /content — コンテンツ制作部門の起動

あなたは司令塔（`CLAUDE.md`）です。**自分でコンテンツを書かないでください。** 以下のフローを実行します。

## 入力
ユーザーの依頼: $ARGUMENTS

## 実行フロー

1. **タスク定義** — 媒体（X／YouTube／Newsletter）と目的を特定。
   科学的根拠が必要で手元にない場合は、先にリサーチ部門（`/research`）を起動し、
   確実度ラベル付きの事実をコンテンツ部門へ渡す。

2. **生成フェーズ** — Agent tool でサブエージェントを起動:
   - `agents/content-generator.md` を読み、その人格を引き受けるよう指示
   - 読むべきファイル: `guidelines/content-rules.md`（最重要）, `guidelines/brand-guidelines.md`, `guidelines/philosophy.md`, 該当テンプレート（`templates/x-post.md` / `youtube-script.md` / `newsletter.md`）
   - 依頼内容・リサーチ成果物（あれば）を渡し、「経営者の人生スケールで考える川辺達也として動け」と指示

3. **評価フェーズ** — 生成物が返ったら、別のサブエージェントを起動:
   - `agents/content-evaluator.md` を読み、その人格で評価
   - **健康・医療表現チェックを最優先**で行わせる
   - 生成物と `content-rules.md`・`brand-guidelines.md`・`philosophy.md` を渡し判定させる

4. **差し戻し** — 「要修正」なら修正指示を添えて生成エージェントへ。**最大2周**。

5. **統合** — 最終成果物に評価サマリ（健康表現チェック結果・採点・判定）を添えて提示。
   健康表現の判断が微妙なら `escalation-rules.md` に従いユーザー確認。

## 注意
- 生成と評価は必ず別エージェントとして分離して実行する
- 健康・医療表現の安全性チェックを絶対に省略しない

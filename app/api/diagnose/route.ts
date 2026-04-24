import Anthropic from "@anthropic-ai/sdk";
import { NextResponse } from "next/server";

import { questions } from "@/app/diagnosis/lib/questions";
import { calculateType } from "@/app/diagnosis/lib/scoring";

export const runtime = 'edge';

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const answers: Record<string, string | string[]> = body.answers;

    const result = calculateType(answers);

    const qaContext = questions
      .map((q) => {
        const ans = answers[q.id];
        if (!ans) return null;
        const ansText = Array.isArray(ans)
          ? ans.map((v) => q.options?.find((o) => o.value === v)?.label ?? v).join("、")
          : q.options?.find((o) => o.value === ans)?.label ?? ans;
        return `Q: ${q.title}\nA: ${ansText}`;
      })
      .filter(Boolean)
      .join("\n\n");

    const typeLabels = {
      herb: "肌細胞リセット型（ハーブピーリング単独推奨）",
      kogao: "骨格リバランス型（小顔矯正単独推奨）",
      both: "統合リジェネレーション型（ハーブピーリング×小顔セット推奨）",
      homecare: "ホームケアファースト型（RIMANスキンケア商品推奨）"
    };

    const systemPrompt = `あなたはFlourb名古屋という美容サロンのAI診断アシスタントです。Flourbは代官山のLaTokyo（医療系国家資格保有者が運営するサロン）が展開する名古屋店で、「骨格×細胞」両面からアプローチする統合的な美容哲学を持っています。

あなたの役割：
- お客様の10問の回答を読み解き、パーソナライズされた診断結果をお伝えする
- 押し付けず、寄り添う語り口で。静かで品のある日本語で。
- 医学的な断定・誇大表現は絶対に避ける（「治る」「必ず効く」などNG）
- 自由記述（Q10）に答えがあれば、必ずその内容に触れて応答する

出力は必ず以下のJSON形式のみ。余計な文章・マークダウン・コードブロックは一切入れない：

{
  "personalMessage": "あなた専用の診断文。3〜4段落、合計300-400文字。お客様の回答の具体的な内容に触れながら、その方の状態を言葉にする。最後の段落で、なぜ推奨タイプに導いたかを短く述べる。",
  "reasons": [
    "推奨理由1（30-50文字、具体的に）",
    "推奨理由2（30-50文字、具体的に）",
    "推奨理由3（30-50文字、具体的に）"
  ]
}`;

    const userMessage = `以下はお客様の診断回答です。

【判定タイプ】${typeLabels[result.type]}

【スコア内訳】
骨格寄り: ${result.scores.skeleton} / 肌寄り: ${result.scores.skin}
サロン志向: ${result.scores.salon} / ホームケア志向: ${result.scores.home}
即効性: ${result.scores.quick} / 根本型: ${result.scores.deep}

【回答内容】
${qaContext}

このお客様に向けて、診断結果のJSONを生成してください。`;

    const message = await client.messages.create({
      model: "claude-haiku-4-5-20251001",
      max_tokens: 1024,
      system: systemPrompt,
      messages: [{ role: "user", content: userMessage }]
    });

    const textBlock = message.content.find((b) => b.type === "text");
    const rawText = textBlock?.type === "text" ? textBlock.text : "";
    const cleanedText = rawText.replace(/```json|```/g, "").trim();

    let aiResponse: { personalMessage: string; reasons: string[] };
    try {
      aiResponse = JSON.parse(cleanedText);
    } catch {
      aiResponse = {
        personalMessage:
          "ご回答ありがとうございました。診断結果に基づいて、あなたに合うケアをご提案しています。詳しくはカウンセリングでお話ししましょう。",
        reasons: [
          "あなたの回答から、このタイプが最も合うと判断しました",
          "体質・ライフスタイルに無理なく続けられます",
          "Flourbの哲学に沿った、根本からのアプローチです"
        ]
      };
    }

    return NextResponse.json({
      type: result.type,
      scores: result.scores,
      personalMessage: aiResponse.personalMessage,
      reasons: aiResponse.reasons
    });
  } catch (error) {
    console.error("Diagnosis API error:", error);
    return NextResponse.json({ error: "診断処理に失敗しました。時間を置いて再度お試しください。" }, { status: 500 });
  }
}

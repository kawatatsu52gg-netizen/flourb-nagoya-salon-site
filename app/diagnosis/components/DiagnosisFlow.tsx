"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

import { ProgressBar } from "@/app/diagnosis/components/ProgressBar";
import { QuestionCard } from "@/app/diagnosis/components/QuestionCard";
import { ResultCard } from "@/app/diagnosis/components/ResultCard";
import { questions } from "@/app/diagnosis/lib/questions";
import { calculateType, type DiagnosisType } from "@/app/diagnosis/lib/scoring";
import { Button } from "@/components/ui/button";

type Answers = Record<string, string | string[]>;

interface DiagnosisResponse {
  type: DiagnosisType;
  personalMessage: string;
  reasons: string[];
}

function buildFallbackResult(answers: Answers): DiagnosisResponse {
  const local = calculateType(answers);
  const fallbackMessage =
    "ご回答ありがとうございます。いまの状態に合う方向性を、回答内容から丁寧に読み解きました。診断は目安ですが、優先順位を整理して無理なく続けられる一歩を選ぶためのガイドになります。具体的な施術内容は、当日のカウンセリングで肌や輪郭の状態を確認しながら最終調整します。";
  return {
    type: local.type,
    personalMessage: fallbackMessage,
    reasons: [
      "回答された悩みの傾向から、優先すべきアプローチを判定しました",
      "継続しやすい頻度や予算感も踏まえ、無理のない提案に寄せています",
      "即効性と根本ケアのバランスを取り、再現性を重視しています"
    ]
  };
}

export function DiagnosisFlow() {
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<DiagnosisResponse | null>(null);

  const total = questions.length;
  const current = questions[index];

  const canNext = useMemo(() => {
    if (!current.required) return true;
    const value = answers[current.id];
    if (current.type === "multi") return Array.isArray(value) && value.length > 0;
    if (current.type === "text") return typeof value === "string" ? value.trim().length > 0 : false;
    return typeof value === "string" && value.length > 0;
  }, [answers, current]);

  function updateSingle(value: string) {
    setAnswers((prev) => ({ ...prev, [current.id]: value }));
    setError(null);
  }

  function updateMulti(value: string) {
    setAnswers((prev) => {
      const arr = Array.isArray(prev[current.id]) ? (prev[current.id] as string[]) : [];
      return {
        ...prev,
        [current.id]: arr.includes(value) ? arr.filter((v) => v !== value) : [...arr, value]
      };
    });
    setError(null);
  }

  function updateText(value: string) {
    setAnswers((prev) => ({ ...prev, [current.id]: value }));
    setError(null);
  }

  function goNext() {
    if (!canNext) {
      setError("この質問は回答が必要です。");
      return;
    }
    setError(null);
    setIndex((prev) => Math.min(prev + 1, total - 1));
  }

  function goBack() {
    setError(null);
    setIndex((prev) => Math.max(prev - 1, 0));
  }

  async function submitDiagnosis() {
    setIsLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/diagnose", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ answers })
      });
      if (!res.ok) throw new Error("API error");
      const json = (await res.json()) as DiagnosisResponse;
      setResult({
        type: json.type,
        personalMessage: json.personalMessage,
        reasons: json.reasons
      });
    } catch {
      setResult(buildFallbackResult(answers));
      setError("AI通信に失敗したため、回答内容から簡易診断を表示しています。");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-background py-14 md:py-20">
      <section className="section-shell mx-auto max-w-3xl space-y-8">
        <div className="flex items-center justify-between">
          <Link href="/" className="text-sm text-foreground/65 underline underline-offset-4">
            LPへ戻る
          </Link>
          <Link href="/#reserve" className="text-sm text-rose-700 underline underline-offset-4">
            先に予約する
          </Link>
        </div>

        {!result && (
          <>
            <ProgressBar current={index + 1} total={total} />

            <div className="transition-all duration-300 ease-out">
              <QuestionCard
                key={current.id}
                question={current}
                value={answers[current.id]}
                onSingleSelect={updateSingle}
                onMultiToggle={updateMulti}
                onTextChange={updateText}
              />
            </div>

            {error && <p className="text-sm text-rose-700">{error}</p>}

            {isLoading ? (
              <div className="glass-card p-8 text-center">
                <p className="text-sm tracking-[0.14em] text-rose-700">ANALYZING</p>
                <p className="mt-3 font-serif text-2xl">AIがあなたの回答を読み解いています...</p>
              </div>
            ) : (
              <div className="flex flex-wrap gap-3">
                <Button variant="secondary" size="lg" onClick={goBack} disabled={index === 0}>
                  前の質問へ
                </Button>
                {index < total - 1 ? (
                  <Button size="lg" onClick={goNext}>
                    次の質問へ
                  </Button>
                ) : (
                  <Button size="lg" onClick={submitDiagnosis}>
                    診断結果を見る
                  </Button>
                )}
              </div>
            )}
          </>
        )}

        {result && (
          <>
            {error && <p className="text-sm text-rose-700">{error}</p>}
            <ResultCard type={result.type} personalMessage={result.personalMessage} reasons={result.reasons} />
            <p className="text-xs text-foreground/55">※ ご入力いただいた内容は診断結果の生成にのみ使用され、当サロンでは保存しません。</p>
          </>
        )}
      </section>
    </main>
  );
}

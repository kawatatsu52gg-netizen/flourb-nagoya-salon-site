import { questions, type ScoreWeight } from "./questions";

export type DiagnosisType = "herb" | "kogao" | "both" | "homecare";

export interface ScoreResult {
  type: DiagnosisType;
  scores: Required<ScoreWeight>;
  rawAnswers: Record<string, string | string[]>;
}

export function calculateType(answers: Record<string, string | string[]>): ScoreResult {
  const scores: Required<ScoreWeight> = {
    skeleton: 0,
    skin: 0,
    salon: 0,
    home: 0,
    quick: 0,
    deep: 0
  };

  for (const q of questions) {
    const ans = answers[q.id];
    if (!ans || !q.options) continue;

    const selectedValues = Array.isArray(ans) ? ans : [ans];
    for (const val of selectedValues) {
      const opt = q.options.find((o) => o.value === val);
      if (!opt?.score) continue;
      for (const key of Object.keys(opt.score) as (keyof ScoreWeight)[]) {
        scores[key] += opt.score[key] ?? 0;
      }
    }
  }

  if (scores.home >= 4 && scores.home > scores.salon) {
    return { type: "homecare", scores, rawAnswers: answers };
  }

  const skeletonDominant = scores.skeleton - scores.skin >= 3;
  const skinDominant = scores.skin - scores.skeleton >= 3;

  if (skeletonDominant) {
    return { type: "kogao", scores, rawAnswers: answers };
  }
  if (skinDominant) {
    return { type: "herb", scores, rawAnswers: answers };
  }

  return { type: "both", scores, rawAnswers: answers };
}

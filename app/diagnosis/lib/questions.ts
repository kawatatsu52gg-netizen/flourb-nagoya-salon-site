export type QuestionType = "single" | "multi" | "text";

export interface ScoreWeight {
  skeleton?: number;
  skin?: number;
  salon?: number;
  home?: number;
  quick?: number;
  deep?: number;
}

export interface Question {
  id: string;
  type: QuestionType;
  title: string;
  subtitle?: string;
  options?: { value: string; label: string; score?: ScoreWeight }[];
  required: boolean;
  maxLength?: number;
  placeholder?: string;
}

export const questions: Question[] = [
  {
    id: "q1_age",
    type: "single",
    title: "年代を教えてください",
    required: true,
    options: [
      { value: "20s", label: "20代" },
      { value: "30s", label: "30代" },
      { value: "40s", label: "40代" },
      { value: "50plus", label: "50代以上" }
    ]
  },
  {
    id: "q2_concern",
    type: "single",
    title: "今、いちばん気になっているのはどちらですか？",
    required: true,
    options: [
      { value: "contour", label: "顔の輪郭・むくみ・フェイスライン", score: { skeleton: 3 } },
      { value: "skin", label: "肌の質感・くすみ・毛穴", score: { skin: 3 } },
      { value: "both", label: "両方ともしっかり変えたい", score: { skeleton: 2, skin: 2 } },
      { value: "unknown", label: "まだよく分からない／全体的に整えたい", score: { skeleton: 1, skin: 1 } }
    ]
  },
  {
    id: "q3_moment",
    type: "multi",
    title: "鏡を見て「いちばん気になる瞬間」はいつですか？",
    subtitle: "複数選択可",
    required: true,
    options: [
      { value: "morning", label: "朝、むくんでいるとき", score: { skeleton: 2 } },
      { value: "evening", label: "夕方、疲れが顔に出ているとき", score: { skeleton: 1, skin: 1 } },
      { value: "photo", label: "写真に写った自分の輪郭", score: { skeleton: 2 } },
      { value: "makeup", label: "化粧ノリが悪い日", score: { skin: 2 } },
      { value: "texture", label: "肌の触り心地・ざらつき", score: { skin: 2 } },
      { value: "none", label: "特定のタイミングはないが、漠然と", score: {} }
    ]
  },
  {
    id: "q4_skin",
    type: "multi",
    title: "肌について、当てはまるものを教えてください",
    subtitle: "複数選択可",
    required: true,
    options: [
      { value: "dry", label: "乾燥・ツッパリが気になる", score: { skin: 1 } },
      { value: "pores", label: "毛穴の開き・黒ずみ", score: { skin: 2 } },
      { value: "dull", label: "くすみ・トーンの暗さ", score: { skin: 2 } },
      { value: "scars", label: "ニキビ跡・色素沈着", score: { skin: 2 } },
      { value: "sag", label: "たるみ・ハリ不足", score: { skin: 1, skeleton: 1 } },
      { value: "sensitive", label: "敏感肌で刺激を感じやすい", score: { home: 1 } },
      { value: "none", label: "特に肌の悩みはない", score: { skeleton: 1 } }
    ]
  },
  {
    id: "q5_structure",
    type: "multi",
    title: "輪郭・骨格について、当てはまるものを教えてください",
    subtitle: "複数選択可",
    required: true,
    options: [
      { value: "asymmetry", label: "顔の左右差が気になる", score: { skeleton: 2 } },
      { value: "jaw", label: "エラ張り・食いしばりの癖", score: { skeleton: 2 } },
      { value: "jawline", label: "フェイスラインのもたつき", score: { skeleton: 2 } },
      { value: "cheekbone", label: "頬骨の位置・高さ", score: { skeleton: 2 } },
      { value: "posture", label: "姿勢の崩れ・肩こりと連動する顔の疲れ", score: { skeleton: 2 } },
      { value: "none", label: "特に気になる点はない", score: { skin: 1 } }
    ]
  },
  {
    id: "q6_experience",
    type: "single",
    title: "これまでの美容経験を教えてください",
    required: true,
    options: [
      { value: "regular", label: "エステ・サロンを定期的に利用している", score: { salon: 2 } },
      { value: "past", label: "過去に利用していたが今はしていない", score: { salon: 1 } },
      { value: "medical", label: "美容医療（注射・レーザー等）の経験がある", score: { salon: 2, quick: 1 } },
      { value: "first", label: "サロン初心者・これが初めて", score: { home: 1 } }
    ]
  },
  {
    id: "q7_frequency",
    type: "single",
    title: "どのくらいの頻度で自分のための時間を作れますか？",
    required: true,
    options: [
      { value: "high", label: "月2回以上", score: { salon: 3 } },
      { value: "medium", label: "月1回くらい", score: { salon: 2 } },
      { value: "low", label: "2〜3ヶ月に1回", score: { salon: 1, home: 1 } },
      { value: "home", label: "サロンよりも、まずは自宅ケア中心で", score: { home: 3 } }
    ]
  },
  {
    id: "q8_budget",
    type: "single",
    title: "1回のケアにかけられる予算感は？",
    required: true,
    options: [
      { value: "low", label: "〜¥12,000", score: { salon: 1 } },
      { value: "medium", label: "¥12,000〜¥22,000", score: { salon: 2 } },
      { value: "high", label: "¥22,000以上でも価値があるなら", score: { salon: 3 } },
      { value: "try", label: "まず続けやすい金額で試したい", score: { home: 1, salon: 1 } }
    ]
  },
  {
    id: "q9_change",
    type: "single",
    title: "「変化」について、あなたの本音に近いのは？",
    required: true,
    options: [
      { value: "quick", label: "すぐに見える変化がほしい", score: { quick: 2 } },
      { value: "deep", label: "時間がかかっても、根本から整えたい", score: { deep: 2 } },
      { value: "balanced", label: "両方バランスよく", score: { quick: 1, deep: 1 } },
      { value: "diagnose", label: "まず自分の状態を知りたい", score: { deep: 1 } }
    ]
  },
  {
    id: "q10_freetext",
    type: "text",
    title: "最後に。今、いちばん変えたい「何か」を教えてください",
    subtitle: "任意・200文字まで。書いていただくほど、診断が深くなります。",
    required: false,
    maxLength: 200,
    placeholder:
      "例：朝、鏡を見たときの表情をもっと自分らしくしたい／写真に写る自分を好きになりたい／肩こりと連動して顔が重い感じを軽くしたい"
  }
];

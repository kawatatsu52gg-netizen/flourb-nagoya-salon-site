export const reservationLinks = {
  line: "https://lin.ee/MvZoH1V",
  square:
    "https://book.squareup.com/appointments/ep9ch3dwkrs9ng/location/LM4F7BHD9ZW0N/services?rwg_token=AFd1xnG4imKzT0AqD3lBmFZEgyDm0Ia-pHABuefw-wNH1lCffNNh0-ICoiZ7gXc9NJoK5bsLYEIbbxPOBUANL9FK8PZjVg4s6A%3D%3D",
  hotpepper: "https://beauty.hotpepper.jp/",
  salonBoard: "https://salonboard.com/"
} as const;

export const heroCopy = {
  /** メイン見出しは2行固定（改行制御） */
  titleLines: ["肌と輪郭から、", "本質のわたしへ。"] as const,
  subtitle:
    "名古屋都心で働くキャリア女性へ。『お疲れですか？』と聞かれる肌を卒業し、構造美を土台にした印象設計へ。",
  primaryCta: "初回限定カウンセリングを予約する",
  secondaryCta: "まずはコンセプトを知る"
};

export const painPoints = [
  "クライアント対面で『お疲れですか？』と言われるのがつらい。",
  "高価なコスメを重ねても、根本の肌質が変わらない。",
  "朝のメイクで隠し切れず、夕方に崩れて自信が落ちる。",
  "エステを続けても、理論と結果の両方に納得できなかった。",
  "本当はもっと仕事で勝てる印象をつくりたい。"
];

export const conceptCopy = {
  heading: "仕事で勝てる肌を、構造からつくる。",
  body: [
    "ハーブピーリングだけでは、輪郭の土台までは変わりません。小顔矯正だけでも、肌の質感や透明感は伸び切りません。",
    "Flourbは、肌・骨格・循環の3層を同時に整えることで、見た目の変化を一時的なものではなく、再現性のある変化へ導きます。",
    "ブランド名のFlourbには『花がひらくように、その人本来の美しさを開く』という想いを込めています。"
  ]
};

/** Method見出し案: A採用（ふたつの柱が世界観と一致）。B/Cはコメントで併記。 */
// 案B: 「選べるアプローチ、続く美しさ。」
// 案C: 「土台を整え、肌を変え、状態を保つ。」
export const methodSection = {
  heading: "体と肌、ふたつの柱から。",
  lead: [
    "小顔矯正とハーブピーリング。独立したふたつのアプローチで、",
    "身体の土台と肌の細胞に同時に働きかけます。",
    "単体でも、組み合わせても。あなたの目的に合わせて選べる設計です。"
  ] as const
} as const;

export type MethodStepVariant = "pillar" | "continuity";

export const methodSteps: ReadonlyArray<{
  title: string;
  description: string;
  image: string;
  variant: MethodStepVariant;
}> = [
  {
    title: "整える｜小顔矯正",
    description:
      "骨格・血流・筋肉の滞り。\n身体の内側にあるすべての要因に、順序立ててアプローチします。\n表面的な矯正ではなく、土台から輪郭を作り直す。\nそれがFlourbの小顔矯正です。",
    image: "/placeholders/method-step-1.jpg",
    variant: "pillar"
  },
  {
    title: "洗い流す｜ハーブピーリング",
    description:
      "表皮から真皮層の深部まで届く、ハーブの力。\n肌細胞そのものに働きかけ、再生のサイクルを正常化します。\n一時的な変化で終わらない、本質的な肌質改善へ。",
    image: "/placeholders/hero-visual.jpg",
    variant: "pillar"
  },
  {
    title: "続ける｜好循環の定着",
    description:
      "施術で整えた状態を、ご自宅での習慣に落とし込む。\n体の土台も、肌の細胞も、好循環が続く状態へ。\n『一時的な体験』を『続く変化』へと定着させる、Flourb独自のアフター設計です。",
    image: "/placeholders/pain-mood.jpg",
    variant: "continuity"
  }
];

export const proofStats = [
  {
    label: "高評価率（★4以上）",
    value: "96.3%",
    note: "出典: Hotpepper口コミ 54件中、★5=50件・★4=2件（2026-04確認）"
  },
  {
    label: "口コミ件数",
    value: "54件",
    note: "出典: Hotpepper 口コミ一覧ページ（2026-04確認）"
  },
  {
    label: "サロン平均",
    value: "4.85 / 5",
    note: "出典: Hotpepper 公開評価（2026-04確認）"
  }
];

export const beforeAfterCards = [
  {
    title: "case 01",
    meta: "6回 / 約3ヶ月",
    comment: "フェイスラインのもたつきが薄れ、ノーファンデの日が増えました。",
    image: "/placeholders/before-after-1.jpg"
  },
  {
    title: "case 02",
    meta: "4回 / 約2ヶ月",
    comment: "肌の明るさと毛穴の見え方が変わり、鏡を見る回数が増えました。",
    image: "/placeholders/before-after-2.jpg"
  },
  {
    title: "case 03",
    meta: "8回 / 約4ヶ月",
    comment: "輪郭の左右差が落ち着き、写真写りの違和感が減りました。",
    image: "/placeholders/before-after-3.jpg"
  }
];

export const testimonials = [
  {
    name: "skinbh45 様",
    profile: "30代前半 / 会社員",
    text: "肌診断と説明が丁寧で、初回から毛穴・くすみ・ニキビの変化を実感できました。回数を重ねるのが楽しみです。"
  },
  {
    name: "ま 様",
    profile: "20代後半 / 会社員",
    text: "継続するほど肌がきれいになり、周りから褒められることが増えました。今後も続けたいです。"
  },
  {
    name: "h 様",
    profile: "20代前半 / 会社員",
    text: "悩みに寄り添ってもらえて安心でき、施術後はトーンアップを実感。満足度の高い体験でした。"
  }
];

export const pricingPlans = [
  {
    title: "小顔矯正",
    price: "¥12,000",
    description: "60分｜骨格・血流・筋肉の滞りへ、土台から整えるアプローチ",
    badge: ""
  },
  {
    title: "ハーブピーリング × 小顔セット",
    price: "¥22,000",
    description: "90分｜身体の土台と肌細胞に、同時に働きかける統合メニュー",
    badge: "最も選ばれています"
  },
  {
    title: "ハーブピーリング",
    price: "¥13,500",
    description: "60分｜表皮から真皮層の深部まで届く、肌細胞アプローチ",
    badge: ""
  }
];

export const faqItems = [
  {
    q: "痛みはありますか？",
    a: "基本は心地よい圧ですが、緊張が強い部位は軽い刺激を感じる場合があります。強さは都度調整します。"
  },
  {
    q: "何回くらいで変化を感じますか？",
    a: "初回で体感が出る方もいますが、土台の定着は4〜6回を目安にご案内しています。"
  },
  {
    q: "ダウンタイムはありますか？",
    a: "剥離なし施術のため日常に戻りやすい設計です。赤みが出る場合も通常は短時間で落ち着きます。"
  },
  {
    q: "他のエステ・美容医療との違いは？",
    a: "表層ケアだけでなく、骨格・筋膜・循環を含めて原因にアプローチする点がFlourbの違いです。"
  },
  {
    q: "キャンセルや変更は可能ですか？",
    a: "可能です。運用ポリシーは予約時に必ずご案内します。"
  },
  {
    q: "アクセスは？",
    a: "伏見駅1番出口から徒歩約10秒、名古屋市中区錦2-16-24 サン・伏見ビル1003です。"
  },
  {
    q: "男性や敏感肌でも受けられますか？",
    a: "ご相談可能です。肌状態を確認したうえで、適した施術プランをご提案します。"
  }
];

export const closingCopy = {
  heading: "1年後のあなたの顔は、今日ここから決まる。",
  body: "鏡の前でため息をつく時間より、未来に期待できる朝を増やしていく。Flourbはその選択を、構造から支えます。"
};

export const profileCopy = {
  nameEn: "TATSUYA KAWABE",
  nameJa: "川辺 達也",
  role: "Flourb 名古屋 代表",
  credential: "医療系国家資格保有",
  bio: `東京・代官山に本店「LaTokyo」を構え、
講師として小顔矯正・フェイスアプローチの指導実績多数。

シンガポール・香港にもクライアントを持ち、
常に予約が埋まり続ける状態が続いています。

海外にて多数の解剖学研修を重ね、
解剖学的根拠に踏み込んだ本質的な施術を、
Flourbでお届けしています。`
};

export const businessInfo = {
  name: "Flourb（フラーブ名古屋）",
  address: "〒460-0003 愛知県名古屋市中区錦2-16-24 サン・伏見ビル1003",
  access: "伏見駅1番出口 徒歩約10秒",
  phone: "000-0000-0000",
  instagram: "https://www.instagram.com/"
};

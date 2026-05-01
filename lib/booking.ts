import { addDays, format, isBefore, parseISO, startOfDay } from "date-fns";
import { toZonedTime } from "date-fns-tz";

const TOKYO_TZ = "Asia/Tokyo";

export type BookingService = {
  id: string;
  name: string;
  durationMinutes: number;
  priceYen: number;
  version?: string;
};

export type Slot = {
  startAt: string;
  startAtJST: string;
  dateLabel: string;
  timeLabel: string;
  period: "morning" | "afternoon" | "evening";
  teamMemberId: string;
  teamMemberName: string;
};

export type RecommendedDay = {
  date: string;
  dateLabel: string;
  morning?: {
    startAt: string;
    timeLabel: string;
    teamMemberId: string;
    teamMemberName: string;
  };
  afternoon?: {
    startAt: string;
    timeLabel: string;
    teamMemberId: string;
    teamMemberName: string;
  };
};

const weekdays = ["日", "月", "火", "水", "木", "金", "土"];

export function toJstDate(isoUtc: string) {
  return toZonedTime(parseISO(isoUtc), TOKYO_TZ);
}

export function getPeriod(jstDate: Date): Slot["period"] {
  const hour = Number(format(jstDate, "H"));
  if (hour < 12) return "morning";
  if (hour < 17) return "afternoon";
  return "evening";
}

export function toDateLabel(jstDate: Date): string {
  const monthDay = format(jstDate, "M月d日");
  const weekday = weekdays[jstDate.getDay()];
  return `${monthDay}（${weekday}）`;
}

export function toSlot({
  startAt,
  teamMemberId,
  teamMemberName
}: {
  startAt: string;
  teamMemberId: string;
  teamMemberName: string;
}): Slot {
  const jstDate = toJstDate(startAt);
  const timeLabel = format(jstDate, "HH:mm");
  return {
    startAt,
    startAtJST: format(jstDate, "yyyy-MM-dd'T'HH:mm:ssXXX"),
    dateLabel: toDateLabel(jstDate),
    timeLabel,
    period: getPeriod(jstDate),
    teamMemberId,
    teamMemberName
  };
}

export function recommendSlots(slots: Slot[]): { recommendations: RecommendedDay[]; totalAvailableDays: number } {
  const byDate = new Map<string, Slot[]>();

  for (const slot of slots) {
    const jstDate = toJstDate(slot.startAt);
    const dateKey = format(jstDate, "yyyy-MM-dd");
    if (!byDate.has(dateKey)) byDate.set(dateKey, []);
    byDate.get(dateKey)!.push(slot);
  }

  const sortedDays = Array.from(byDate.keys()).sort((a, b) => (isBefore(parseISO(a), parseISO(b)) ? -1 : 1));
  const recommendations: RecommendedDay[] = [];

  for (const dayKey of sortedDays) {
    const daySlots = byDate.get(dayKey)!;
    daySlots.sort((a, b) => (a.startAt < b.startAt ? -1 : 1));
    const morning = daySlots.find((s) => s.period === "morning");
    const afternoon = daySlots.find((s) => s.period === "afternoon");
    const eveningFallback = daySlots.find((s) => s.period === "evening");
    const jstDate = toJstDate(`${dayKey}T00:00:00+09:00`);

    if (!morning && !afternoon && !eveningFallback) continue;

    recommendations.push({
      date: dayKey,
      dateLabel: toDateLabel(jstDate),
      morning: morning
        ? {
            startAt: morning.startAt,
            timeLabel: morning.timeLabel,
            teamMemberId: morning.teamMemberId,
            teamMemberName: morning.teamMemberName
          }
        : undefined,
      afternoon: (afternoon ?? eveningFallback)
        ? {
            startAt: (afternoon ?? eveningFallback)!.startAt,
            timeLabel: (afternoon ?? eveningFallback)!.timeLabel,
            teamMemberId: (afternoon ?? eveningFallback)!.teamMemberId,
            teamMemberName: (afternoon ?? eveningFallback)!.teamMemberName
          }
        : undefined
    });

    if (recommendations.length >= 3) break;
  }

  return {
    recommendations,
    totalAvailableDays: sortedDays.length
  };
}

export function getDateRange(days = 14) {
  const today = startOfDay(new Date());
  return {
    startAt: today.toISOString(),
    endAt: addDays(today, Math.max(days, 1)).toISOString()
  };
}

export function prioritizePrimaryService(services: BookingService[]) {
  return [...services].sort((a, b) => {
    const aPrimary = a.name.includes("月5名限定【初回3,980円】小顔矯正") ? 0 : 1;
    const bPrimary = b.name.includes("月5名限定【初回3,980円】小顔矯正") ? 0 : 1;
    if (aPrimary !== bPrimary) return aPrimary - bPrimary;
    return a.name.localeCompare(b.name, "ja");
  });
}

/** 診断タイプに沿って Square カタログ上のバリエーションIDを推定する（名前に依存） */
export type DiagnosisServiceHint = "herb" | "kogao" | "both";

export function pickServiceIdForDiagnosis(services: BookingService[], hint: DiagnosisServiceHint): string | undefined {
  if (services.length === 0) return undefined;

  const hasHerb = (name: string) => /ハーブ|ピーリング/i.test(name);
  const hasKogao = (name: string) => /小顔/i.test(name);
  const isCombo = (name: string) => hasHerb(name) && hasKogao(name);

  if (hint === "both") {
    const combo = services.find((s) => isCombo(s.name));
    if (combo) return combo.id;
  }
  if (hint === "herb") {
    const single = services.find((s) => hasHerb(s.name) && !isCombo(s.name));
    if (single) return single.id;
    const anyHerb = services.find((s) => hasHerb(s.name));
    if (anyHerb) return anyHerb.id;
  }
  if (hint === "kogao") {
    const single = services.find((s) => hasKogao(s.name) && !isCombo(s.name));
    if (single) return single.id;
    const anyK = services.find((s) => hasKogao(s.name));
    if (anyK) return anyK.id;
  }

  return services[0]?.id;
}

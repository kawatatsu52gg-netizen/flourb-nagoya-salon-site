"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useEffect, useMemo, useState } from "react";

type SlotOption = {
  startAt: string;
  timeLabel: string;
  teamMemberId: string;
};

type RecommendedDay = {
  date: string;
  dateLabel: string;
  morning?: SlotOption;
  afternoon?: SlotOption;
};

type AvailabilitySlot = {
  startAt: string;
  dateLabel: string;
  timeLabel: string;
  teamMemberId: string;
};

interface SlotPickerModalProps {
  open: boolean;
  serviceId: string;
  onClose: () => void;
  onSelect: (payload: { startAt: string; teamMemberId: string }) => void;
}

export function SlotPickerModal({ open, serviceId, onClose, onSelect }: SlotPickerModalProps) {
  const bookingStaffScope = "any";
  const [loading, setLoading] = useState(false);
  const [recommendations, setRecommendations] = useState<RecommendedDay[]>([]);
  const [allSlots, setAllSlots] = useState<AvailabilitySlot[]>([]);
  const [showAll, setShowAll] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadRecommendations = useCallback(async () => {
    if (!serviceId) return;
    setLoading(true);
    setError(null);
    try {
      const url = `/api/recommended-slots?serviceId=${encodeURIComponent(serviceId)}&teamMemberId=${encodeURIComponent(bookingStaffScope)}`;
      const res = await fetch(url);
      if (!res.ok) throw new Error("候補日の取得に失敗しました");
      const json = await res.json();
      setRecommendations(json.recommendations ?? []);
      setShowAll(false);
    } catch {
      setError("候補日の取得に失敗しました。時間をおいて再度お試しください。");
    } finally {
      setLoading(false);
    }
  }, [serviceId]);

  useEffect(() => {
    if (!open || !serviceId) return;
    void loadRecommendations();
  }, [open, serviceId, loadRecommendations]);

  async function loadAllSlots() {
    setLoading(true);
    setError(null);
    try {
      const url = `/api/availability?serviceId=${encodeURIComponent(serviceId)}&teamMemberId=${encodeURIComponent(bookingStaffScope)}&days=30`;
      const res = await fetch(url);
      if (!res.ok) throw new Error("all slots failed");
      const json = await res.json();
      setAllSlots(json.slots ?? []);
      setShowAll(true);
    } catch {
      setError("他の日時の取得に失敗しました。");
    } finally {
      setLoading(false);
    }
  }

  const groupedAllSlots = useMemo(() => {
    const byDate = new Map<string, AvailabilitySlot[]>();
    for (const slot of allSlots) {
      if (!byDate.has(slot.dateLabel)) byDate.set(slot.dateLabel, []);
      byDate.get(slot.dateLabel)!.push(slot);
    }
    return Array.from(byDate.entries());
  }, [allSlots]);

  const quickCandidates = useMemo(
    () =>
      recommendations
        .flatMap((day) => {
          const items: Array<{ key: string; startAt: string; teamMemberId: string; label: string }> = [];
          if (day.morning) {
            items.push({
              key: `${day.date}-morning`,
              startAt: day.morning.startAt,
              teamMemberId: day.morning.teamMemberId,
              label: `${day.dateLabel} ${day.morning.timeLabel}`
            });
          }
          if (day.afternoon) {
            items.push({
              key: `${day.date}-afternoon`,
              startAt: day.afternoon.startAt,
              teamMemberId: day.afternoon.teamMemberId,
              label: `${day.dateLabel} ${day.afternoon.timeLabel}`
            });
          }
          return items;
        })
        .slice(0, 5),
    [recommendations]
  );

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/35 px-4 py-8"
        >
          <motion.div
            initial={{ y: 14, opacity: 0, scale: 0.985 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 8, opacity: 0, scale: 0.99 }}
            transition={{ duration: 0.2 }}
            className="max-h-[90vh] w-full max-w-md overflow-y-auto rounded-2xl border border-rose-200/40 bg-white p-6 shadow-xl md:p-8"
          >
            <div className="flex justify-end">
              <button type="button" className="text-sm text-foreground/60 hover:text-foreground" onClick={onClose}>
                閉じる ×
              </button>
            </div>

            <div className="text-center">
              <p className="text-xs tracking-[0.14em] text-rose-700">SHORTEST BOOKING</p>
              <h3 className="mt-3 font-serif text-2xl md:text-3xl">最短予約はこちら</h3>
              <p className="mt-2 text-sm text-foreground/70">直近でご案内可能な候補日時をご提案します。</p>
            </div>

            {loading && (
              <div className="mt-8 space-y-3">
                <div className="h-12 animate-pulse rounded-xl bg-rose-100/40" />
                <div className="h-12 animate-pulse rounded-xl bg-rose-100/30" />
                <div className="h-12 animate-pulse rounded-xl bg-rose-100/20" />
              </div>
            )}

            {error && (
              <div className="mt-6 rounded-xl border border-rose-200 bg-rose-50/50 p-4 text-sm text-rose-700">
                <p>{error}</p>
                <button
                  type="button"
                  className="mt-3 rounded-full border border-rose-300 px-4 py-1.5 text-xs text-rose-700 transition hover:bg-white"
                  onClick={() => void loadRecommendations()}
                >
                  再試行する
                </button>
              </div>
            )}

            {!loading && !showAll && (
              <div className="mt-8 space-y-4">
                {quickCandidates.length > 0 ? (
                  quickCandidates.map((candidate) => (
                    <button
                      key={candidate.key}
                      type="button"
                      className="w-full rounded-full border border-rose-200 bg-rose-50/60 px-5 py-2.5 text-sm text-rose-800 transition hover:scale-[1.01] hover:shadow-sm"
                      onClick={() => onSelect({ startAt: candidate.startAt, teamMemberId: candidate.teamMemberId })}
                    >
                      {candidate.label}
                    </button>
                  ))
                ) : (
                  <div className="rounded-xl border border-rose-200 bg-rose-50/40 p-4 text-center text-sm text-foreground/75">
                    直近の候補が見つかりませんでした。別日をお探しください。
                  </div>
                )}
                <div className="pt-1 text-center">
                  <button
                    type="button"
                    className="text-sm text-rose-700 underline underline-offset-4"
                    onClick={loadAllSlots}
                  >
                    別日を探す
                  </button>
                </div>
              </div>
            )}

            {!loading && showAll && (
              <div className="mt-8">
                <div className="mb-3 flex items-center justify-between">
                  <p className="text-sm text-foreground/70">30日以内の空き枠</p>
                  <button type="button" className="text-sm text-rose-700 underline underline-offset-4" onClick={() => setShowAll(false)}>
                    候補表示に戻る
                  </button>
                </div>
                <div className="space-y-4">
                  {groupedAllSlots.length === 0 && (
                    <div className="rounded-xl border border-rose-200 bg-rose-50/40 p-4 text-center text-sm text-foreground/75">
                      この期間に空きがありません。日をあらためてお試しください。
                    </div>
                  )}
                  {groupedAllSlots.map(([dateLabel, slots]) => (
                    <div key={dateLabel} className="rounded-xl border border-rose-100 bg-rose-50/30 p-4">
                      <p className="text-sm font-medium text-foreground/80">{dateLabel}</p>
                      <div className="mt-2 flex flex-wrap gap-2">
                        {slots.map((slot) => (
                          <button
                            key={`${slot.startAt}-${slot.teamMemberId}`}
                            type="button"
                            className="rounded-full border border-rose-200 bg-white px-4 py-1.5 text-sm text-rose-800 transition hover:scale-[1.02]"
                            onClick={() =>
                              onSelect({
                                startAt: slot.startAt,
                                teamMemberId: slot.teamMemberId
                              })
                            }
                          >
                            {slot.timeLabel}〜
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

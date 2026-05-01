"use client";

import { useEffect, useMemo, useState } from "react";

type SlotOption = {
  startAt: string;
  timeLabel: string;
  teamMemberId: string;
  teamMemberName: string;
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
  teamMemberName: string;
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

  useEffect(() => {
    if (!open || !serviceId) return;
    setLoading(true);
    setError(null);

    const url = `/api/recommended-slots?serviceId=${encodeURIComponent(serviceId)}&teamMemberId=${encodeURIComponent(bookingStaffScope)}`;
    fetch(url)
      .then(async (res) => {
        if (!res.ok) throw new Error("候補日の取得に失敗しました");
        return res.json();
      })
      .then((json) => {
        setRecommendations(json.recommendations ?? []);
      })
      .catch(() => setError("候補日の取得に失敗しました。時間をおいて再度お試しください。"))
      .finally(() => setLoading(false));
  }, [open, serviceId]);

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

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/35 px-4 py-8">
      <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl border border-rose-200/40 bg-white p-6 shadow-xl md:p-8">
        <div className="flex justify-end">
          <button type="button" className="text-sm text-foreground/60 hover:text-foreground" onClick={onClose}>
            閉じる ×
          </button>
        </div>

        <div className="text-center">
          <p className="text-2xl">🌿</p>
          <h3 className="mt-3 font-serif text-2xl md:text-3xl">直近の午前・午後の最も早いお時間をご案内できます。</h3>
        </div>

        {loading && (
          <div className="mt-8 space-y-3">
            <div className="h-12 animate-pulse rounded-xl bg-rose-100/40" />
            <div className="h-12 animate-pulse rounded-xl bg-rose-100/30" />
            <div className="h-12 animate-pulse rounded-xl bg-rose-100/20" />
          </div>
        )}

        {error && <p className="mt-6 text-sm text-rose-700">{error}</p>}

        {!loading && !showAll && (
          <div className="mt-8 space-y-6">
            {recommendations.map((day) => (
              <div key={day.date}>
                <p className="text-center text-sm text-foreground/70">{day.dateLabel}</p>
                <div className="mt-3 flex flex-wrap justify-center gap-3">
                  {day.morning && (
                    <button
                      type="button"
                      className="rounded-full border border-rose-200 bg-rose-50/60 px-5 py-2 text-sm text-rose-800 transition hover:scale-[1.02] hover:shadow-sm"
                      onClick={() =>
                        onSelect({
                          startAt: day.morning!.startAt,
                          teamMemberId: day.morning!.teamMemberId
                        })
                      }
                    >
                      {day.morning.timeLabel}〜
                    </button>
                  )}
                  {day.afternoon && (
                    <button
                      type="button"
                      className="rounded-full border border-rose-200 bg-rose-50/60 px-5 py-2 text-sm text-rose-800 transition hover:scale-[1.02] hover:shadow-sm"
                      onClick={() =>
                        onSelect({
                          startAt: day.afternoon!.startAt,
                          teamMemberId: day.afternoon!.teamMemberId
                        })
                      }
                    >
                      {day.afternoon.timeLabel}〜
                    </button>
                  )}
                </div>
              </div>
            ))}
            <div className="pt-2 text-center">
              <button
                type="button"
                className="text-sm text-rose-700 underline underline-offset-4"
                onClick={loadAllSlots}
              >
                他の日時を探す
              </button>
            </div>
          </div>
        )}

        {!loading && showAll && (
          <div className="mt-8">
            <div className="mb-3 flex items-center justify-between">
              <p className="text-sm text-foreground/70">30日以内の空き枠</p>
              <button type="button" className="text-sm text-rose-700 underline underline-offset-4" onClick={() => setShowAll(false)}>
                候補3日に戻る
              </button>
            </div>
            <div className="space-y-4">
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
      </div>
    </div>
  );
}

"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

import { SlotPickerModal } from "@/components/booking/SlotPickerModal";

type Service = {
  id: string;
  name: string;
  durationMinutes: number;
  priceYen: number;
};

type TeamMember = {
  id: string;
  displayName: string;
  isBookable: boolean;
};

export default function BookingPage() {
  const router = useRouter();
  const [services, setServices] = useState<Service[]>([]);
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [serviceId, setServiceId] = useState("");
  const [teamMemberId, setTeamMemberId] = useState("any");
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);

  const selectedService = useMemo(() => services.find((service) => service.id === serviceId), [services, serviceId]);

  useEffect(() => {
    async function loadServices() {
      setLoading(true);
      try {
        const serviceRes = await fetch("/api/services");
        const serviceJson = await serviceRes.json();
        const nextServices: Service[] = serviceJson.services ?? [];
        setServices(nextServices);
        if (nextServices.length > 0) setServiceId(nextServices[0].id);
      } finally {
        setLoading(false);
      }
    }
    void loadServices();
  }, []);

  useEffect(() => {
    if (!serviceId) return;
    async function loadTeamMembers() {
      const res = await fetch(`/api/team-members?serviceId=${encodeURIComponent(serviceId)}`);
      const json = await res.json();
      setTeamMembers(json.teamMembers ?? []);
    }
    void loadTeamMembers();
  }, [serviceId]);

  function handleSlotSelect(payload: { startAt: string; teamMemberId: string; teamMemberName: string }) {
    const params = new URLSearchParams({
      serviceId,
      teamMemberId: payload.teamMemberId,
      teamMemberName: payload.teamMemberName,
      startAt: payload.startAt
    });
    setModalOpen(false);
    router.push(`/booking/confirm?${params.toString()}`);
  }

  return (
    <main className="min-h-screen bg-background py-10 md:py-14">
      <section className="section-shell mx-auto max-w-3xl">
        <div className="mb-6 flex items-center justify-between">
          <Link href="/" className="text-sm text-foreground/65 underline underline-offset-4">
            ← ホームに戻る
          </Link>
          <p className="text-xs tracking-[0.2em] text-rose-700">BOOKING</p>
        </div>

        <div className="space-y-6 rounded-2xl border border-rose-200/50 bg-white p-6 md:p-8">
          <h1 className="font-serif text-3xl md:text-4xl">ご予約</h1>
          <p className="text-sm leading-relaxed text-foreground/70">現在の空き状況から、直近でご案内可能なお時間をご提案します。</p>

          <div className="rounded-2xl border border-rose-100 bg-rose-50/40 p-5">
            <p className="text-sm tracking-[0.14em] text-rose-700">選択メニュー</p>
            {loading ? (
              <div className="mt-3 h-10 animate-pulse rounded bg-rose-100/40" />
            ) : (
              <>
                <select
                  className="mt-3 w-full rounded-xl border border-rose-200 bg-white px-4 py-3 text-sm"
                  value={serviceId}
                  onChange={(e) => setServiceId(e.target.value)}
                >
                  {services.map((service) => (
                    <option key={service.id} value={service.id}>
                      {service.name} / ¥{service.priceYen.toLocaleString()} / {service.durationMinutes}分
                    </option>
                  ))}
                </select>
                {selectedService && (
                  <p className="mt-3 text-sm text-foreground/70">
                    {selectedService.name} / ¥{selectedService.priceYen.toLocaleString()} / {selectedService.durationMinutes}分
                  </p>
                )}
              </>
            )}
          </div>

          <div className="rounded-2xl border border-rose-100 bg-rose-50/40 p-5">
            <p className="text-sm tracking-[0.14em] text-rose-700">担当スタッフ</p>
            <div className="mt-3 space-y-2">
              <label className="flex cursor-pointer items-center gap-2 text-sm text-foreground/80">
                <input
                  type="radio"
                  checked={teamMemberId === "any"}
                  onChange={() => setTeamMemberId("any")}
                  className="h-4 w-4 accent-rose-700"
                />
                指名なし（おまかせ）
              </label>
              {teamMembers.map((member) => (
                <label key={member.id} className="flex cursor-pointer items-center gap-2 text-sm text-foreground/80">
                  <input
                    type="radio"
                    checked={teamMemberId === member.id}
                    onChange={() => setTeamMemberId(member.id)}
                    className="h-4 w-4 accent-rose-700"
                  />
                  {member.displayName}
                </label>
              ))}
            </div>
          </div>

          <button
            type="button"
            className="w-full rounded-full bg-rose-700 px-6 py-3 text-sm font-medium text-white transition hover:bg-rose-800"
            disabled={!serviceId}
            onClick={() => setModalOpen(true)}
          >
            候補日を表示する
          </button>
        </div>
      </section>

      <SlotPickerModal
        open={modalOpen}
        serviceId={serviceId}
        teamMemberId={teamMemberId}
        onClose={() => setModalOpen(false)}
        onSelect={handleSlotSelect}
      />
    </main>
  );
}

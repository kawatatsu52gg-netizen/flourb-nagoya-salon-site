"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { toZonedTime } from "date-fns-tz";

const schema = z.object({
  familyName: z.string().min(1, "姓は必須です"),
  givenName: z.string().min(1, "名は必須です"),
  phoneNumber: z
    .string()
    .min(10, "電話番号を入力してください")
    .regex(/^[0-9+\-()\s]+$/, "電話番号の形式が不正です"),
  lineId: z.string().min(1, "LINE IDを入力してください"),
  emailAddress: z.string().email("メールアドレス形式で入力してください"),
  note: z.string().optional(),
  agreed: z.boolean().refine((value) => value, "ポリシーへの同意が必要です")
});

type FormValues = z.infer<typeof schema>;
type Service = { id: string; name: string; durationMinutes: number; priceYen: number };

export default function ConfirmClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const serviceId = searchParams.get("serviceId") ?? "";
  const startAt = searchParams.get("startAt") ?? "";
  const teamMemberId = searchParams.get("teamMemberId") ?? "any";

  const [services, setServices] = useState<Service[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      familyName: "",
      givenName: "",
      phoneNumber: "",
      lineId: "",
      emailAddress: "",
      note: ""
    }
  });

  useEffect(() => {
    fetch("/api/services")
      .then((res) => res.json())
      .then((json) => setServices(json.services ?? []))
      .catch(() => setServices([]));
  }, []);

  const service = useMemo(() => services.find((item) => item.id === serviceId), [services, serviceId]);
  const startAtLabel = useMemo(() => {
    if (!startAt) return "";
    const date = toZonedTime(new Date(startAt), "Asia/Tokyo");
    return format(date, "M月d日（E）HH:mm");
  }, [startAt]);

  async function onSubmit(values: FormValues) {
    setSubmitting(true);
    setError(null);
    try {
      const res = await fetch("/api/book", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          serviceId,
          teamMemberId,
          startAt,
          customer: {
            familyName: values.familyName,
            givenName: values.givenName,
            phoneNumber: values.phoneNumber,
            lineId: values.lineId,
            emailAddress: values.emailAddress,
            note: values.note
          }
        })
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.message ?? "予約に失敗しました");

      const params = new URLSearchParams({
        bookingId: json.bookingId ?? "",
        startAt: json.startAt ?? startAt,
        serviceName: service?.name ?? ""
      });
      router.push(`/booking/complete?${params.toString()}`);
    } catch (e) {
      const message = e instanceof Error ? e.message : "予約に失敗しました";
      setError(message);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main className="min-h-screen bg-background py-10 md:py-14">
      <section className="section-shell mx-auto max-w-3xl">
        <div className="mb-6 flex items-center justify-between">
          <Link href="/booking" className="text-sm text-foreground/65 underline underline-offset-4">
            ← 日時選択に戻る
          </Link>
          <p className="text-xs tracking-[0.2em] text-rose-700">CONFIRM</p>
        </div>

        <div className="space-y-6 rounded-2xl border border-rose-200/50 bg-white p-6 md:p-8">
          <h1 className="font-serif text-3xl md:text-4xl">ご予約内容の確認</h1>
          <div className="rounded-xl bg-rose-50/50 p-4 text-sm text-foreground/80">
            <p>メニュー: {service?.name ?? "選択中..."}</p>
            <p className="mt-1">日時: {startAtLabel || "未選択"}</p>
          </div>

          <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
            <div className="grid gap-4 md:grid-cols-2">
              <label className="text-sm">
                姓
                <input className="mt-1 w-full rounded-xl border border-rose-200 px-3 py-2" {...form.register("familyName")} />
                <span className="mt-1 block text-xs text-rose-700">{form.formState.errors.familyName?.message}</span>
              </label>
              <label className="text-sm">
                名
                <input className="mt-1 w-full rounded-xl border border-rose-200 px-3 py-2" {...form.register("givenName")} />
                <span className="mt-1 block text-xs text-rose-700">{form.formState.errors.givenName?.message}</span>
              </label>
            </div>

            <label className="block text-sm">
              電話番号
              <input className="mt-1 w-full rounded-xl border border-rose-200 px-3 py-2" {...form.register("phoneNumber")} />
              <span className="mt-1 block text-xs text-rose-700">{form.formState.errors.phoneNumber?.message}</span>
            </label>

            <label className="block text-sm">
              メールアドレス
              <input className="mt-1 w-full rounded-xl border border-rose-200 px-3 py-2" {...form.register("emailAddress")} />
              <span className="mt-1 block text-xs text-rose-700">{form.formState.errors.emailAddress?.message}</span>
            </label>

            <label className="block text-sm">
              LINE ID
              <input className="mt-1 w-full rounded-xl border border-rose-200 px-3 py-2" {...form.register("lineId")} />
              <span className="mt-1 block text-xs text-rose-700">{form.formState.errors.lineId?.message}</span>
            </label>

            <label className="block text-sm">
              ご要望・気になること（任意）
              <textarea className="mt-1 w-full rounded-xl border border-rose-200 px-3 py-2" rows={4} {...form.register("note")} />
            </label>

            <label className="flex items-start gap-2 text-sm">
              <input type="checkbox" className="mt-1 h-4 w-4 accent-rose-700" {...form.register("agreed")} />
              キャンセル・変更ポリシーに同意します
            </label>
            <span className="block text-xs text-rose-700">{form.formState.errors.agreed?.message}</span>

            {error && <p className="text-sm text-rose-700">{error}</p>}

            <button
              type="submit"
              disabled={submitting}
              className="w-full rounded-full bg-rose-700 px-6 py-3 text-sm font-medium text-white transition hover:bg-rose-800 disabled:opacity-60"
            >
              {submitting ? "予約を送信しています..." : "予約を確定する"}
            </button>
          </form>
        </div>
      </section>
    </main>
  );
}

"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { format } from "date-fns";
import { toZonedTime } from "date-fns-tz";

export default function CompleteClient() {
  const params = useSearchParams();
  const bookingId = params.get("bookingId") ?? "-";
  const serviceName = params.get("serviceName") ?? "-";
  const startAt = params.get("startAt");

  const startAtLabel = startAt
    ? format(toZonedTime(new Date(startAt), "Asia/Tokyo"), "M月d日（E）HH:mm")
    : "-";

  return (
    <main className="min-h-screen bg-background py-12 md:py-16">
      <section className="section-shell mx-auto max-w-2xl">
        <div className="rounded-2xl border border-rose-200/50 bg-white p-6 md:p-10">
          <p className="text-xs tracking-[0.2em] text-rose-700">COMPLETE</p>
          <h1 className="mt-3 font-serif text-3xl md:text-4xl">ご予約ありがとうございます。</h1>
          <p className="mt-4 text-sm leading-relaxed text-foreground/70">
            ご登録のメールアドレスに確認メールをお送りしました。万が一届かない場合は、迷惑メールフォルダもご確認ください。
          </p>

          <div className="mt-6 rounded-xl bg-rose-50/50 p-4 text-sm text-foreground/80">
            <p>予約番号: {bookingId}</p>
            <p className="mt-1">日時: {startAtLabel}</p>
            <p className="mt-1">メニュー: {serviceName}</p>
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href="https://lin.ee/Pp8Ude0"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex justify-center rounded-full bg-rose-700 px-6 py-3 text-sm font-medium text-white transition hover:bg-rose-800"
            >
              LINE公式アカウントを追加する
            </Link>
            <Link
              href="/"
              className="inline-flex justify-center rounded-full border border-rose-300 px-6 py-3 text-sm font-medium text-rose-700 transition hover:bg-rose-50"
            >
              ホームに戻る
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

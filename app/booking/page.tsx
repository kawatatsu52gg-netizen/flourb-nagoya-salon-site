import { Suspense } from "react";

import { BookingClient } from "@/app/booking/BookingClient";

export default function BookingPage() {
  return (
    <Suspense fallback={null}>
      <BookingClient />
    </Suspense>
  );
}

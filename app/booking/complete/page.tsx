import { Suspense } from "react";

import CompleteClient from "@/app/booking/complete/CompleteClient";

export default function BookingCompletePage() {
  return (
    <Suspense fallback={null}>
      <CompleteClient />
    </Suspense>
  );
}

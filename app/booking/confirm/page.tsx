import { Suspense } from "react";

import ConfirmClient from "@/app/booking/confirm/ConfirmClient";

export default function BookingConfirmPage() {
  return (
    <Suspense fallback={null}>
      <ConfirmClient />
    </Suspense>
  );
}

import Link from "next/link";

import { businessInfo, reservationLinks } from "@/content/copy";

export function Footer() {
  return (
    <footer className="border-t border-rose-300/40 bg-white py-12">
      <div className="section-shell grid gap-10 md:grid-cols-[1.2fr_0.8fr]">
        <div>
          <p className="font-serif text-2xl">{businessInfo.name}</p>
          <p className="mt-4 text-sm text-foreground/70">{businessInfo.address}</p>
          <p className="text-sm text-foreground/70">{businessInfo.access}</p>
          <p className="text-sm text-foreground/70">TEL: {businessInfo.phone}</p>
        </div>
        <div className="space-y-2 text-sm text-foreground/75">
          <Link className="block hover:text-rose-700" href={businessInfo.instagram} target="_blank" rel="noopener noreferrer">
            Instagram
          </Link>
          <Link className="block hover:text-rose-700" href={reservationLinks.hotpepper} target="_blank" rel="noopener noreferrer">
            Hotpepper Beauty
          </Link>
          <Link className="block hover:text-rose-700" href={reservationLinks.salonBoard} target="_blank" rel="noopener noreferrer">
            SalonBoard
          </Link>
          <p className="pt-3 text-xs text-foreground/55">© {new Date().getFullYear()} Flourb Nagoya</p>
        </div>
      </div>
    </footer>
  );
}

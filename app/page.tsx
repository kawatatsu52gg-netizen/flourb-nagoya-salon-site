import {
  Hero,
  Pain,
  Concept,
  Method,
  Proof,
  Testimonials,
  Pricing,
  Faq,
  Closing,
  Footer
} from "@/components/sections";

const localBusinessJsonLd = {
  "@context": "https://schema.org",
  "@type": "HealthAndBeautyBusiness",
  name: "Flourb（フラーブ名古屋）",
  url: "https://flourb.com",
  image: "https://flourb.com/placeholders/hero-visual.jpg",
  address: {
    "@type": "PostalAddress",
    streetAddress: "錦2-16-24 サン・伏見ビル1003",
    addressLocality: "名古屋市中区",
    addressRegion: "愛知県",
    postalCode: "460-0003",
    addressCountry: "JP"
  },
  telephone: "000-0000-0000",
  areaServed: "名古屋市",
  makesOffer: [
    {
      "@type": "Service",
      name: "小顔矯正フェイシャル",
      offers: { "@type": "Offer", priceCurrency: "JPY", price: "10000" }
    },
    {
      "@type": "Service",
      name: "プレミアム小顔矯正",
      offers: { "@type": "Offer", priceCurrency: "JPY", price: "13000" }
    },
    {
      "@type": "Service",
      name: "ハーブピーリング×小顔セット",
      offers: { "@type": "Offer", priceCurrency: "JPY", price: "20000" }
    }
  ]
};

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }}
      />
      <main>
        <Hero />
        <Pain />
        <Concept />
        <Method />
        <Proof />
        <Testimonials />
        <Pricing />
        <Faq />
        <Closing />
      </main>
      <Footer />
    </>
  );
}

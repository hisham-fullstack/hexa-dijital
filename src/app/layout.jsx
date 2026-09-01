import { ViewTransitions } from "next-view-transitions";
import Script from "next/script";
import { Space_Grotesk } from "next/font/google";
import "./globals.css";
import Providers from "@/components/Providers";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Preloader from "@/components/layout/Preloader";
import WhatsAppButton from "@/components/layout/WhatsAppButton";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
  variable: "--font-space",
});

export const metadata = {
  title: "Hexa Dijital | Bursa Web Tasarım, Yazılım ve Reklam Ajansı",
  description:
    "Müşteri kaybettiren eski sitelere son. Telefonda saniyesinde açılan web siteleri, akılda kalıcı logolar ve restoran otomasyonları inşa ediyoruz.",
  verification: {
    other: {
      "p:domain_verify": "ffb3a15647d59f50d37e03043eb6217a",
      "impact-site-verification": "9ed688cf-51c0-44f4-9761-d9d9cbd3e6c0",
    },
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "Hexa Dijital",
  url: "https://hexadijital.com",
  logo: "https://hexadijital.com/assets/logos/hexa_logo.svg",
  image: "https://hexadijital.com/assets/logos/hexa_logo.svg",
  description:
    "Bursa merkezli işletmelere doğrudan müşteri kazandıran web, yazılım ve marka çözümleri üreten yeni nesil ajans.",
  telephone: "+905537161958",
  priceRange: "$$",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Bursa",
    addressCountry: "TR",
  },
  areaServed: [
    { "@type": "Country", name: "Türkiye" },
    { "@type": "City", name: "Bursa" },
  ],
  sameAs: [
    "https://www.instagram.com/hexadijital",
    "https://www.linkedin.com/company/hexadijital",
  ],
};

export default function RootLayout({ children }) {
  return (
    <ViewTransitions>
      <html lang="tr" suppressHydrationWarning>
        <head>
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
          />
        </head>
        <body
          className={`${spaceGrotesk.className} ${spaceGrotesk.variable}`}
          suppressHydrationWarning
        >
          <Script
            src="https://www.googletagmanager.com/gtag/js?id=G-2C1CWMLDYY"
            strategy="afterInteractive"
          />
          <Script id="google-analytics" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){window.dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-2C1CWMLDYY');
            `}
          </Script>

          <Providers>
            <Preloader />
            <div className="app-container">
              <Header />
              <main>{children}</main>
              <WhatsAppButton />
              <Footer />
            </div>
          </Providers>
        </body>
      </html>
    </ViewTransitions>
  );
}

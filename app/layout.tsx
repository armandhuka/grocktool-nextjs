import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";

// Components
import Header from "./components/Header";
import Footer from "./components/Footer";
import { ThemeProvider } from "./components/ThemeProvider";

const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: {
    default: "GrockTool – 150+ Free Online Tools for Developers & Creators",
    template: "%s | GrockTool",
  },
  description:
    "GrockTool provides 150+ free online tools including text utilities, converters, calculators, QR & barcode tools. Fast, secure and no signup required.",
  metadataBase: new URL("https://www.grocktool.com"),
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Google Tag Manager */}
        <Script id="gtm-script" strategy="afterInteractive">
          {`
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-KBJH4VB5');
          `}
        </Script>

        {/* ✅ Organization Identity Schema */}
        <Script
          id="organization-schema"
          type="application/ld+json"
          strategy="afterInteractive"
        >
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            "@id": "https://www.grocktool.com/#organization",
            name: "GrockTool",
            url: "https://www.grocktool.com",
            logo: "https://www.grocktool.com/logo.png",
            description:
              "GrockTool is a free online tools platform offering 150+ utilities for developers and creators.",
            email: "grocktool@gmail.com",
            sameAs: [
              "https://www.instagram.com/grocktool",
              "https://www.facebook.com/grocktool"
            ],
          })}
        </Script>
      </head>

      <body className={`${inter.variable} font-sans antialiased`}>
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-KBJH4VB5"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          ></iframe>
        </noscript>
        <ThemeProvider>
          <Header />
          <main>{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}

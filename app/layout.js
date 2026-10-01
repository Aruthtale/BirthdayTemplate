import { Playfair_Display, Cormorant_Garamond, Quicksand } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["500", "700"],
  style: ["normal", "italic"],
  variable: "--font-playfair",
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "600"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

const quicksand = Quicksand({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-quicksand",
  display: "swap",
});

export const metadata = {
  title: "A Special Gift",
  description: "A special digital gift — sebuah surat kecil, buku yang bisa dibalik halaman.",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: "cover",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="id"
      className={`${playfair.variable} ${cormorant.variable} ${quicksand.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}

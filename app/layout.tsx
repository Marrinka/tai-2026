import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Тёплый январь · Таиланд 2026–2027",
  description: "Наш план зимовки: море, скалы и время для себя. Перелёты, жильё, карта, календарь и связанный бюджет.",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body className="antialiased">{children}</body>
    </html>
  );
}

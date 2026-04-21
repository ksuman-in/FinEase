import "./globals.css";

export const metadata = {
  title: "FinEase | Secure Ledger Sync",
  description: "Your journey to 1 Crore starts here.",
  icons: {
    icon: "/favicon.ico",
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body
        suppressHydrationWarning
        className="bg-app-foreground text-app-bg antialiased max-h-screen"
      >
        <main className="relative">{children}</main>
      </body>
    </html>
  );
}

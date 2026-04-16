import "./globals.css";

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

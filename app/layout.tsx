import "./globals.css";

export const metadata = {
  title: "KNIT",
  description: "A living doctrine for decentralised democratic infrastructure.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
import "./globals.css";

export const metadata = {
  title: "knit",
  description: "Building tools to incrementally rewire how policy input, deliberation, and decision-making occur.",
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
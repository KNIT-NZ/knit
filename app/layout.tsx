import "./globals.css";
import ProgressBar from "@/components/ProgressBar";

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
      <body>
        <ProgressBar />
        {children}
      </body>
    </html>
  );
}
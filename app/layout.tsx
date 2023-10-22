import Link from "next/link";

export const metadata = {
  title: "Next.js",
  description: "Generated by Next.js",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Link href="/">
          <h1>Szymon's blog</h1>
        </Link>
        {children}
      </body>
    </html>
  );
}

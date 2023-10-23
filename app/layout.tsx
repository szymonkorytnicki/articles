import Link from "next/link";
import { Open_Sans } from "next/font/google";

export const metadata = {
  title: "Articles",
};

const openSans = Open_Sans({
  subsets: ["latin"],
  display: "swap",
});

export default function RootLayout({ children, modal }: { children: React.ReactNode; modal: React.ReactNode }) {
  return (
    <html lang="en" className={openSans.className}>
      <body>
        <Link href="/">
          <h1>Szymon reads</h1>
        </Link>
        {children}
        {modal}
      </body>
    </html>
  );
}

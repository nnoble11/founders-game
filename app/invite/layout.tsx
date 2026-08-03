import type { Metadata, Viewport } from "next";
import "./invite.css";

export const metadata: Metadata = {
  title: "Founders Game",
  description: "By invitation only.",
  robots: {
    index: false,
    follow: false,
    noarchive: true,
    nocache: true,
  },
  openGraph: {
    title: "Founders Game",
    description: "By invitation only.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Founders Game",
    description: "By invitation only.",
  },
};

export const viewport: Viewport = {
  themeColor: "#101310",
  colorScheme: "dark",
};

export default function InviteLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}

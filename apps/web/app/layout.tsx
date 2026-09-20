import type { Metadata } from 'next';
import './globals.css';
export const metadata: Metadata = { title: 'BMZ Trade Lab | Trade with intent', description: 'A private, disciplined trading journal for serious traders.' };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) { return <html lang="en" suppressHydrationWarning><body>{children}</body></html>; }


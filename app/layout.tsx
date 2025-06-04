import type { Metadata } from 'next';
import './globals.css';
import Link from 'next/link';
import { getSession } from '@/lib/auth';
import dict from '@/i18n/en.json';

export const metadata: Metadata = {
  title: 'Prax',
  description: 'Healthcare data analytics training platform',
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const session = await getSession();
  return (
    <html lang="en">
      <body className="antialiased">
        {process.env.NEXT_PUBLIC_GA_ID && (
          <script
            async
            src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
          />
        )}
        {process.env.NEXT_PUBLIC_GA_ID && (
          <script
            dangerouslySetInnerHTML={{
              __html: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${process.env.NEXT_PUBLIC_GA_ID}');`,
            }}
          />
        )}
        <header className="p-4 border-b flex justify-between">
          <Link href="/" className="font-bold text-green-700">Prax</Link>
          <nav>
            {session ? (
              <Link href="/api/auth/signout" className="underline mr-2">{dict.signOut}</Link>
            ) : (
              <Link href="/api/auth/signin" className="underline">{dict.signIn}</Link>
            )}
          </nav>
        </header>
        <main className="p-4 max-w-3xl mx-auto">{children}</main>
      </body>
    </html>
  );
}

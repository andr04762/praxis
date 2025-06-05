import type { Metadata } from 'next';
import './globals.css';
import Link from 'next/link';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import dict from '@/i18n/en.json';

export const metadata: Metadata = {
  title: 'Prax',
  description: 'Healthcare data analytics training platform',
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions);
  return (
    <html lang="en" className="h-full">
      <body className="min-h-full flex flex-col bg-gray-50">
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
        <header className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
            <Link href="/" className="text-2xl font-bold text-green-700 hover:text-green-900 transition-colors">
              Prax
            </Link>
            <nav className="flex items-center gap-6">
              <Link href="/courses" className="text-gray-600 hover:text-gray-900 transition-colors">
                Courses
              </Link>
              {session ? (
                <>
                  <Link href="/dashboard" className="text-gray-600 hover:text-gray-900 transition-colors">
                    Dashboard
                  </Link>
                  <Link 
                    href="/api/auth/signout" 
                    className="bg-gray-100 px-4 py-2 rounded-lg text-gray-700 hover:bg-gray-200 transition-colors"
                  >
                    {dict.signOut}
                  </Link>
                </>
              ) : (
                <Link 
                  href="/api/auth/signin" 
                  className="bg-green-700 text-white px-4 py-2 rounded-lg hover:bg-green-800 transition-colors"
                >
                  {dict.signIn}
                </Link>
              )}
            </nav>
          </div>
        </header>
        <main className="flex-1 py-8">{children}</main>
        <footer className="bg-gray-900 text-gray-400 py-12">
          <div className="max-w-7xl mx-auto px-4">
            <p className="text-center">© {new Date().getFullYear()} Prax. All rights reserved.</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
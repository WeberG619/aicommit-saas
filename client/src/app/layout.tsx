import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from 'react-hot-toast';
import { SafeAuthProvider } from '@/providers/safe-auth-provider';
import { ThemeProvider } from '@/providers/theme-provider';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Git Commit AI - Professional Commit Messages with AI",
  description: "Transform your Git commits from mundane to meaningful with AI-powered commit message generation. Perfect for developers who value clean, consistent commit history.",
  keywords: 'git, commit, ai, developer tools, productivity, commit messages',
  openGraph: {
    title: 'Git Commit AI',
    description: 'AI-powered Git commit message generator',
    url: 'https://gitcommit-ai.com',
    siteName: 'Git Commit AI',
    images: [
      {
        url: 'https://gitcommit-ai.com/og-image.png',
        width: 1200,
        height: 630,
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                  document.documentElement.classList.add('dark')
                } else {
                  document.documentElement.classList.remove('dark')
                }
              } catch (_) {}
            `,
          }}
        />
      </head>
      <body className={inter.className}>
        <ThemeProvider>
          <SafeAuthProvider>
            {children}
            <Toaster 
              position="top-right"
              toastOptions={{
                duration: 4000,
                style: {
                  background: '#333',
                  color: '#fff',
                },
              }}
            />
          </SafeAuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

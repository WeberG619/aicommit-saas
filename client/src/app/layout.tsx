import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from '@/providers/auth-provider';

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
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
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
        </AuthProvider>
      </body>
    </html>
  );
}

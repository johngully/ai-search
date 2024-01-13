import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'AI Assisted Search',
  description: 'Search for products using natural language',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="py-8 px-24">
          <header className="mb-6">
            <h1 className="text-2xl font-extrabold">
              <img src="openai.svg" className="w-8 h-8 mr-1 mb-1 inline-block" />
              AI Assisted Search
            </h1>
          </header>
          <div className="bg-gray-50 border-gray-200 border rounded-xl shadow-2xl p-8">{children}</div>
        </div>
      </body>
    </html>
  )
}

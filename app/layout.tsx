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
        <div className="flex flex-col min-h-screen py-8 px-24">
          <div className="mb-6 flex-shrink-0"> {/* This ensures the header doesn't grow */}
            <h1 className="text-2xl font-extrabold">
              <img src="openai.svg" className="w-8 h-8 mr-1 mb-1 inline-block" />
              AI Assisted Search
            </h1>
          </div>
          <div id="foo" className="flex-grow bg-gray-50 border-gray-200 border rounded-xl shadow-2xl p-8">
            {children}
          </div>
        </div>

      </body>
    </html>
  )
}

import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Link from 'next/link'

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
          <div className="mb-6 flex-shrink-0 flex items-center"> {/* This ensures the header doesn't grow */}
            <Link href={"/"} className="text-2xl font-extrabold flex-grow">
              <img src="openai.svg" className="w-8 h-8 mr-1 mb-1 inline-block" />
              AI Assisted Search
            </Link>
            <Link href={"/settings"} className="min-w-24 flex items-center justify-end hover:underline"><img src="settings.svg" className="w-4 mr-1.5" />Settings</Link>
            {/* <button type="submit" aria-disabled={pending} className={`flex items-center justify-center rounded-lg p-2 px-6 font-light text-white border-gray-200 bg-[#33CC99] bg-opacity-80 hover:bg-opacity-100 shadow-md hover:shadow-lg hover:contrast-more ml-2 ${className}`}>{children}</button> */}
          </div>
          <div id="foo" className="flex-grow bg-gray-50 border-gray-200 border rounded-xl shadow-2xl p-8">
            {children}
          </div>
        </div>

      </body>
    </html>
  )
}

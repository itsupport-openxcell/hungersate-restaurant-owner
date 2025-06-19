import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Hungersate Website',
  description: 'Created with React Js and Tailwind CSS',
  generator: 'React Js and Tailwind CSS',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}

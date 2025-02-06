import { Inter } from 'next/font/google'
import "app/globals.css"; 

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Min Applikation',
  description: 'En Next.js applikation',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="sv">
      <body className={`${inter.className} min-h-screen flex items-center justify-center bg-white`}>
        {children}
      </body>
    </html>
  )
}

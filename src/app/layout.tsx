import { ClerkProvider } from '@clerk/nextjs'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Desabafa Aqui',
  description: 'Um lugar para desabafar e compartilhar seus pensamentos',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <html lang="pt-BR">
        <body className={inter.className}>
          <main className="min-h-screen bg-gray-100">
            {children}
          </main>
        </body>
      </html>
    </ClerkProvider>
  )
} 
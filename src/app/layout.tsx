'use client'

import React from 'react'
import { TdpClientContextProvider } from 'src/contexts'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <TdpClientContextProvider>{children}</TdpClientContextProvider>
      </body>
    </html>
  )
}

'use client'

import React from 'react'
import { TdpClientContextProvider } from 'src/contexts'

import 'src/styles/globals.css'

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

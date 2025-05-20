'use client'

import React from 'react'
import { ReactQueryProvider } from './ReactQueryProvider'

export const Providers = ({ children }: { children: React.ReactNode }) => {
  return <ReactQueryProvider>{children}</ReactQueryProvider>
}

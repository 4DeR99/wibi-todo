'use client'

import { useRequireAuth } from '@/hooks/useRequireAuth'
import { LayoutBase } from '@/types'
import { Header } from '@/components/Shared/Header'

const HomeLayout = ({ children }: LayoutBase) =>
  useRequireAuth(() => (
    <main>
      <Header />
      {children}
    </main>
  ))

export default HomeLayout

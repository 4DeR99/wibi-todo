'use client'

import { useRequireAuth } from '@/hooks/useRequireAuth'
import { LayoutBase } from '@/types'

const HomeLayout = ({ children }: LayoutBase) =>
  useRequireAuth(() => <main>{children}</main>)

export default HomeLayout

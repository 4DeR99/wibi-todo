import { Container } from '@/components/System/Container'
import React, { useCallback } from 'react'
import Logo from '@/public/svgs/logo.svg'
import Image from 'next/image'
import { Button } from '@/components/System/Button'
import { Role } from '@/types'
import AdminAvatar from '@/public/images/avatar-admin.jpg'
import UserAvatar from '@/public/images/avatar-user.jpg'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/hooks/useAuth'
export const Header = () => {
  const { role, logout, username } = useAuth()
  const router = useRouter()

  const handleLogout = useCallback(() => {
    logout()
    router.push('/login')
  }, [logout, router])

  return (
    <header className="w-full ~/xl:~py-[2rem]/[3.125rem]">
      <Container className="flex justify-between items-center">
        <Image
          src={Logo}
          alt="logo"
          width={Logo.width}
          height={Logo.height}
        />
        <Button
          onClick={handleLogout}
          variant="ghost"
          size="icon"
          className="flex gap-2.5 items-center"
        >
          <span>{username}</span>
          <Image
            src={role === Role.ADMIN ? AdminAvatar : UserAvatar}
            alt="admin avatar"
            width={AdminAvatar.width}
            height={AdminAvatar.height}
            className="rounded-full ~size-[2rem]/[3rem]"
          />
        </Button>
      </Container>
    </header>
  )
}

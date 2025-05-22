'use client'

import React from 'react'
import Logo from '@/public/svgs/logo.svg'
import Image from 'next/image'
import { Label } from '@/components/System/Label'
import { Input } from '@/components/System/Input'
import { PasswordInput } from '@/components/System/PasswordInput'
import { Button } from '@/components/System/Button'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { schema, LoginSchema } from './LoginSchema'
import { useApiForm } from '@/hooks/useApiForm'
import { apiRoutes } from '@/config/apiRoutes'
import { AxiosError } from 'axios'
import { useRouter } from 'next/navigation'
import { Role } from '@/types'
import { useAuth } from '@/hooks/useAuth'

interface LoginResponse {
  user: {
    username: string
    token: string
    role: Role
  }
}

export const LoginForm = () => {
  const { login } = useAuth()
  const form = useForm<LoginSchema>({
    resolver: yupResolver(schema),
  })
  const router = useRouter()

  const {
    isPending,
    onSubmit,
    error: formApiError,
    reset,
  } = useApiForm<LoginSchema, LoginResponse, LoginSchema>({
    url: apiRoutes.auth.login,
    form,
    afterApiCall: (response) => {
      login(response.user.token, response.user.role, response.user.username)
      router.push('/tasks')
    },
  })

  const loginError = (formApiError as AxiosError<{ error: string }>)?.response
    ?.data.error

  const {
    register,
    formState: { errors },
  } = form
  return (
    <div className="w-[85%] max-w-[380px] border-accent border rounded-[25px] flex flex-col items-center p-6">
      <Image
        src={Logo}
        alt="logo"
        width={Logo.width}
        height={Logo.height}
        className="mb-12"
      />
      <form
        onSubmit={onSubmit}
        className="flex flex-col w-full"
      >
        <h2 className="font-bold mb-8 text-2xl text-center">Login</h2>
        <div className="mb-3">
          <Label className="mb-2.5">Email</Label>
          <Input
            placeholder="username"
            type="text"
            className="mb-1"
            {...register('username', {
              onChange: () => reset(),
            })}
          />
          {errors.username && (
            <p className="text-red-500 text-sm">{errors.username.message}</p>
          )}
        </div>
        <div className="mb-5">
          <Label className="mb-2.5">Password</Label>
          <PasswordInput
            placeholder="••••••••••••"
            type="password"
            className="mb-1"
            {...register('password', {
              onChange: () => reset(),
            })}
          />
          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password.message}</p>
          )}
        </div>
        {loginError && (
          <p className="text-red-500 text-sm mb-3">{loginError}</p>
        )}
        <Button
          size="lg"
          type="submit"
          isLoading={isPending}
        >
          Login
        </Button>
      </form>
    </div>
  )
}

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

export const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginSchema>({
    resolver: yupResolver(schema),
  })

  const { isLoading, onSubmit } = useApiForm({
    url: apiRoutes.auth.login,
    form: useForm<LoginSchema>({
      resolver: yupResolver(schema),
    }),
  })

  return (
    <div className="w-[85%] max-w-[380px] border-accent border rounded-[25px] flex flex-col items-center p-6">
      <Image
        src={Logo}
        alt="logo"
        width={Logo.width}
        height={Logo.height}
        className="mb-12"
      />
      <form onSubmit={onSubmit}>
        <h2 className="font-bold mb-8 text-2xl text-center">Login</h2>
        <Label className="mb-2.5">Email</Label>
        <Input
          placeholder="username"
          type="text"
          className="mb-3"
          {...register('userName')}
        />
        <Label className="mb-2.5">Password</Label>
        <PasswordInput
          placeholder="••••••••••••"
          type="password"
          className="mb-5"
          {...register('password')}
        />
        <Button
          size="lg"
          type="submit"
        >
          Login
        </Button>
      </form>
    </div>
  )
}

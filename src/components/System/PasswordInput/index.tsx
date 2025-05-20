'use client'
import { cn } from '@/lib/utils'
import React, { useState } from 'react'
import EyeOn from '@/public/svgs/eye-on.svg'
import EyeOff from '@/public/svgs/eye-off.svg'
import Image from 'next/image'

export interface PasswordInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

export const PasswordInput = ({ className, ...props }: PasswordInputProps) => {
  const [showPassword, setShowPassword] = useState(false)

  return (
    <div
      className={cn(
        'flex  w-full border-none p-[15px] focus:outline-none rounded-[15px] bg-light-grey',
        className,
      )}
    >
      <input
        className="grow border-none focus:outline-none bg-transparent"
        {...props}
        type={showPassword ? 'text' : 'password'}
      />
      <button onClick={() => setShowPassword(!showPassword)}>
        <Image
          src={showPassword ? EyeOff : EyeOn}
          alt="eye"
          width={24}
          height={23}
        />
      </button>
    </div>
  )
}

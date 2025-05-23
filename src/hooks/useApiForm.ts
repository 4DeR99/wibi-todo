'use client'

import { api } from '@/config/api'
import { useMutation } from '@tanstack/react-query'
import { AxiosResponse } from 'axios'
import { useCallback } from 'react'
import { FieldValues, UseFormReturn } from 'react-hook-form'
import { useAuth } from './useAuth'

interface UseApiFormProps<
  // for some reason I have to do this again otherwise react hook form complains
  FormData extends FieldValues,
  ResponseType,
  RequestType,
> {
  method?: 'post' | 'put' // only need these two for now
  url: string
  form: UseFormReturn<FormData>
  beforeApiCall?: (values: FormData) => Promise<RequestType> | RequestType
  afterApiCall?: (response: ResponseType) => Promise<void> | void
  onError?: (error: Error) => void
}

export function useApiForm<
  FormData extends FieldValues,
  ResponseType,
  RequestType,
>({
  method = 'post',
  url,
  form, // from react hook form
  beforeApiCall,
  afterApiCall,
  onError = (error) => error,
}: UseApiFormProps<FormData, ResponseType, RequestType>) {
  const { token } = useAuth()

  const { mutate, isPending, error, reset } = useMutation<
    AxiosResponse<ResponseType>,
    Error,
    FormData
  >({
    mutationFn: async (values: FormData) => {
      const request = beforeApiCall
        ? await beforeApiCall(values)
        : (values as unknown as RequestType)
      return api[method](
        url,
        { ...request },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      )
    },
    onError: (error) => {
      onError(error as Error)
    },
    onSuccess: async (data) => {
      afterApiCall ? await afterApiCall(data.data) : data
    },
  })

  const onSubmit = form.handleSubmit(
    useCallback(
      async (values: FormData) => {
        mutate(values)
      },
      [form, beforeApiCall, afterApiCall, url],
    ),
  )

  return { onSubmit, isPending, error, reset }
}

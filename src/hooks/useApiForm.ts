import axios from 'axios'
import { useCallback, useState } from 'react'
import { FieldValues, UseFormReturn } from 'react-hook-form'

interface UseApiFormProps<
  // for some reason I have to do this again otherwise react hook form complains
  FormData extends FieldValues,
  ResponseType,
  RequestType,
> {
  url: string
  form: UseFormReturn<FormData>
  beforeApiCall?: (values: FormData) => Promise<RequestType> | RequestType
  afterApiCall?: (response: ResponseType) => Promise<void> | void
  onError?: (error: Error) => void
}

export function useApiForm<
  FormData extends FieldValues,
  ResponseType = FormData,
  RequestType = FormData,
>({
  url,
  form, // from react hook form
  beforeApiCall,
  afterApiCall,
  onError = (error) => error,
}: UseApiFormProps<FormData, ResponseType, RequestType>) {
  const [isLoading, setIsLoading] = useState(false)

  const onSubmit = form.handleSubmit(
    useCallback(
      async (values: FormData) => {
        try {
          const request = beforeApiCall
            ? await beforeApiCall(values)
            : (values as unknown as RequestType)
          setIsLoading(true)
          const response = await axios.post(url, request)
          afterApiCall ? await afterApiCall(response.data) : response.data
        } catch (error) {
          onError(error as Error)
        } finally {
          setIsLoading(false)
        }
      },
      [form, beforeApiCall, afterApiCall, url],
    ),
  )

  return { isLoading, onSubmit }
}

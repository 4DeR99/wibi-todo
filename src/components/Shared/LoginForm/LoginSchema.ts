import * as yup from 'yup'

export const schema = yup.object().shape({
  username: yup.string().required('Username is required'),
  password: yup.string().required('Password is required'),
})

export type LoginSchema = yup.InferType<typeof schema>

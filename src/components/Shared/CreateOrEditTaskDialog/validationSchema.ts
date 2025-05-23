import * as yup from 'yup'

export const schema = yup.object().shape({
  title: yup
    .string()
    .required('Title is required')
    .max(75, 'Title must be less than 75 characters'),
  description: yup
    .string()
    .max(200, 'Description must be less than 200 characters')
    .required('Description is required'),
  assignedTo: yup.string().required('Assigned to is required'),
  status: yup.string().required(), // placeholder for status
})

export type CreateTaskType = yup.InferType<typeof schema>

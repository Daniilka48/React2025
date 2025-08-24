import * as yup from 'yup';

export const formSchema = yup.object({
  name: yup
    .string()
    .required('Name is required')
    .matches(/^[A-Z][a-zA-Z]*$/, 'Name must start with an uppercase letter'),
  age: yup
    .number()
    .typeError('Age must be a number')
    .min(0, 'Age cannot be negative')
    .required('Age is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup
    .string()
    .required('Password is required')
    .matches(/[0-9]/, 'Password must contain at least one number')
    .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
    .matches(
      /[!@#$%^&*(),.?":{}|<>]/,
      'Password must contain at least one special character'
    ),
  confirmPassword: yup
    .string()
    .required('Confirm your password')
    .oneOf([yup.ref('password')], 'Passwords must match'),
  gender: yup.string().required('Select a gender'),
  acceptedTnC: yup
    .boolean()
    .required('You must accept the Terms and Conditions')
    .oneOf([true], 'You must accept the Terms and Conditions'),
  country: yup.string().required('Country is required'),
  image: yup
    .mixed<File>()
    .required('Image is required')
    .test('fileSize', 'File too large', (value) => {
      const file =
        value instanceof File ? value : (value?.[0] as File | undefined);
      return !!file && file.size <= 2 * 1024 * 1024;
    })
    .test('fileFormat', 'Unsupported Format', (value) => {
      const file =
        value instanceof File ? value : (value?.[0] as File | undefined);
      return !!file && ['image/jpeg', 'image/png'].includes(file.type);
    }),
});

export type FormSchemaType = yup.InferType<typeof formSchema>;

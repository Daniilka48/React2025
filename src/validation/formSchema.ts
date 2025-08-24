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
  picture: yup
    .string()
    .required('Image is required')
    .test(
      'is-base64',
      'Invalid image',
      (value) => !!value && value.startsWith('data:image/')
    )
    .test('file-size', 'File too large (max 2MB)', (value) => {
      if (!value) return false;
      const sizeInBytes =
        (value.length * 3) / 4 -
        (value.endsWith('==') ? 2 : value.endsWith('=') ? 1 : 0);
      return sizeInBytes <= 2 * 1024 * 1024;
    })
    .test('file-format', 'Unsupported format', (value) => {
      if (!value) return false;
      return /^data:image\/(jpeg|png)/.test(value);
    }),
});

export type FormSchemaType = yup.InferType<typeof formSchema>;

import { z } from 'zod';

const startsWithLetterSchema = z.string().regex(/^[a-zA-Z]/, {
  message: 'Username must start with a letter',
});

const validCharactersSchema = z.string().regex(/^[a-zA-Z0-9_]*$/, {
  message:
    'Username can only contain alphanumeric, characters, and underscores',
});

const REGISTER = z
  .object({
    username: z
      .string()
      .min(6, { message: 'Username must be at least 6 characters long' })
      .max(30, { message: 'Username must be at most 30 characters long' })
      .and(startsWithLetterSchema)
      .and(validCharactersSchema),
    email: z.string().min(1, { message: 'Email has to be filled' }).email(),
    password: z
      .string()
      .min(8, { message: 'Password must be at least 8 characters long' })
      .max(100, { message: 'Password must be at most 100 characters long' }),
    confirmPassword: z
      .string()
      .min(8, {
        message: 'Confirm password must be at least 8 characters long',
      })
      .max(100, {
        message: 'Confirm password must be at most 100 characters long',
      }),
    name: z
      .string()
      .min(1, { message: 'Name has to be filled' })
      .max(100, { message: 'Name must be at most 100 characters long' })
      .regex(/^[a-zA-Z\s]*$/, 'Name must contain only letters and blank spaces'),
    phoneNumber: z
      .string()
      .min(10, {
        message: 'Phone number must be at least 10 characters long',
      })
      .max(12, { message: 'Phone number must be at most 12 characters long' })
      .regex(/^[0-9]+$/, {
        message:
          'Phone number must be a valid indonesian number',
      }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Password must match',
    path: ['confirmPassword'],
  });

const formConfig = [{
  controlId: 'username',
  label: 'Username',
  name: 'username',
  type: 'text',
  placeholder: 'Username'
}, {
  controlId: 'email',
  label: 'Email',
  name: 'email',
  type: 'text',
  placeholder: 'Email'

}, {
  controlId: 'password',
  label: 'Password',
  name: 'password',
  type: 'password',
  placeholder: 'Password'
}, {
  controlId: 'confirmPassword',
  label: 'Confirm Password',
  name: 'confirmPassword',
  type: 'password',
  placeholder: 'Confirm Password'
}, {
  controlId: 'name',
  label: 'Name',
  name: 'name',
  type: 'text',
  placeholder: 'Full Name'
}, {
  controlId: 'phoneNumber',
  label: 'Phone Number',
  name: 'phoneNumber',
  type: 'text',
  prefix: '+62',
  placeholder: 'Phone Number'
}];

export default { formConfig, REGISTER };

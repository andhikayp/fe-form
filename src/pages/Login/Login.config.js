import { z } from 'zod';

const startsWithLetterSchema = z.string().regex(/^[a-zA-Z]/, {
  message: 'Username must start with a letter',
});

const validCharactersSchema = z.string().regex(/^[a-zA-Z0-9_]*$/, {
  message:
    'Username can only contain alphanumeric, characters, and underscores',
});

const LOGIN = z
  .object({
    userId: z
      .string()
      .min(6, { message: 'User ID must be at least 6 characters long' })
      .max(30, { message: 'User ID must be at most 30 characters long' })
      .and(startsWithLetterSchema)
      .and(validCharactersSchema),
    password: z
      .string()
      .min(8, { message: 'Password must be at least 8 characters long' })
      .max(100, { message: 'Password must be at most 100 characters long' }),
    corporateAccountNumber: z
      .string()
      .min(8, {
        message: 'Corporate Account Number must be at least 8 characters long',
      })
      .max(12, { message: 'Corporate Account Number must be at most 12 characters long' })
  });

const formConfig = [{
  controlId: 'corporateAccountNumber',
  label: 'Corporate Account No.',
  name: 'corporateAccountNumber',
  type: 'text',
  placeholder: 'Corporate Account No.',
  isPassword: false
}, {
  controlId: 'userId',
  label: 'User ID',
  name: 'userId',
  type: 'text',
  placeholder: 'User ID',
  isPassword: false
}, {
  controlId: 'password',
  label: 'Login Password',
  name: 'password',
  type: 'password',
  placeholder: 'Login Password',
  isPassword: true
}];

export default { formConfig, LOGIN };

import { z } from 'zod';
import { IoIosArrowDown } from 'react-icons/io';

const startsWithLetterSchema = z.string().regex(/^[a-zA-Z]/, {
  message: 'Username must start with a letter',
});

const validCharactersSchema = z.string().regex(/^[a-zA-Z0-9_]*$/, {
  message:
    'Username can only contain alphanumeric, characters, and underscores',
});

const REGISTER = z
  .object({
    userId: z
      .string()
      .min(6, { message: 'User ID must be at least 6 characters long' })
      .max(30, { message: 'User ID must be at most 30 characters long' })
      .and(startsWithLetterSchema)
      .and(validCharactersSchema),
    username: z
      .string()
      .min(8, { message: 'Username must be at least 8 characters long' })
      .max(100, { message: 'Username must be at most 100 characters long' }),
    email: z
      .string()
      .min(1, { message: 'Email is required' })
      .max(100, { message: 'Email must be at most 100 characters long' }),
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
    role: z
      .string()
      .min(1, { message: 'Role is required' }),
    corporateName: z
      .string()
      .min(8, { message: 'Corporate Name must be at least 8 characters long' })
      .max(100, { message: 'Corporate Name must be at most 100 characters long' }),
    verificationCode: z
      .string()
      .min(6, { message: 'Verification code must be at least 6 characters long' }),
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
    corporateAccountNumber: z
      .string()
      .min(8, {
        message: 'Corporate Account Number must be at least 8 characters long',
      })
      .max(12, { message: 'Corporate Account Number must be at most 12 characters long' })
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Password must match',
    path: ['confirmPassword'],
  });

const formConfig = (renderSubmitOtp) => [{
  controlId: 'corporateAccountNumber',
  label: 'Corporate Account No.',
  name: 'corporateAccountNumber',
  type: 'text',
  placeholder: 'Corporate Account No.',
  isPassword: false
}, {
  controlId: 'corporateName',
  label: 'Corporate Name',
  name: 'corporateName',
  type: 'text',
  placeholder: 'Corporate Name',
  isPassword: false
}, {
  controlId: 'userId',
  label: 'User ID',
  name: 'userId',
  type: 'text',
  placeholder: 'User ID',
  isPassword: false
}, {
  controlId: 'username',
  label: 'User Name',
  name: 'username',
  type: 'text',
  placeholder: 'User Name',
  isPassword: false
}, {
  controlId: 'role',
  label: 'Role',
  name: 'role',
  type: 'dropdown',
  placeholder: 'Role',
  isPassword: false
}, {
  controlId: 'phoneNumber',
  label: 'Phone No.',
  name: 'phoneNumber',
  type: 'text',
  placeholder: 'Phone No.',
  isPassword: false,
  prefix:
  <div>
    <span>+62</span>
    <IoIosArrowDown />
  </div>
}, {
  controlId: 'email',
  label: 'Email',
  name: 'email',
  type: 'text',
  placeholder: 'Email',
  isPassword: false,
}, {
  controlId: 'verificationCode',
  label: 'Verification Code',
  name: 'verificationCode',
  type: 'text',
  placeholder: 'Verification Code',
  isPassword: false,
  suffix: renderSubmitOtp
}, {
  controlId: 'password',
  label: 'Password',
  name: 'password',
  type: 'password',
  placeholder: 'Password',
  isPassword: true
}, {
  controlId: 'confirmPassword',
  label: 'Confirm Password',
  name: 'confirmPassword',
  type: 'password',
  placeholder: 'Confirm Password',
  isPassword: true
}];

export default { formConfig, REGISTER };

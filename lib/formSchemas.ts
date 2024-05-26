import { z } from 'zod';

export const registerFormSchema = z.object({
  username: z.string().min(2, {
    message: 'Username must be at least 2 characters.',
  }),
  location: z.string().min(2, {
    message: 'Location must be at least 2 characters.',
  }),
  password: z.string().min(8, {
    message: 'Password must be at least 8 characters.',
  }),
});

export const loginFormSchema = z.object({
  username: z.string().min(1, {
    message: 'Username is required.',
  }),
  location: z.string().min(2, {
    message: 'Location is required.',
  }),
  password: z.string().min(8, {
    message: 'Password is required.',
  }),
});

'use client';

import { signIn } from '@/auth';

import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import Link from 'next/link';
import dbConnect from '@/lib/dbConnect';

const signInSchema = z.object({
  username: z.string({ required_error: 'Username is required' }).min(2, {
    message: 'Username must be at least 2 characters.',
  }),
  password: z.string({ required_error: 'Password is required' }).min(8),
});

const SignIn = () => {
  const router = useRouter();

  const form = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      username: '',
      password: '',
    },
  });

  async function handleLogin(values: z.infer<typeof signInSchema>) {}

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleLogin)}
        className="space-y-4 my-2"
      >
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-red-800 focus:border-red-800 block w-full p-2.5"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-red-800 focus:border-red-800 block w-full p-2.5"
                  type="password"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <hr></hr>
        <div className="w-full flex justify-center">
          <Button
            className=" w-full bg-gray-50 p-3 text-sm text-gray-900 font-medium hover:bg-red-200 hover:text-red-800"
            type="submit"
          >
            Login
          </Button>
        </div>
        <div className="text-xs pt-2 font-medium text-gray-500 ">
          Not registered?{' '}
          <Link className="text-red-800 hover:underline" href="#">
            Create account
          </Link>
        </div>
      </form>
    </Form>
  );
};

export default SignIn;

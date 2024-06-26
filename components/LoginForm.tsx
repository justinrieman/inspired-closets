'use client';

import { SubmitHandler, useForm } from 'react-hook-form';
import { useFormState } from 'react-dom';
import { useRef } from 'react';
import { z } from 'zod';
import { userLogin } from '@/lib/actions';
import { loginFormSchema } from '@/lib/formSchemas';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';

type LoginFormFields = z.infer<typeof loginFormSchema>;

const LoginForm = () => {
  const [state, formAction] = useFormState(userLogin, {
    message: '',
  });

  const form = useForm<LoginFormFields>({
    resolver: zodResolver(loginFormSchema),
  });

  const {
    register,
    formState: { errors, isSubmitting },
  } = form;

  const formRef = useRef<HTMLFormElement>(null);

  return (
    <form
      ref={formRef}
      // action={formAction}
      onSubmit={form.handleSubmit((data) => formAction(data))}
    >
      <div className="flex flex-col gap-2 mt-2">
        <label htmlFor="username">Username</label>
        <input
          {...register('username')}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-red-800 focus:border-red-800 block w-full p-2.5"
          type="text"
        />
        {errors.username && (
          <div className="text-red-500 text-xs">{errors.username.message}</div>
        )}
        <label htmlFor="location">Location</label>
        <input
          {...register('location')}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-red-800 focus:border-red-800 block w-full p-2.5"
          type="location"
        />
        {errors.location && (
          <div className="text-red-500 text-xs">{errors.location.message}</div>
        )}
        <label htmlFor="password">Password</label>

        <input
          {...register('password')}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-red-800 focus:border-red-800 block w-full p-2.5"
          type="password"
        />
        {errors.password && (
          <div className="text-red-500 text-xs">{errors.password.message}</div>
        )}
        {state?.message !== '' && state?.message !== 'Go to dashboard' && (
          <div className="text-red-500 text-xs">{state.message}</div>
        )}
        {state?.message === 'Go to dashboard' && (
          <Link
            href="/dashboard"
            className="text-xs text-center my-2 hover:bg-red-200 p-2 rounded-md bg-gray-50"
          >
            Go to dashboard
          </Link>
        )}
        <hr className="mt-2"></hr>
        <button
          className=" w-full bg-gray-50 p-3 text-sm text-gray-900 font-medium hover:bg-red-200 hover:text-red-800"
          type="submit"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Logging in ...' : 'Log in'}
        </button>
      </div>
    </form>
  );
};

export default LoginForm;

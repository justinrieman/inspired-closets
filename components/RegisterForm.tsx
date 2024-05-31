'use client';

import { SubmitHandler, useForm } from 'react-hook-form';
import { useFormState } from 'react-dom';
import { useRef } from 'react';
import { z } from 'zod';
import { registerUser } from '@/lib/actions';
import { registerFormSchema } from '@/lib/formSchemas';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';

type RegisterFormFields = z.infer<typeof registerFormSchema>;

const RegisterForm = () => {
  const [state, formAction] = useFormState(registerUser, {
    message: '',
  });

  const form = useForm<RegisterFormFields>({
    resolver: zodResolver(registerFormSchema),
  });

  const {
    register,
    handleSubmit,
    setError,
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
        {state?.message !== '' && state?.message !== 'New account created.' && (
          <div className="text-red-500 text-xs">{state.message}</div>
        )}
        {state?.message === 'New account created.' && (
          <div className="flex justify-between items-center mt-2 px-4">
            <div className="text-red-800 text-xs">{state.message}</div>
            <Link
              href="/login"
              className="text-xs hover:bg-red-300 p-2 rounded-md bg-red-200 text-red-800"
            >
              Login
            </Link>
          </div>
        )}
        <hr className="mt-2"></hr>
        <button
          className=" w-full bg-gray-50 p-3 text-sm text-gray-900 font-medium hover:bg-red-200 hover:text-red-800"
          type="submit"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Creating Account...' : 'Create Account'}
        </button>
      </div>
    </form>
  );
};

export default RegisterForm;

'use server';

import bcrypt from 'bcrypt';
import dbConnect from './dbConnect';
import User from './models/User';
import { registerFormSchema } from './formSchemas';
import { cookies } from 'next/headers';

export type UserFormState = {
  message: string;
};

type UserFormData = {
  username: string;
  location: string;
  password: string;
};

export async function registerUser(
  prevState: UserFormState,
  data: UserFormData
): Promise<UserFormState> {
  const newUser = {
    username: data.username,
    location: data.location,
    password: data.password,
  };

  const parsed = registerFormSchema.safeParse(newUser);

  if (!parsed.success) {
    return {
      message: 'Invalid form data',
    };
  }

  newUser.username = newUser.username.trim().toLowerCase();
  newUser.location = newUser.location.trim().toLowerCase();
  newUser.password = await bcrypt.hash(data.password, 10);

  await dbConnect();
  await User.create(newUser);

  return {
    message: 'New account created.',
  };
}

export async function userLogin(
  prevState: UserFormState,
  data: UserFormData
): Promise<UserFormState> {
  const userData = {
    username: data.username,
    location: data.location,
    password: data.password,
  };

  const parsed = registerFormSchema.safeParse(userData);

  if (!parsed.success) {
    return {
      message: 'Invalid form data',
    };
  }

  console.log(userData);

  await dbConnect();

  const foundUser = await User.findOne({
    username: userData.username.trim().toLowerCase(),
    location: userData.location.trim().toLowerCase(),
  });

  if (!foundUser) {
    return {
      message: 'User not found.',
    };
  }

  //   //If user is good to go
  //     const expires = new Date(Date.now() + 10 * 1000);
  //     const session = await encrypt({foundUser, expires})

  //     cookies().set('session', session, { expires, httpOnly: true})

  return {
    message: 'User signed in.',
  };
}

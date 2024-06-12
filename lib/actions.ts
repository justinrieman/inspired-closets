'use server';

import bcrypt from 'bcrypt';
import dbConnect from './dbConnect';
import User from './models/User';
import { registerFormSchema } from './formSchemas';
import { SignJWT, jwtVerify } from 'jose';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { EXPIRATION_TIME_IN_SECONDS } from './constants';
import { revalidatePath } from 'next/cache';

const secretKey = process.env.MY_SECRET_JWT;
const key = new TextEncoder().encode(secretKey);

export type UserFormState = {
  message: string;
};

type UserFormData = {
  username: string;
  location: string;
  password: string;
};

export async function encrypt(payload: any) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime(`${EXPIRATION_TIME_IN_SECONDS} sec`)
    .sign(key);
}

export async function decrypt(input: string): Promise<any> {
  const { payload } = await jwtVerify(input, key, {
    algorithms: ['HS256'],
  });
  return payload;
}

export async function registerUser(
  prevState: UserFormState,
  data: UserFormData
): Promise<UserFormState> {
  const newUser = {
    username: data.username,
    location: data.location,
    password: data.password,
    role: 'admin',
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

  try {
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

    const passwordMatch = await bcrypt.compare(
      userData.password,
      foundUser.password
    );

    if (!passwordMatch) {
      return {
        message: 'Password does not match.',
      };
    }

    foundUser.password = '';

    const expires = new Date(Date.now() + EXPIRATION_TIME_IN_SECONDS * 1000);
    const session = await encrypt({ foundUser, expires });

    cookies().set('session', session, { expires, httpOnly: true });

    return {
      message: 'Go to dashboard',
    };
  } catch (error) {
    console.log(error);
    return {
      message: 'Something went wrong.',
    };
  }
}

export async function userSignOut() {
  cookies().set('session', '', { expires: new Date(0) });
}

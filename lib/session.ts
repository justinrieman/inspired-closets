import { cookies } from 'next/headers';
import { decrypt, encrypt } from './actions';
import { NextRequest, NextResponse } from 'next/server';

export async function getSession() {
  const jwt = await cookies().get('session')?.value;
  if (!jwt) return null;
  const session = await decrypt(jwt);
  return session.foundUser;
}

export async function updateSession(request: NextRequest) {
  const session = request.cookies.get('session')?.value;
  if (!session) return;

  //Refresh the session so it doesn't expire
  const parsed = await decrypt(session);
  parsed.expires = new Date(Date.now() + 10 * 1000);
  const res = NextResponse.next();
  res.cookies.set({
    name: 'session',
    value: await encrypt(parsed),
    httpOnly: true,
    expires: parsed.expires,
  });
  return res;
}

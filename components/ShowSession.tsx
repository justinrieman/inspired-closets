import { getSession } from '@/lib/session';
import React from 'react';

const ShowSession = async () => {
  const session = await getSession();
  console.log(session);

  return (
    <div>
      <h1>Session Details : </h1>
      {session && (
        <div>
          <h1>Username</h1>
          <p>{session.username}</p>
          <h1>Location</h1>
          <p>{session.location}</p>
        </div>
      )}
    </div>
  );
};

export default ShowSession;

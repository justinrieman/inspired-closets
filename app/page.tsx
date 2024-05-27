import Link from 'next/link';

export default function Home() {
  return (
    <div>
      <h1 className="text-xl">Home Page</h1>
      <div className="flex gap-5 border mt-2">
        <Link href="/">Home</Link>
        <Link href="/dashboard">Dashboard</Link>
        <Link href="/login">Login</Link>
        <Link href="/register">Register</Link>
      </div>
    </div>
  );
}

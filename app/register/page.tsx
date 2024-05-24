import RegisterForm from '@/components/RegisterForm';
import Image from 'next/image';

const RegisterPage = () => {
  return (
    <>
      <div className="w-full h-screen flex flex-col justify-center items-center gap-10 bg-gray-50">
        <Image
          src="/inspired-logo.svg"
          alt="Vercel Logo"
          width={120}
          height={100}
          priority
        />
        <div className="w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 ">
          <h5 className="text-xl mb-2 text-center mx-auto font-medium text-gray-900">
            Create Account
          </h5>
          <hr></hr>
          <RegisterForm />
        </div>
      </div>
    </>
  );
};

export default RegisterPage;

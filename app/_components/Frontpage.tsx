import React from 'react';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { useAppDispatch, useAppSelector } from '../redux/store';

const FrontPage: React.FC = () => {
    const { data: session } = useSession();


    return (
        <div className="bg-gray-100  flex flex-col justify-center items-center">
            {!session && <div className="max-w-3xl w-full px-4">
                <header className="py-8">
                    <h1 className="text-3xl font-bold text-blue-500">Paytm</h1>
                </header>
                <main className="bg-white p-8 rounded shadow-md">
                    <h2 className="text-xl font-semibold mb-4">Send Money to Friends and Family</h2>
                    <p className="text-gray-800 mb-6">Log in or create an account to start sending money securely with Paytm.</p>
                    <div className="flex justify-center">
                        <Link href="/Login" className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-6 rounded-md shadow-md transition duration-300">Log in</Link>
                        <Link href="/Signup" className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-6 ml-4 rounded-md shadow-md transition duration-300">Sign up</Link>
                    </div>
                </main>
            </div>}
            {session && <div className="max-w-3xl w-full px-4">Access Forbidden</div>}
        </div>
    );
};

export default FrontPage;

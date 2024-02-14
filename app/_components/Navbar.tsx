"use client";
import React, { useEffect, useState } from 'react';
// import { getServerSession, Session } from 'next-auth';
// import { options } from '../api/auth/[...nextauth]/options';
import Link from "next/link";
import { useSession } from 'next-auth/react';
import { signOut } from 'next-auth/react';
import { useRecoilValue } from 'recoil';
import {userAtom} from '@/app/store/atoms/atoms';

const Navbar: React.FC =  () => {

  const { data: session } = useSession();
  let val = useRecoilValue(userAtom);

  useEffect(() => {
    console.log("session is ", session);
    console.log("val is ", val);
    
    return () => {
      
    }
  }, [session])

  const handleSignout = async () => {
    await signOut();
  }
  

  return (
    <nav className="bg-blue-500 py-4">
    <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
      <div className="flex-shrink-0">
        <Link href="/" className="text-white text-xl font-bold">
          Paytm
        </Link>
      </div>
      <div className="flex space-x-4">
        <Link href="/" className="text-white font-semibold hover:text-gray-300">
          Home
        </Link>
        <Link href="/transfer" className="text-white font-semibold hover:text-gray-300">
          Transfer Money
        </Link>
        {session && <h1   className="text-white font-semibold hover:text-gray-300 cursor-pointer" onClick={handleSignout}>
          Logout
        </h1>}
        {!session && <Link href="/Login"  className="text-white font-semibold hover:text-gray-300">
          Login
        </Link>}
      </div>
    </div>
  </nav>
  );
};

export default Navbar;

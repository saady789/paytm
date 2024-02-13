"use client";
import React, { useEffect, useState } from 'react';
// import { getServerSession, Session } from 'next-auth';
// import { options } from '../api/auth/[...nextauth]/options';
import Link from "next/link";
import { useSession } from 'next-auth/react';
const Navbar: React.FC =  () => {

  const { data: session } = useSession();

  useEffect(() => {
    console.log("session is ", session);
    
    return () => {
      
    }
  }, [session])
  

  return (
    <div className='w-full h-16 bg-blue-500 flex justify-start items-center'>
      {session && <Link href="/api/auth/signout?callbackUrl=/" className='ml-4 font-semibold text-white text-xl cursor-pointer rounded-md p-2 hover:text-neutral-200'>Logout</Link>}
      {!session && <Link href="/api/auth/signin" className='ml-4 font-semibold text-white text-xl cursor-pointer rounded-md p-2 hover:text-neutral-200'>Login</Link>}
      <h1 className='ml-4 font-semibold text-white text-xl cursor-pointer'> Please login/signup to continue </h1>
    </div>
  );
};

export default Navbar;

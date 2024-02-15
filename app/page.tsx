"use client"
import Image from "next/image";
import Navbar from "./_components/Navbar";
import { trpc } from "./_trpc/Client";
import { serverClient} from "./_trpc/Serverclient";
import { useAppDispatch,useAppSelector } from "./redux/store";
import { setCurrentUser } from "./redux/userSlice";
import { useSession } from 'next-auth/react';
import { useEffect } from "react";

export default function Home() {

  const { data: session } = useSession();
  const dispatch = useAppDispatch();

  useEffect(() => {
 
    if(session) {
      dispatch(setCurrentUser(session.user));
    }
    return () => {
      
    }
  }, [session])

  // const test =  trpc.user.createPost.useMutation();
  // const d = await test.mutateAsync();
  // console.log(d);




  return (
    <div className="" >
      <Navbar />
    </div>
  );
}

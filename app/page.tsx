"use client"
import Image from "next/image";
import Navbar from "./_components/Navbar";
import { trpc } from "./_trpc/Client";
import { serverClient } from "./_trpc/Serverclient";
import { useAppDispatch, useAppSelector } from "./redux/store";
import { setCurrentUser, setAllUser } from "./redux/userSlice";
import { useSession } from 'next-auth/react';
import { useEffect } from "react";
import Homepage from "@/app/_components/Homepage";
import FrontPage from "./_components/Frontpage";

export default function Home() {
  const allUsers = trpc.user.getAllUsers.useMutation();
  const { data: session } = useSession();
  const dispatch = useAppDispatch();
  let input = useAppSelector((state) => state.user.currentUser);

  const getAllUsers = async (id: number) => {
    const d = await allUsers.mutateAsync(id);
    dispatch(setAllUser(d.payload));

  }

  useEffect(() => {

    if (session) {
      dispatch(setCurrentUser(session.user));
      if (input && input.id) getAllUsers(input.id);
    }
    return () => {

    }
  }, [session])



  return (
    <div className="" >
      <Navbar />
      {session && <Homepage />}
      {!session && <FrontPage />}
    </div>
  );
}

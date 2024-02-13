"use client"
import Image from "next/image";
import Navbar from "./_components/Navbar";
import { trpc } from "./_trpc/Client";
import { serverClient} from "./_trpc/Serverclient";

export default async function Home() {
  // const test =  trpc.user.createPost.useMutation();
  // const d = await test.mutateAsync();
  // console.log(d);




  return (
    <div className="" >
      <Navbar />
    </div>
  );
}

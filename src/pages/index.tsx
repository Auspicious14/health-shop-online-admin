import Head from "next/head";
import { useSession, signOut } from "next-auth/react";
import { HomePage } from "../modules/home/page";
export default function Home() {
  const session: any = useSession();
  console.log(session);
  return (
    <>
      <h1 className="bg-red-400 text-3xl capitalize font-bold">
        health shop online
      </h1>
      {session && <div>{session.name}</div>}
      <button onClick={() => signOut()}>Sign Out</button>
      {/* <HomePage /> */}
    </>
  );
}

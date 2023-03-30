import Head from "next/head";
import { HomePage } from "../modules/home/page";
import { deleteCookie, getCookie } from "../helper";
import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();
  const handleSignOut = () => {
    const userId = getCookie("user_id");
    console.log(userId);
    if (getCookie("user_id")) {
      deleteCookie("user_id", -1);
      router.push("/auth/login");
    }
  };
  return (
    <>
      <h1 className="bg-red-400 text-3xl capitalize font-bold">
        health shop online
      </h1>
      <button onClick={() => handleSignOut()}>Sign Out</button>
      {/* <HomePage /> */}
    </>
  );
}

import Head from "next/head";
import { HomePage } from "../modules/home/page";
import { deleteCookie, getCookie } from "../helper";
import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();

  return (
    <>
      <HomePage />
    </>
  );
}

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

export const getServerSideProps = async ({
  req,
  query,
}: {
  req: any;
  query: any;
}) => {
  const parse = JSON.parse(req?.cookies.user_id);
  if (!parse.isAdmin) {
    return {
      redirect: {
        destination: "/auth/login",
        permenant: false,
      },
    };
  }
  return {
    props: {},
  };
};

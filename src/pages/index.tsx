import Head from "next/head";
import { HomePage } from "../modules/home/page";
import { MainLayout } from "../modules/layout";
import jwt from "jsonwebtoken";

const tokenSecret: any = process.env.JWT_SECRET;
interface IProps {
  user: { id: string; isAdmin: boolean };
}

export default function Home({ user }: IProps) {
  return (
    <MainLayout userId={user.id}>
      <HomePage />
    </MainLayout>
  );
}

export const getServerSideProps = async ({
  req,
  query,
}: {
  req: any;
  query: any;
}) => {
  const cookie = req?.cookies?.token;
  if (!cookie) {
    return {
      redirect: {
        destination: "/auth/login",
        permenant: false,
      },
    };
  }
  const token: any = jwt.verify(cookie, tokenSecret);

  if (!token?.isAdmin) {
    return {
      redirect: {
        destination: "/auth/login",
        permenant: false,
      },
    };
  }
  return {
    props: {
      user: token || null,
    },
  };
};

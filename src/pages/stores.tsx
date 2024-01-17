import React from "react";
import { StorePage } from "../modules/store/page";
import { MainLayout } from "../modules/layout";

const Stores = () => {
  return (
    <>
      <MainLayout>
        <StorePage />
      </MainLayout>
    </>
  );
};

export default Stores;

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
  // console.log(id);
  return {
    props: {},
  };
};

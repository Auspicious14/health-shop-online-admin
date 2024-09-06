import React from "react";
import { BlogPage } from "../../modules/blog/page";
import jwt from "jsonwebtoken";
import { StoreLayoutV2 } from "../../modules/store/layout/layout";
import { BlogContextProvider } from "../../modules/blog/context";

const tokenSecret: any = process.env.JWT_SECRET;

interface IProps {
  store: { id: string; isAdmin: boolean };
}

const StoreBlog: React.FC<IProps> = ({ store }) => {
  return (
    <StoreLayoutV2 userId={store.id}>
      <BlogContextProvider>
        <BlogPage storeId={store.id} />
      </BlogContextProvider>
    </StoreLayoutV2>
  );
};

export default StoreBlog;

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

  if (token?.isAdmin) {
    return {
      redirect: {
        destination: "/auth/login",
        permenant: false,
      },
    };
  }

  return {
    props: {
      store: token,
    },
  };
};

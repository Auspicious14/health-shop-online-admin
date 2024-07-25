import React from "react";
import jwt from "jsonwebtoken";
import { StoreLayout } from "../../modules/store/layout";
import { ProductPage } from "../../modules/product/page";

const tokenSecret: any = process.env.JWT_SECRET;

interface IProps {
  store: { id: string; isAdmin: boolean };
}
const Product: React.FC<IProps> = ({ store }) => {
  return (
    <StoreLayout>
      <ProductPage storeId={store.id} />
    </StoreLayout>
  );
};

export default Product;
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
      store: token,
    },
  };
};

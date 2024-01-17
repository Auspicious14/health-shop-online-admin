import React from "react";
import { StoreContextProvider } from "../../../modules/store/context";
import { CreateStorePage } from "../../../modules/store/components/create";
import { apiReqHandler } from "../../../components";

interface IProps {
  valid: boolean;
}
const GenerateInviteLink: React.FC<IProps> = ({ valid }) => {
  return (
    <>
      {valid && (
        <StoreContextProvider>
          <CreateStorePage />
        </StoreContextProvider>
      )}
    </>
  );
};

export default GenerateInviteLink;

export const getServerSideProps = async ({
  req,
  query,
}: {
  req: any;
  query: any;
}) => {
  const res = await apiReqHandler({
    endPoint: `${process.env.NEXT_PUBLIC_API_ROUTE}/auth/validate`,
    method: "POST",
    payload: JSON.stringify({ inviteCode: query?.inviteLink }),
  });

  const valid = res?.res?.data?.valid;
  if (!valid) {
    return {
      redirect: {
        permanent: false,
        destination: "/not-found",
      },
    };
  }
  return {
    props: { valid: valid || null },
  };
};

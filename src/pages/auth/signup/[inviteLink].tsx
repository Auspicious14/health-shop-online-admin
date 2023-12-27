import React from "react";
import { SignUpContextProvider } from "../../../modules/auth/signup/context";
import { SignUpPage } from "../../../modules/auth/signup/page";
import { apiReqHandler } from "../../../components";

interface IProps {
  valid: boolean;
}
const GenerateInviteLink: React.FC<IProps> = ({ valid }) => {
  return (
    <>
      {valid && (
        <SignUpContextProvider>
          <SignUpPage />
        </SignUpContextProvider>
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
    payload: JSON.stringify({ inviteCode: query.inviteLink }),
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

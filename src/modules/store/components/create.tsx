import { Form, Formik, FormikProps } from "formik";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import { ApBackgroundImage, ApTextInput } from "../../../components";
import { useStoreState } from "../context";
import Section from "../../../../public/images/Section.png";
import { Button, Space, UploadProps } from "antd";
import { StoreBasicInfo } from "./create/basic-info";
import { StoreIdentity } from "./create/identity";
import { IStoreFile } from "../model";
import { FormSchema } from "./create/validation";
import { StoreBusinessInfo } from "./create/business-info";
import { SocialMedia, SocialMediaDetail } from "./create/social-media";
import { StorePayment } from "./create/payment";

export const CreateStorePage = () => {
  const { createStore, loading } = useStoreState();
  const router = useRouter();
  const [files, setFiles] = useState<IStoreFile[]>([]);
  const [logos, setLogos] = useState<any>(null);
  const [show, setShow] = useState<{
    show: boolean;
    type?:
      | "basic-info"
      | "identity"
      | "business-info"
      | "payment"
      | "social-media";
  }>({ show: false, type: "basic-info" });

  const handleRoute = (type: any) => {
    setShow({ show: true, type });
  };

  const handleSelectIdImage: UploadProps["onChange"] = ({
    fileList: newFileList,
  }: any) => {
    console.log(newFileList);
    setFiles(newFileList);
  };

  const handleSelectStoreLogo: UploadProps["onChange"] = ({
    fileList: newFileList,
  }: any) => {
    console.log(newFileList, "newFIleListt");
    setLogos(newFileList);
  };

  const handleSubmit = async (values: any) => {
    const { confirmPassword, ...vals } = values;
    const payload = {
      ...vals,
      // socialMedia: vals.socialMedia,
      images: logos.map((l: any) => ({
        uri: l?.thumbUrl,
        name: l?.name,
        type: l?.type,
      })),
      identificationImage: files.map((l: any) => ({
        uri: l?.thumbUrl,
        name: l?.name,
        type: l?.type,
      })),
      accountType: "storeOwner",
    };

    console.log(payload, "payload");
    const res = createStore(payload);
    res.then((rs: any) => {
      if (rs) router.push("/auth/login");
    });
  };

  console.log(show);

  return (
    <div className="flex justify-between">
      <div className="ml-4 mt-12 w-1/2">
        <h2 className="my-6  text-center text-3xl font-bold tracking-tight text-gray-900">
          Sign up
        </h2>
        <Formik
          initialValues={{
            firstName: "",
            lastName: "",
            email: "",
            storePhoneNumber: "",
            whatsAppNumber: "",
            storeName: "",
            password: "",
            confirmPassword: "",
            storeAddress: "",
            policy: "",
            storeType: "",
            bankName: "",
            bankAccountNumber: "",
            bankAccountName: "",
            businessNumber: "",
            socialMedia: [{ profileName: "", profileLink: "", platform: "" }],
          }}
          validationSchema={FormSchema}
          onSubmit={handleSubmit}
        >
          {(props: FormikProps<any>) => (
            <Form className=" Form card px-4 ">
              {show.type === "basic-info" && (
                <StoreBasicInfo
                  onPrevious={() => handleRoute("basic-info")}
                  onNext={() => handleRoute("business-info")}
                />
              )}
              {show.show && show.type === "business-info" && (
                <StoreBusinessInfo
                  onPrevious={() => handleRoute("basic-info")}
                  onNext={() => handleRoute("identity")}
                />
              )}
              {show.show && show.type === "identity" && (
                <StoreIdentity
                  idImage={files}
                  storeLogo={logos}
                  handleSelectIdImage={handleSelectIdImage}
                  handleSelectStoreLogo={handleSelectStoreLogo}
                  onPrevious={() => handleRoute("business-info")}
                  onNext={() => handleRoute("social-media")}
                />
              )}
              {show.show && show.type === "social-media" && (
                <SocialMedia
                  onPrevious={() => handleRoute("identity")}
                  onNext={() => handleRoute("payment")}
                  // index={2}
                  onAdd={() =>
                    props.setFieldValue("socialMedia", [
                      ...props.values.socialMedia,
                      {
                        platform: "",
                        profileName: "",
                        profileLink: "",
                      },
                    ])
                  }
                  onRemove={(index: number) =>
                    props.setFieldValue(
                      "socialMedia",
                      props?.values?.socialMedia?.filter(
                        (s: any, i: number) => i != index
                      )
                    )
                  }
                  socialMediaForm={props.values.socialMedia}
                />
              )}

              {show.show && show.type === "payment" && (
                <StorePayment
                  onPrevious={() => handleRoute("social-media")}
                  onNext={() => handleRoute("payment")}
                />
              )}
              {show.type === "payment" && (
                <Button
                  type="primary"
                  size="large"
                  htmlType="submit"
                  loading={loading}
                  className="group relative flex w-full justify-center rounded-md bg-[#2158E8] px-3 py-2 my-4 text-sm font-semibold text-white hover:bg-blue-500"
                >
                  Sign up
                </Button>
              )}
            </Form>
          )}
        </Formik>
      </div>
      <ApBackgroundImage src={Section.src} />
    </div>
  );
};

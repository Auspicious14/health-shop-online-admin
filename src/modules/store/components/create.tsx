import { Form, Formik, FormikProps } from "formik";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import { ApBackgroundImage, ApTextInput } from "../../../components";
import { useStoreState } from "../context";
import Section from "../../../../public/images/Section.png";
import { Button, Image, Space, UploadProps } from "antd";
import { StoreBasicInfo } from "./create/basic-info";
import { StoreIdentity } from "./create/identity";
import { IStoreFile } from "../model";
import { FormSchema } from "./create/validation";
import { StoreBusinessInfo } from "./create/business-info";
import { SocialMedia, SocialMediaDetail } from "./create/social-media";
import { StorePayment } from "./create/payment";
import VendifyLogo from "../../../../public/images/vendify logo white.jpg";

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
    setFiles(newFileList);
  };

  const handleSelectStoreLogo: UploadProps["onChange"] = ({
    fileList: newFileList,
  }: any) => {
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

    const res = createStore(payload);
    res.then((rs: any) => {
      if (rs) router.push("/auth/login");
    });
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 min-h-screen">
      <div className="md:max-w-2xl mx-auto w-full p-4 md:p-6">
        <div className="mb-8 text-center">
          <Image
            preview={false}
            src={VendifyLogo.src}
            alt="Vendify Logo"
            // width={200}
            height={100}
            // className="w-20 h-20 md:w-40 md:h-40 mx-auto mb-4"
          />
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
            Join Vendify Marketplace
          </h2>
          <p className="text-gray-600 mt-2 text-sm md:text-base">
            Create Your Seller Account in Minutes
          </p>
        </div>

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
            <Form className="space-y-6 px-4">
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
                  onRemove={(index: number) => {
                    if (props?.values?.socialMedia?.length <= 1) return;
                    props.setFieldValue(
                      "socialMedia",
                      props.values.socialMedia.filter(
                        (s: any, i: number) => i !== index
                      )
                    );
                  }}
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
                  className="w-full md:w-auto text-sm md:text-base px-4 py-2"
                >
                  Sign up
                </Button>
              )}
            </Form>
          )}
        </Formik>
      </div>
      <ApBackgroundImage
        src={Section.src}
        className="hidden md:block h-full w-full object-cover"
      />
    </div>
  );
};

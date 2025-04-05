import React, { useEffect, useState } from "react";
import { IStore, IStoreFile } from "./model";
import { Button, Card, Space, UploadProps } from "antd";
import { ApImage, ApTextInput, Files } from "../../components";
import { Form, Formik, FormikProps } from "formik";
import { useStoreState } from "./context";
import { SocialMedia } from "./components/create/social-media";

interface IProps {
  store: IStore;
}
export const StoreDetailPage: React.FC<IProps> = ({ store }) => {
  const { loading, updateStore } = useStoreState();
  const [storeIdImages, setStoreIdImages] = useState<any>(null);
  const [storeLogos, setStoreLogos] = useState<any>(null);

  useEffect(() => {
    if (store?.images && !!store?.images?.length) {
      setStoreLogos(
        store?.images?.map((s) => ({
          uri: s?.uri,
          name: s?.name,
          type: s?.type,
        }))
      );
    }

    if (store?.identificationImage && !!store?.identificationImage?.length) {
      setStoreIdImages(
        store?.identificationImage?.map((s) => ({
          thumbUrl: s?.uri,
          name: s?.name,
          type: s?.type,
        }))
      );
    }
  }, [store]);

  const handleSelectIdImage: UploadProps["onChange"] = ({
    fileList: newFileList,
  }: any) => {
    setStoreIdImages(newFileList);
  };

  const handleSelectStoreLogo: UploadProps["onChange"] = ({
    fileList: newFileList,
  }: any) => {
    setStoreLogos(newFileList);
  };

  const handleSubmit = (values: any) => {
    const payload = {
      ...values,
      images: storeLogos
        ? storeLogos.map((l: any) => ({
            uri: l?.thumbUrl,
            name: l?.name,
            type: l?.type,
          }))
        : [],
      identificationImage: storeIdImages
        ? storeIdImages.map((l: any) => ({
            uri: l?.thumbUrl,
            name: l?.name,
            type: l?.type,
          }))
        : [],
      accountType: "storeOwner",
    };
    updateStore(payload, store?._id);
  };

  return (
    <div>
      <h1>Store Details</h1>
      <Formik
        initialValues={{
          firstName: store?.firstName || "",
          lastName: store?.lastName || "",
          email: store?.email || "",
          storePhoneNumber: store?.storePhoneNumber || "",
          whatsAppNumber: store?.whatsAppNumber || "",
          storeName: store?.storeName || "",
          description: store?.description || "",
          storeAddress: store?.storeAddress || "",
          policy: store?.policy || "",
          storeType: store?.storeType || "",
          bankName: store?.bankName || "",
          bankAccountNumber: store?.bankAccountNumber || "",
          bankAccountName: store?.bankAccountName || "",
          businessNumber: store?.businessNumber || "",
          socialMedia: store?.socialMedia
            ? store?.socialMedia
            : [{ profileName: "", profileLink: "", platform: "" }],
        }}
        onSubmit={handleSubmit}
      >
        {(props: FormikProps<any>) => (
          <Form>
            <div className="">
              <ApImage
                alt="store image"
                width={500}
                src={
                  store?.images?.length > 0
                    ? store?.images[0]?.uri
                    : "https://images.pexels.com/photos/1727684/pexels-photo-1727684.jpeg?auto=compress&cs=tinysrgb&w=300"
                }
                className="object-cover"
              />
            </div>
            <Space className="block my-4">
              <Files
                fileList={storeIdImages}
                handleChange={(res) => handleSelectIdImage(res)}
              />
            </Space>
            <Space className="w-full grid grid-cols-2 my-4">
              <ApTextInput
                className="relative block w-full rounded-md border-0 py-1.5 px-2 outline-blue-500 ring-1 ring-inset ring-gray-200 sm:text-sm sm:leading-6"
                label="First Name"
                name="firstName"
                type="text"
                placeHolder="First Name"
              />
              <ApTextInput
                className="relative block w-full rounded-md border-0 py-1.5 px-2 outline-blue-500  ring-1 ring-inset ring-gray-200 sm:text-sm sm:leading-6"
                label="Last Name"
                name="lastName"
                type="text"
                placeHolder="Last Name"
              />
            </Space>
            <Space className="block">
              <ApTextInput
                className="relative block w-full rounded-md border-0 py-1.5 px-2 outline-blue-500  ring-1 ring-inset ring-gray-200 sm:text-sm sm:leading-6"
                label="Email"
                name="email"
                type="email"
                placeHolder="store@gmail.com"
              />
            </Space>
            <h1 className="font-bold text-3xl border-b my-4 py-2">
              Store Information
            </h1>
            <Space className="w-full grid grid-cols-2 ">
              <ApTextInput
                className="relative block w-full rounded-md border-0 py-1.5 px-2 outline-blue-500  ring-1 ring-inset ring-gray-200 sm:text-sm sm:leading-6"
                label="Store Name"
                name="storeName"
                type="text"
                placeHolder="Store Name"
              />
              <ApTextInput
                className="relative block w-full rounded-md border-0 py-1.5 px-2 outline-blue-500  ring-1 ring-inset ring-gray-200 sm:text-sm sm:leading-6"
                label="Business Reg No"
                name="businessNumber"
                type="text"
                placeHolder="089192929"
              />
            </Space>
            <Space className="w-full grid grid-cols-2 my-4">
              <ApTextInput
                className="relative block w-full rounded-md border-0 py-1.5 px-2 outline-blue-500  ring-1 ring-inset ring-gray-200 sm:text-sm sm:leading-6"
                label="Store Phone Number"
                name="storePhoneNumber"
                type="number"
                placeHolder="+2347*********"
              />
              <ApTextInput
                className="relative block w-full rounded-md border-0 py-1.5 px-2 outline-blue-500  ring-1 ring-inset ring-gray-200 sm:text-sm sm:leading-6"
                label="WhatsApp Number"
                name="whatsAppNumber"
                type="number"
                placeHolder="+2347*********"
              />
            </Space>
            <Space className="w-full grid grid-cols-2 my-4">
              <ApTextInput
                className="relative block w-full rounded-md border-0 py-1.5 px-2 outline-blue-500  ring-1 ring-inset ring-gray-200 sm:text-sm sm:leading-6"
                label="Store Address"
                name="storeAddress"
                type="text"
                placeHolder="No 4. John Doe street"
              />
              <ApTextInput
                className="relative block w-full rounded-md border-0 py-1.5 px-2 outline-blue-500  ring-1 ring-inset ring-gray-200 sm:text-sm sm:leading-6"
                label="Store Type"
                name="storeType"
                type="text"
                placeHolder="No 4. John Doe street"
              />
            </Space>
            <Space className="grid md:grid-cols-2 my-4 block">
              <ApTextInput
                className="relative block w-full rounded-md border-0 py-1.5 px-2 outline-blue-500  ring-1 ring-inset ring-gray-200 sm:text-sm sm:leading-6"
                label="Store Description"
                name="description"
                type="textarea"
                placeHolder=""
              />
              <ApTextInput
                className="relative block w-full rounded-md border-0 py-1.5 px-2 outline-blue-500  ring-1 ring-inset ring-gray-200 sm:text-sm sm:leading-6"
                label="Business Policy / Terms and Condition"
                name="policy"
                type="textarea"
                placeHolder=""
              />
            </Space>
            <h1 className="font-bold text-3xl border-b my-4 py-2">
              Social Media Information
            </h1>

            <SocialMedia
              socialMediaForm={props.values?.socialMedia}
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
            />
            <h1 className="font-bold text-3xl border-b my-4 py-2">
              Payment Information
            </h1>
            <Space className="w-full grid lg:grid-cols-3 grid-cols-2 ">
              <ApTextInput
                className="relative block w-full rounded-md border-0 py-1.5 px-2 outline-blue-500 ring-1 ring-inset ring-gray-200 sm:text-sm sm:leading-6"
                label="Bank Name"
                name="bankName"
                type="text"
                placeHolder="Kuda MFB"
              />
              <ApTextInput
                className="relative block w-full rounded-md border-0 py-1.5 px-2 outline-blue-500  ring-1 ring-inset ring-gray-200 sm:text-sm sm:leading-6"
                label="Account Name"
                name="bankAccountName"
                type="text"
                placeHolder="Your Account Name"
              />
              <ApTextInput
                className="relative block w-full rounded-md border-0 py-1.5 px-2 outline-blue-500  ring-1 ring-inset ring-gray-200 sm:text-sm sm:leading-6"
                label="Account Number"
                name="bankAccountNumber"
                type="text"
                placeHolder="098********"
              />
            </Space>

            <Button
              type="primary"
              size="large"
              htmlType="submit"
              loading={loading}
              className="group relative flex w-full justify-center rounded-md bg-[#2158E8] px-3 py-2 my-4 text-sm font-semibold text-white hover:bg-blue-500"
            >
              Submit
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

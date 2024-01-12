import React from "react";
import { IStore } from "../model";
import { Button } from "antd";
import { useStoreState } from "../context";
import { Form, Formik } from "formik";
import { ApTextInput } from "../../../components";

interface IProps {
  store: IStore;
  //   onClick: () => void
}
export const RejectStore: React.FC<IProps> = ({ store }) => {
  const { rejectStore, loading } = useStoreState();

  const handleSubmit = (values: any) => {
    rejectStore(store?._id, store?.email, values.remark);
  };

  return (
    <>
      <Formik initialValues={{ remark: "" }} onSubmit={handleSubmit}>
        <Form>
          <ApTextInput
            label="Remark"
            name="remark"
            type={"textarea"}
            placeHolder="Comment here..."
            className="rounded-md outline-none mt-2"
          />
          <button
            type="submit"
            disabled={loading}
            className="mt-3  w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
          >
            Save
          </button>
        </Form>
      </Formik>
    </>
  );
};

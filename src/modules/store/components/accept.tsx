import React from "react";
import { IStore } from "../model";
import { Button } from "antd";
import { useStoreState } from "../context";

interface IProps {
  store: IStore;
}
export const AcceptStore: React.FC<IProps> = ({ store }) => {
  const { acceptStore, loading } = useStoreState();

  const handleAcceptStore = () => {
    acceptStore(store?._id);
  };

  return (
    <>
      <button
        className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
        onClick={handleAcceptStore}
      >
        Accept Store
      </button>
    </>
  );
};

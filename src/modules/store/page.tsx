import React, { useEffect, useState } from "react";
import { useStoreState } from "./context";
import { IStore } from "./model";
import {
  DeleteOutlined,
  EditFilled,
  EyeOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { Space, Popconfirm, Typography, Input, Table, Button } from "antd";
import { ColumnsType } from "antd/es/table";
import { ApModal } from "../../components";
import { StoreDetailPage } from "./detail";
import { RejectStore } from "./components/reject";
import { EyeDropperIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/router";

const { Text } = Typography;
const Search = Input;

export const StorePage = () => {
  const router = useRouter();
  const { getStores, loading, deleteStore, stores, acceptStore } =
    useStoreState();
  const [search, setSearch] = useState<string>("");
  const [modal, setModal] = useState<{
    show: boolean;
    data?: any;
    type?: "reject" | "detail";
  }>({
    show: false,
  });

  useEffect(() => {
    getStores();
  }, []);

  const columns: ColumnsType<IStore> = [
    {
      title: "First Name",
      key: "fn",
      dataIndex: "firstName",
      width: "20%",
    },
    {
      title: "Last Name",
      key: "ln",
      dataIndex: "lastName",
      width: "20%",
    },
    {
      title: "Email",
      key: "email",
      dataIndex: "email",
      width: "25%",
    },
    {
      title: "Phone",
      key: "StorePhoneNumber",
      dataIndex: "storePhoneNumber",
      width: "15%",
    },
    {
      title: "Status",
      dataIndex: "accepted",
      key: "status",
      width: "10%",
      render: (_, { accepted }) => (
        <Text
          className={`${accepted ? "text-green-500" : "text-red-500"} 
          opacity-75 p-1 sm:p-2 rounded-md text-xs sm:text-base`}
        >
          {accepted ? "Accepted" : "Rejected"}
        </Text>
      ),
    },
    {
      title: "Actions",
      key: "action",
      width: "10%",
      render: (_, store) => (
        <Space className="flex gap-2 sm:gap-4 items-center">
          <Popconfirm
            title="Sure to delete?"
            onConfirm={() => deleteStore(store?._id)}
            okButtonProps={{
              style: { background: "rgb(37 99 235)" },
            }}
          >
            <DeleteOutlined />
          </Popconfirm>
          <Space>
            <EyeOutlined onClick={() => router.push(`/store/${store?._id}`)} />
          </Space>
          <Space>
            {store?.accepted === true ? (
              <button
                onClick={() => handleAcceptOrReject(store)}
                className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
              >
                {store?.accepted ? "Reject" : "Accept"}
              </button>
            ) : (
              <Popconfirm
                title="Proceed to Accept Store"
                onConfirm={() => acceptStore(store?._id)}
              >
                <button className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto">
                  {"Accept"}
                </button>
              </Popconfirm>
            )}
          </Space>
        </Space>
      ),
    },
  ];

  const filtered = stores?.filter((p) =>
    p?.storeName?.toLocaleLowerCase().includes(search.toLocaleLowerCase())
  );

  const handleAcceptOrReject = (store: IStore) => {
    if (store?.accepted === true) {
      setModal({ show: true, type: "reject", data: store });
    }
  };

  return (
    <>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center shadow-sm p-4 gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold">Stores</h1>
          <span className="text-sm sm:text-base">Keep track of vendors</span>
        </div>
        {/* <Search
          className="w-full sm:w-60"
          placeholder="Search store"
          prefix={<SearchOutlined className="text-gray-300" />}
          onChange={(e) => setSearch(e.target.value.toLocaleLowerCase())}
        /> */}
      </div>
      <div className="shadow-sm p-4 flex items-center justify-between">
        <h1 className=" font-bold">All Stores</h1>
        <Search
          className="w-60"
          placeholder="Search store"
          prefix={<SearchOutlined className="text-gray-300" />}
          onChange={(e) => setSearch(e.target.value.toLocaleLowerCase())}
        />
      </div>
      <div className="overflow-x-auto px-4">
        <Table
          columns={columns}
          dataSource={filtered}
          rowKey={(p) => p._id}
          pagination={{ pageSize: 50 }}
          scroll={{ x: 800 }}
          loading={loading}
          className="min-w-[800px] max-w-[100vw]"
          size="small"
        />
      </div>

      <ApModal
        title={modal.type === "detail" ? "Store Detail" : "Reject Store"}
        show={modal.show}
        onDimiss={() => setModal({ show: false })}
      >
        {modal.type === "detail" && <StoreDetailPage store={modal.data} />}
        {modal.type === "reject" && <RejectStore store={modal.data} />}
      </ApModal>
    </>
  );
};

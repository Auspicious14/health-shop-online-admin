import React, { useEffect, useState } from "react";
import { useStoreState } from "./context";
import { IStore } from "./model";
import { DeleteOutlined, EditFilled, SearchOutlined } from "@ant-design/icons";
import { Space, Popconfirm, Typography, Input, Table } from "antd";
import { ColumnsType } from "antd/es/table";
import { ApModal, SideNav } from "../../components";
import { StoreDetail } from "./detail";
import { AcceptStore } from "./components/accept";

const { Text } = Typography;
const Search = Input;

export const StorePage = () => {
  const { getStores, loading, deleteStore, stores } = useStoreState();
  const [search, setSearch] = useState<string>("");
  const [modal, setModal] = useState<{ show: boolean; data?: any }>({
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
    },
    {
      title: "Last Name",
      key: "ln",
      dataIndex: "lastName",
    },
    {
      title: "Email",
      key: "email",
      dataIndex: "email",
    },
    {
      title: "Store Phone Number",
      key: "StorePhoneNumber",
      dataIndex: "storePhoneNumber",
    },

    {
      title: "Accepted",
      dataIndex: "accepted",
      key: "status",
      render: (_, { accepted }) => {
        return (
          <Text
            className={
              accepted
                ? "bg-green-500 opacity-75"
                : "bg-red-500 opacity-75 p-2 border rounded-md text-white"
            }
          >
            {accepted ? "Accepted" : "Rejected"}
          </Text>
        );
      },
    },
    {
      title: "",
      key: "action",
      render: (_, store) => (
        <Space className="flex gap-8 items-center">
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
            <EditFilled onClick={() => setModal({ show: true, data: store })} />
          </Space>
        </Space>
      ),
    },
  ];

  const filtered = stores?.filter((p) =>
    p?.storeName?.toLocaleLowerCase().includes(search.toLocaleLowerCase())
  );

  return (
    <div className="flex w-full gap-4">
      <div className="w-[20%] h-screen border ">
        <SideNav />
      </div>
      <div className="w-[80%] mx-4">
        <div className="flex justify-between items-center shadow-sm p-4 ">
          <div>
            <h1 className="text-3xl font-bold">Stores</h1>
            <span>keep track of vendor</span>
          </div>
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
        <div>
          <Table
            //   rowSelection={rowSelection}
            columns={columns}
            dataSource={filtered}
            rowKey={(p) => p._id}
            pagination={{ pageSize: 50 }}
            scroll={{ y: 350 }}
            loading={loading}
          />
        </div>
      </div>

      <ApModal
        title={"Store Detail"}
        show={modal.show}
        onDimiss={() => setModal({ show: false })}
        otherProps={
          <div className="flex gap-20 mx-12">
            <AcceptStore store={modal.data} />
          </div>
        }
      >
        <StoreDetail store={modal.data} />
      </ApModal>
    </div>
  );
};

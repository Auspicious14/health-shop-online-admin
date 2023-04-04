import { Button, Card, Space, Table } from "antd";
import Search from "antd/es/input/Search";
import { ColumnsType } from "antd/es/table";
import Link from "next/link";
import React, { useState } from "react";
import { SideNav } from "../../components";

interface DataType {
  key: React.Key;
  name: string;
  age: number;
  address: string;
}

const columns: ColumnsType<DataType> = [
  {
    title: "id",
    dataIndex: "id",
  },
  {
    title: "Name",
    dataIndex: "name",
  },
  {
    title: "Product Name",
    dataIndex: "product Name",
  },
  {
    title: "Order Date",
    dataIndex: "date",
  },
  {
    title: "Qty",
    dataIndex: "qty",
  },
  {
    title: "Price",
    dataIndex: "price",
  },
  {
    title: "",
    key: "action",
    render: (_, record) => (
      <Space size="middle">
        <a>Delete</a>
      </Space>
    ),
  },
  {
    title: "",
    key: "edit",
    render: (_, record) => (
      <Space size="middle">
        <a>Edit</a>
      </Space>
    ),
  },
];

const data: DataType[] = [];
for (let i = 0; i < 46; i++) {
  data.push({
    key: i,
    name: `Edward King ${i}`,
    age: 32,
    address: `London, Park Lane no. ${i}`,
  });
}

export const OrderPage = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [loading, setLoading] = useState(false);
  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    console.log("selectedRowKeys changed: ", newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };
  const hasSelected = selectedRowKeys.length > 0;
  return (
    <div className="flex w-full gap-4">
      <div className="w-[20%] h-screen border ">
        <div className="pb-8">
          <Link href={"/"}>Logo</Link>
        </div>
        <SideNav />
      </div>
      <div className="w-[80%] mx-4">
        <div className="shadow-sm p-4 ">
          <h1 className="text-3xl font-bold">Orders</h1>
          <span>234 orders</span>
        </div>
        <div className="flex gap-8 my-4 items-center justify-around">
          {/* <Divider orientation="left">Responsive</Divider> */}
          <Card.Grid className="text-center w-[25%] shadow-md py-5 inset-3">
            <h1 className="text-sm">New Orders</h1>
            <h1 className="font-bold text-2xl">200</h1>
          </Card.Grid>
          <Card.Grid className="text-center w-[25%] shadow-md py-5 inset-3">
            <h1 className="text-sm">Pending Orders</h1>
            <h1 className="font-bold text-2xl">$200</h1>
          </Card.Grid>
          <Card.Grid className="text-center w-[25%] shadow-md py-5 inset-3">
            <h1 className="text-sm">Delivered Orders</h1>
            <h1 className="font-bold text-2xl">$200</h1>
          </Card.Grid>
        </div>
        <div className="shadow-sm p-4 flex items-center justify-between">
          <h1 className=" font-bold">All Orders</h1>
          <Search className="w-60" />
        </div>
        <div>
          {/* <div style={{ marginBottom: 16 }}>
            <Button
              type="primary"
            //   onClick={start}
              disabled={!hasSelected}
              loading={loading}
            >
              Reload
            </Button>
            <span style={{ marginLeft: 8 }}>
              {hasSelected ? `Selected ${selectedRowKeys.length} items` : ""}
            </span>
          </div> */}
          <Table
            rowSelection={rowSelection}
            columns={columns}
            dataSource={data}
          />
        </div>
      </div>
    </div>
  );
};

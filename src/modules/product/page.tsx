import { DeleteFilled, EditFilled, PlusOutlined } from "@ant-design/icons";
import { Button, Card, Space, Table, Input, Tag } from "antd";
import { ColumnsType } from "antd/es/table";
import Link from "next/link";
import React, { useState } from "react";
import { SideNav } from "../../components";
const Search = Input;
interface DataType {
  key: React.Key;
  productName: string;
  status: string;
  price: number;
  qty: number;
  Status: "instock" | "soldout";
  date: number;
  rating: number;
}

const columns: ColumnsType<DataType> = [
  {
    title: "id",
    dataIndex: "key",
  },

  {
    title: "Product Name",
    dataIndex: "productName",
  },
  {
    title: "Rating",
    dataIndex: "rating",
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
    title: "Status",
    dataIndex: "status",
    render: (_, { status }) => {
      let color = status === "instock" ? "blue" : "red";
      return <Tag color={color}>{status}</Tag>;
    },
  },
  {
    title: "",
    key: "action",
    render: (_, record) => (
      <Space size="middle">
        <DeleteFilled />
      </Space>
    ),
  },
  {
    title: "",
    key: "edit",
    render: (_, record) => (
      <Space size="middle">
        <EditFilled />
      </Space>
    ),
  },
];

const data: DataType[] = [];
for (let i = 0; i < 5; i++) {
  data.push({
    key: i,
    productName: "NikeAir Max",
    price: 3000,
    qty: 5,
    status: "soldout" || "instock",
    date: new Date().getDate(),
    Status: "instock",
    rating: 4,
  });
}

export const ProductPage = () => {
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
        <div className="flex justify-between items-center shadow-sm p-4 ">
          <div>
            <h1 className="text-3xl font-bold">Products</h1>
            <span>keep track of vendor</span>
          </div>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            className="bg-blue-600 items-center flex"
          >
            Add product
          </Button>
        </div>
        <div className="shadow-sm p-4 flex items-center justify-between">
          <h1 className=" font-bold">All Orders</h1>
          <Search className="w-60" placeholder="Search product" />
        </div>
        <div>
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

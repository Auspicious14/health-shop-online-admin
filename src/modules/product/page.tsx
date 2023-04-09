import { DeleteFilled, EditFilled, PlusOutlined } from "@ant-design/icons";
import { Button, Card, Space, Table, Input, Tag, Modal } from "antd";
import { ColumnsType } from "antd/es/table";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { SideNav } from "../../components";
import CreateProduct from "../../pages/createProduct";
import { ProductListItem } from "./components/listitem";
import { useProductState } from "./context";
import CreateProductPage from "./detail";
import { IProduct } from "./model";
const Search = Input;

export const ProductPage = () => {
  const { products, getProducts, deleteProduct } = useProductState();
  const [modal, setModal] = useState<{ show: boolean; data?: any }>({
    show: false,
  });
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [loading, setLoading] = useState(false);
  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    console.log("selectedRowKeys changed: ", newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };

  useEffect(() => {
    getProducts();
  }, []);
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };
  const columns: ColumnsType<IProduct> = [
    {
      title: "id",
      dataIndex: "_id",
    },
    {
      title: "",
      dataIndex: "images",
    },

    {
      title: "Product Name",
      dataIndex: "name",
    },
    {
      title: "Rating",
      dataIndex: "rating",
    },
    {
      title: "Qty",
      dataIndex: "quantity",
    },
    {
      title: "Color",
      dataIndex: "color",
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
      render: (_, { _id }) => (
        <Space size="middle">
          <DeleteFilled onClick={() => deleteProduct(_id)} />
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
            onClick={() => setModal({ show: true })}
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
            dataSource={products}
          />
        </div>
      </div>

      <Modal
        title="Add new product"
        open={modal.show}
        centered
        onOk={() => setModal({ show: true })}
        // confirmLoading={true}
        width={1000}
        onCancel={() => setModal({ show: false })}
      >
        <CreateProductPage product={modal.data} />
      </Modal>
    </div>
  );
};

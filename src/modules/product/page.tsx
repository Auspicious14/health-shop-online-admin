import { DeleteFilled, EditFilled, PlusOutlined } from "@ant-design/icons";
import { Button, Card, Space, Table, Input, Tag, Modal } from "antd";
import { ColumnsType } from "antd/es/table";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { ApModal, SideNav } from "../../components";
import CreateProduct from "../../pages/createProduct";
import { ProductListItem } from "./components/listitem";
import { useProductState } from "./context";
import CreateProductPage from "./detail";
import { IProduct } from "./model";
const Search = Input;

export const ProductPage = () => {
  const { products, getProducts, deleteProduct } = useProductState();
  const [modal, setModal] = useState<{
    show: boolean;
    data?: any;
    type?: "Add Product" | "Update Product";
  }>({
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
      key: "_id",
    },
    // {
    //   title: "",
    //   dataIndex: "images",
    //   key: "images",
    // },

    {
      title: "Product Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Qty",
      dataIndex: "quantity",
      key: "quantity",
    },
    {
      title: "Color",
      dataIndex: "color",
      key: "color",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
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
      render: (_, product) => (
        <Space size="middle">
          <EditFilled
            onClick={() =>
              setModal({ show: true, data: product, type: "Update Product" })
            }
          />
        </Space>
      ),
    },
  ];

  const handleSearch = (e: any) => {
    console.log(e.target.value);
    getProducts(e.target.value);
  };

  return (
    <div className="flex w-full gap-4">
      <div className="w-[20%] h-screen border ">
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
            onClick={() =>
              setModal({ show: true, data: null, type: "Add Product" })
            }
          >
            Add product
          </Button>
        </div>
        <div className="shadow-sm p-4 flex items-center justify-between">
          <h1 className=" font-bold">All Products</h1>
          <Search
            className="w-60"
            placeholder="Search product"
            onChange={handleSearch}
          />
        </div>
        <div>
          <Table
            rowSelection={rowSelection}
            columns={columns}
            dataSource={products}
            rowKey={(p) => p._id}
          />
        </div>
      </div>

      <ApModal
        title={modal.type}
        show={modal.show}
        // centered
        // onOk={() => setModal({ show: false })}
        // confirmLoading={true}
        // width={1000}
        onDimiss={() => setModal({ show: false })}
      >
        <CreateProductPage
          product={modal.data}
          onUpdate={() => setModal({ show: false })}
        />
      </ApModal>
    </div>
  );
};

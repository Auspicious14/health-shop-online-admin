import { DeleteFilled, EditFilled, PlusOutlined } from "@ant-design/icons";
import {
  Button,
  Card,
  Space,
  Table,
  Input,
  Tag,
  Modal,
  Popconfirm,
} from "antd";
import { ColumnsType } from "antd/es/table";
import React, { useEffect, useState } from "react";
import { ApModal, SideNav } from "../../components";
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
    {
      title: "Image",
      key: "images",
      render: (_, { images }) => (
        <Space className="w-20 h-20">
          <img
            src={images?.[0]?.uri}
            alt={images?.[0]?.uri}
            className="w-full h-full object-cover"
          />
        </Space>
      ),
    },

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
        // let color = status === "instock" ? "blue" : "red";
        return <Tag>{status}</Tag>;
      },
    },
    {
      title: "",
      key: "action",
      render: (_, { _id }) => (
        <Popconfirm
          title="Sure to delete?"
          onConfirm={() => deleteProduct(_id)}
          okButtonProps={{
            style: { background: "rgb(37 99 235)" },
          }}
        >
          <DeleteFilled />
        </Popconfirm>
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
            pagination={{ pageSize: 50 }}
            scroll={{ y: 500 }}
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

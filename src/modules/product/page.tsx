import React, { useEffect, useState } from "react";
import {
  DeleteOutlined,
  EditFilled,
  PlusOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { Button, Space, Table, Input, Typography, Popconfirm } from "antd";
import { ColumnsType } from "antd/es/table";
import { ApModal } from "../../components";
import { useProductState } from "./context";
import CreateProductPage from "./detail";
import { IProduct } from "./model";
import { helper } from "../../helper";
const Search = Input;
const { Text } = Typography;

const productStatus = {
  instock: "bg-green-100 px-3 py-0.5 rounded-lg text-green-600",
  soldout: "bg-red-100 px-3 py-0.5 rounded-lg text-red-600",
  soon: "bg-orange-100 px-3 py-0.5 rounded-lg text-orange-600",
};

interface IProps {
  storeId?: string;
}
export const ProductPage: React.FC<IProps> = ({ storeId }) => {
  const { products, getProducts, deleteProduct, loading } = useProductState();
  const [modal, setModal] = useState<{
    show: boolean;
    data?: any;
    type?: "Add Product" | "Update Product";
  }>({
    show: false,
  });
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [search, setSearch] = useState<string>("");
  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    console.log("selectedRowKeys changed: ", newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };

  useEffect(() => {
    getProducts(storeId);
  }, [storeId]);
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const columns: ColumnsType<IProduct> = [
    {
      title: "Image",
      key: "images",
      // responsive: ["lg"],
      width: 100,
      sorter: (a, b) => a.images.length - b.images.length,
      sortDirections: ["descend", "ascend"],
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
      key: "name",
      sorter: (a, b) => a.name.length - b.name.length,
      sortDirections: ["descend", "ascend"],
      width: 100,
      render: (_, { name }) => <Text className="capitalize">{name}</Text>,
    },
    {
      title: "Qty",
      dataIndex: "quantity",
      key: "quantity",
      width: 100,
      sorter: (a, b) => a.quantity.length - b.quantity.length,
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Color",
      dataIndex: "color",
      key: "color",
      width: 100,
      sorter: (a, b) => a.color.length - b.color.length,
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      width: 100,
      sorter: (a, b) => a.price.length - b.price.length,
      sortDirections: ["descend", "ascend"],
      render: (_, { price }) => (
        <Text>{helper.toCurrency(parseFloat(price))}</Text>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      width: 100,
      render: (_, { availability }) => {
        return (
          <Text className={`${productStatus[availability]}`}>
            {availability}
          </Text>
        );
      },
    },
    {
      title: "",
      key: "action",
      render: (_, product) => (
        <Space className="flex gap-8 items-center">
          <Popconfirm
            title="Sure to delete?"
            onConfirm={() => deleteProduct(product?._id, storeId)}
            okButtonProps={{
              style: { background: "rgb(37 99 235)" },
            }}
          >
            <DeleteOutlined />
          </Popconfirm>
          <Space>
            <EditFilled
              onClick={() =>
                setModal({ show: true, data: product, type: "Update Product" })
              }
            />
          </Space>
        </Space>
      ),
    },
  ];

  const filtered = products?.filter((p) =>
    p?.name?.toLocaleLowerCase().includes(search.toLocaleLowerCase())
  );
  return (
    <>
      <div className="p-4">
        <div className="flex sm:flex-row items-center justify-between shadow-sm mb-4">
          <div className="mb-4 sm:mb-0">
            <h1 className="text-2xl sm:text-3xl font-bold">Products</h1>
            <span className="text-sm sm:text-base">Keep track of vendor</span>
          </div>
          {storeId && (
            <Button
              type="primary"
              icon={<PlusOutlined />}
              className="bg-blue-600 flex items-center"
              onClick={() =>
                setModal({ show: true, data: null, type: "Add Product" })
              }
            >
              Add product
            </Button>
          )}
        </div>
        <div className="shadow-sm mb-4 py-4 flex flex-col lg:justify-between sm:flex-row items-center">
          <h1 className="text-lg sm:text-xl font-bold">All Products</h1>
          <Search
            className="lg:w-60 w-full"
            placeholder="Search product"
            prefix={<SearchOutlined className="text-gray-300" />}
            onChange={(e) => setSearch(e.target.value.toLowerCase())}
          />
        </div>
        <div className="w-[20rem] sm:w-[30rem] md:w-[28rem] sm:wuto lg:w-full">
          <Table
            rowSelection={rowSelection}
            columns={columns}
            dataSource={filtered}
            rowKey={(p) => p._id}
            pagination={{ pageSize: 50 }}
            scroll={{ x: 350 }}
            loading={loading}
            tableLayout="fixed"
            rowClassName={"w-full"}
          />
        </div>
      </div>

      <ApModal
        title={modal.type}
        show={modal.show}
        onDimiss={() => setModal({ show: false })}
      >
        <CreateProductPage
          product={modal.data}
          onUpdate={() => setModal({ show: false })}
          storeId={storeId}
        />
      </ApModal>
    </>
  );
};

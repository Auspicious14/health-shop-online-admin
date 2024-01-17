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
  storeId: string;
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

  console.log(products, "producttts");
  const columns: ColumnsType<IProduct> = [
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
      key: "name",
      render: (_, { name }) => <Text className="capitalize">{name}</Text>,
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
      // dataIndex: "price",
      key: "price",
      render: (_, { price }) => (
        <Text>{helper.toCurrency(parseFloat(price))}</Text>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
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
            onConfirm={() => deleteProduct(product?._id)}
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
      <div>
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
            prefix={<SearchOutlined className="text-gray-300" />}
            onChange={(e) => setSearch(e.target.value.toLocaleLowerCase())}
          />
        </div>
        <div>
          <Table
            rowSelection={rowSelection}
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

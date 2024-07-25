import {
  Card,
  Space,
  Table,
  Input,
  Typography,
  Dropdown,
  MenuProps,
} from "antd";
import { ColumnsType } from "antd/es/table";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { IOrder } from "./model";
import { useOrderState } from "./context";
import { getCookie } from "../../helper";
import { SearchOutlined } from "@ant-design/icons";
const Search = Input;
const { Text } = Typography;

const statusColor = {
  pending: "text-orange-400",
  confirmed: "text-blue-600",
  Delivered: "text-green-600",
  cancelled: "text-red-600",
  new: "text-black",
};

interface IProps {
  storeId?: string;
}

export const OrderPage: React.FC<IProps> = ({ storeId }) => {
  const [order, setOrder] = useState<IOrder>();
  const { orders, getAllOrders, updateOrderItem } = useOrderState();
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [search, setSearch] = useState<string>("");
  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    console.log("selectedRowKeys changed: ", newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };
  useEffect(() => {
    getAllOrders(storeId);
  }, [storeId]);

  const counts: any = orders
    ?.map((o) => o.status)
    .reduce(
      (acc: any, value) => ({
        ...acc,
        [value]: (acc[value] || 0) + 1,
      }),
      {}
    );
  // console.log(counts);
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };
  const hasSelected = selectedRowKeys.length > 0;

  const columns: ColumnsType<IOrder> = [
    {
      title: "id",
      dataIndex: "_id",
      key: "id",
    },
    {
      title: "Name",
      key: "name",
      render: (_, { address }) => (
        <Text className="capitalize">{address?.name}</Text>
      ),
    },
    {
      title: "Product Name",
      key: "productName",
      render: (_, { cart }) => (
        <Space className="block capitalize">
          {cart?.map((c, i) => (
            <Text key={i}>{c?.product?.product?.name}</Text>
          ))}
        </Space>
      ),
    },
    {
      title: "Order Date",
      key: "createdAt",
      render: (_, { createdAt }) => (
        <Text className="block capitalize">
          {new Date(createdAt).toDateString()}
        </Text>
      ),
    },
    {
      title: "Qty",
      key: "quantity",
      render: (_, { cart }) => (
        <Space className="block ">
          {cart?.map((c, i) => (
            <Text key={i}>{`x${c?.product?.quantity}`}</Text>
          ))}
        </Space>
      ),
    },
    {
      title: "Price",
      key: "price",
      render: (_, { cart }) => (
        <Space className="block capitalize ">
          {cart?.map((c, i) => (
            <Text key={i}>{c?.product?.product?.price}</Text>
          ))}
        </Space>
      ),
    },
    {
      title: "Status",
      key: "status",
      render: (_, { _id, status, ...others }) => {
        const items = [
          { key: "5", label: "New" },
          { key: "1", label: "Delivered" },
          { key: "2", label: "Pending" },
          { key: "3", label: "Confirmed" },
          { key: "4", label: "Cancelled" },
        ];
        const handleMenuClick: MenuProps["onClick"] = async (e: any) => {
          const id = getCookie("user_id");
          const res = await updateOrderItem(
            { others, id, status: e.domEvent.target.innerText },
            _id
          );
        };
        return (
          <Dropdown.Button menu={{ items, onClick: handleMenuClick }}>
            <Text className={`block uppercase ${statusColor[status]}`}>
              {status}
            </Text>
          </Dropdown.Button>
        );
      },
    },
  ];

  const filtered = orders?.filter((p) =>
    p.address?.name.toLocaleLowerCase().includes(search.toLocaleLowerCase())
  );
  return (
    <div>
      <div>
        <div className="shadow-sm p-4 ">
          <h1 className="text-3xl font-bold">Orders</h1>
          <span>{`${orders?.length} orders`}</span>
        </div>
        <div className="flex gap-8 my-4 items-center justify-between">
          <Card.Grid className="text-center w-[25%] shadow-md py-5 inset-3">
            <h1 className="text-sm">New Orders</h1>
            <h1 className="font-bold text-2xl">{counts?.new || 0}</h1>
          </Card.Grid>
          {/* <Card.Grid className="text-center w-[25%] shadow-md py-5 inset-3">
            <h1 className="text-sm">Pending Orders</h1>
            <h1 className="font-bold text-2xl">{counts.pending || 0}</h1>
          </Card.Grid> */}
          <Card.Grid className="text-center w-[25%] shadow-md py-5 inset-3">
            <h1 className="text-sm">Delivered Orders</h1>
            <h1 className="font-bold text-2xl">{counts?.Delivered || 0}</h1>
          </Card.Grid>
          <Card.Grid className="text-center w-[25%] shadow-md py-5 inset-3">
            <h1 className="text-sm">Confirmed Orders</h1>
            <h1 className="font-bold text-2xl">{counts?.confirmed || 0}</h1>
          </Card.Grid>
        </div>
        <div className="shadow-sm p-4 flex items-center justify-between">
          <h1 className=" font-bold">All Orders</h1>
          <Search
            className="w-60"
            placeholder="Search order"
            prefix={<SearchOutlined className="text-gray-300" />}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div>
          <Table
            rowSelection={rowSelection}
            columns={columns}
            dataSource={filtered}
            rowKey={(ord) => ord?._id}
            pagination={{ pageSize: 50 }}
            scroll={{ y: 250 }}
          />
        </div>
      </div>
    </div>
  );
};

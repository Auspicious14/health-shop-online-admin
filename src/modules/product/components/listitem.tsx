import React, { useState } from "react";
import { DeleteFilled, EditFilled, PlusOutlined } from "@ant-design/icons";
import { Button, Card, Space, Table, Input, Tag, Modal } from "antd";
import { ColumnsType } from "antd/es/table";
import { IProduct } from "../model";
import { Tr, Td } from "@chakra-ui/react";

interface IProps {
  product: IProduct;
  onClick: (product: IProduct) => void;
  onDelete: (product: IProduct) => void;
}
export const ProductListItem: React.FC<IProps> = ({
  product,
  onClick,
  onDelete,
}) => {
  console.log(product);

  return (
    <>
      <Tr>
        <Td>{product?._id}</Td>
        <Td>{product?.name}</Td>
        <Td>{product?.quantity}</Td>
        <Td>{product?.color}</Td>
        <Td>{product?.price}</Td>
        <Td>{product?.status}</Td>
        <Td onClick={() => onClick(product)}>
          {" "}
          <Space size="middle">
            <EditFilled />
          </Space>
        </Td>
        <Td onClick={() => onDelete(product)}>
          <Space size="middle">
            <DeleteFilled />
          </Space>
        </Td>
      </Tr>
    </>
  );
};

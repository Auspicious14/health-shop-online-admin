import { UploadOutlined } from "@ant-design/icons";
import { Button, Upload } from "antd";
import React, { useState } from "react";
import { fileSvc } from "../../services/file";
interface IProps {
  inputId?: string;
  className?: string;
  accept?: string;
  multiple?: boolean;
  title?: string;
  onSelected: (files: Array<any>) => void;
}

export const ApFileInput: React.FC<IProps> = (props: IProps) => {
  const {
    onSelected,
    multiple,
    className,
    accept,
    inputId = "file-upload",
  } = props;
  // const [fl, setFl] = useState("");
  const handleOnChange = async (e: any) => {
    const fls = e.target?.files;

    if (fls && fls.length > 0) {
      // setFl(await fileSvc.fileToBase64(f));

      let files = [];
      for await (const f of fls) {
        files.push({
          uri: await fileSvc.fileToBase64(f),
          file: f,
        });
      }
      onSelected(files);
    }
  };

  return (
    <div className="add-file-btn">
      <label className="btn secondary" htmlFor={inputId}>
        {props.title || "Upload Images"}
      </label>
      <input
        id={inputId}
        type="file"
        name="file"
        multiple={multiple}
        accept={accept}
        className=""
        onChange={handleOnChange}
      />
      {/* <Upload
        name={props.title}
        listType="picture-card"
        onChange={handleOnChange}
        accept={accept}
      >
        <Button icon={<UploadOutlined />}>Click to upload</Button>
      </Upload> */}
    </div>
  );
};

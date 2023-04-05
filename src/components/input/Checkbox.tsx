import { ErrorMessage, Field, useField } from "formik";
import React, { useEffect, useState } from "react";

interface IProps {
  label?: string;
  labelClassName?: string;
  className?: string;
  name: string;
  onChange?: (val: boolean) => void;
  props?: {
    [x: string]: any;
  };
}

export const ApCheckbox: React.FC<IProps> = ({
  label,
  name,
  className,
  labelClassName = "text-xl bold",
  onChange,
  ...props
}) => {
  const [field, meta, { setValue }] = useField(name);

  return (
    <div
      style={{
        marginBottom: 10,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div className="flex items-center">
        <Field
          className={className}
          type="checkbox"
          name={name}
          onChange={(val: any) => {
            setValue(!field.value);
            if (onChange) onChange(!field.value);
          }}
        />
        <label className={`ml-4 ${labelClassName}`}>{label}</label>
      </div>

      <ErrorMessage className="text-red-500" name={name} component="div" />
    </div>
  );
};

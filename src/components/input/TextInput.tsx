import { ErrorMessage, Field, useField } from "formik";
import React, { useEffect } from "react";

interface IProps {
  label?: string;
  type: string;
  name: string;
  className?: string;
  placeHolder?: string;
  sideLabel?: string;
  helperText?: string;
  // onChange?:(value:string)=>void;
  props?: {
    [x: string]: any;
  };
  containerClass?: string;
}

export const ApTextInput: React.FC<IProps> = ({
  label,
  type,
  name,
  className,
  placeHolder,
  containerClass,
  sideLabel,
  helperText,
  ...props
}) => {
  const [field, meta] = useField(name);

  useEffect(() => {}, [field]);

  return (
    <div
      style={{ marginBottom: 10, display: "flex", flexDirection: "column" }}
      className={containerClass}
    >
      <label>{label}</label>
      {type == "textarea" ? (
        <textarea
          className={`w-full p-4 mb-2 bg-stone-50 border ${className}`}
          {...field}
          {...props}
          name={name}
          rows={6}
          placeholder={placeHolder}
        ></textarea>
      ) : (
        <Field
          type={type}
          {...field}
          {...props}
          name={name}
          className={`w-full mb-2 bg-stone-50 border-none ${className}`}
          placeholder={placeHolder}
        />
      )}
      {helperText && <p className="text-sm py-2">{helperText}</p>}
      <ErrorMessage className="text-red-500" name={name} component="div" />
    </div>
  );
};

import { ErrorMessage, useField } from "formik";
import React from "react";
import Select from "react-select";
import { StateManagerProps } from "react-select/dist/declarations/src/useStateManager";
// import makeAnimated from "react-select/animated";

// const animatedComponents = makeAnimated();

interface IProps extends StateManagerProps {
  label?: string;
  name: string;
  isMulti?: boolean;
  options: Array<{ value: string; label: string }> | any;
  addOnChange?: (value: any) => void;
}

export const ApSelectInput: React.FC<IProps> = (props) => {
  const { label, options, isMulti, name, addOnChange } = props;
  const [field, meta, { setValue }] = useField(name);

  return (
    <div className="mb-5">
      <label className="label block mb-2" htmlFor="email">
        {label}
      </label>

      <Select
        {...field}
        {...props}
        isMulti={isMulti}
        options={options}
        name={name}
        closeMenuOnSelect={false}
        // components={animatedComponents}
        onChange={(val: any) => {
          setValue(val);
          if (addOnChange) addOnChange(val);
        }}
      />

      {meta.error && (
        <div className="text-red-500">{(meta.error as any)?.value}</div>
      )}
      {/* <ErrorMessage className="text-red-500"  name={name} component="div" /> */}
    </div>
  );
};

import { useField } from "formik";
import { TextInput } from "@mantine/core";
import { FunctionComponent } from "react";

export interface InputProps {
  type: "password" | "email" | "text" | "number";
  name: string;
  label: string;
  placeholder: string;
}

const Input: FunctionComponent<InputProps> = ({
  type,
  name,
  label,
  placeholder,
}) => {
  const [field, meta] = useField(name);
  const { touched, error } = meta;
  return (
    <TextInput
      name={name}
      label={label}
      placeholder={placeholder}
      type={type}
      error={touched && error ? error : undefined}
    />
  );
};

export default Input;

import { FC, useState } from "react";
import { StyleSheet, TextInput, TextInputProps } from "react-native";
import { cn } from "@/utils/cn";

interface Props extends TextInputProps {
  className?: string;
}

const FormInput: FC<Props> = ({ className, ...props }) => {
  const [isFocused, setIsFocused] = useState(false);
  return (
    <TextInput
      className={cn(
        "w-auto py-4 px-2 rounded-lg mb-6 border  bg-gray-100/20",
        isFocused ? "border-primary" : "border-deActive",
        className
      )}
      placeholderTextColor="bg-secondaryText"
      onBlur={() => {
        setIsFocused(false);
      }}
      onFocus={() => {
        setIsFocused(true);
      }}
      {...props}
    ></TextInput>
  );
};

export default FormInput;

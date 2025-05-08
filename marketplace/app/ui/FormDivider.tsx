import { cn } from "@/utils/cn";
import colors from "@/utils/colors";
import { FC } from "react";
import { View, StyleSheet, DimensionValue, ColorValue } from "react-native";

interface Props {
  width?: DimensionValue;
  height?: DimensionValue;
  backgroundColor?: ColorValue;
  className?: string;
}

const FormDivider: FC<Props> = ({
  width = "w-1/2",
  height = "h-0.5",
  backgroundColor = "bg-deActive",
  className,
}) => {
  return (
    <View
      className={cn(
        "self-center my-7",
        width,
        height,
        backgroundColor,
        className
      )}
    />
  );
};

export default FormDivider;

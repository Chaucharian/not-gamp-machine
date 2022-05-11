import { DimensionValue } from "@react-types/shared";

export interface Spacing {
  thiny: DimensionValue;
  small: DimensionValue;
  medium: DimensionValue;
  large: DimensionValue;
}
export const SPACING: Spacing = {
  thiny: "size-100",
  small: "size-150",
  medium: "size-250",
  large: "size-350",
};

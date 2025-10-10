import { MouseEvent } from "react";

export interface ICheckbox {
  selected: boolean;
  size: "small" | "large";
  onClick?: (e?: MouseEvent<HTMLDivElement>) => void;
}

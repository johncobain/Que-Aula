import React from "react";

export interface IClassListItem {
  selected?: boolean;
  teacher?: string;
  classCode?: string;
  whichClass?: string;
  description?: string;
  onClick?: (e: React.MouseEvent<HTMLElement>) => void;
}

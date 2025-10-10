export interface IClassTag {
  selected?: boolean;
  title?: string;
  whichClass?: string;
  loading?: boolean;
  onClick?: (e: React.MouseEvent<HTMLElement>) => void;
}

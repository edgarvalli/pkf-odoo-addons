export interface TableKeyPair {
  label: string;
  text: string;
  firstCellWidth?: number;
}

export interface TableInfoProps {
  items: TableKeyPair[];
  title?: string;
  hide?: boolean;
  fontSize?: number;
}

export interface SelectClientProps {
  onItemSelected?: (cliente: Cliente) => void;
  data?: Cliente[];
  value?: string | number;
}

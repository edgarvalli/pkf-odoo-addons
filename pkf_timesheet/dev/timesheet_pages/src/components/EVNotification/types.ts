export interface NotificationProps {
  color: Colors;
  message: string;
  delay: number;
}
export type Colors = "error" | "info" | "success" | "warning";

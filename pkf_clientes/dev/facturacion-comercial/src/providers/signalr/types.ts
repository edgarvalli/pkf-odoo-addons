export interface SignalRStatus {
  status: "connected" | "reconnecting" | "offline" | "error";
  message: string;
  color?: BSTextColor;
}

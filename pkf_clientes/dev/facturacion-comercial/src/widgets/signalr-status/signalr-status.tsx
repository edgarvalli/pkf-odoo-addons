import { useSignalRContext } from "@/providers/signalr";
import { useEffect, useState } from "react";

export type StatusType = "pending" | "processing" | "completed" | "failed";
export function SignalRStatus() {
  const [message, setMessage] = useState<string | null>(null);
  const { status, socket } = useSignalRContext();
  const [color, setColor] = useState<BSTextColor>("text-primary");

  useEffect(() => {
    if (status.color) {
      setColor(status.color);
    }
    socket?.on("notify", (status: StatusType, msg: string) => {
      setMessage(msg);

      if (status === "processing" || status === "pending") {
        setColor("text-primary");
      } else if (status === "failed") {
        setColor("text-danger");
      } else if (status === "completed") {
        setColor("text-success");
      } else {
        setColor("text-primary");
      }
    });

    socket?.on("job-finished", () => {
      setMessage("Conectado a Comercial");
      setColor("text-success");
    });
  }, [socket]);

  const renderMessage = () => {
    if (status.status === "connected") {
      return message ?? status.message;
    }

    return status.message;
  };

  return (
    <span className={color}>
      <i className="fa fa-circle me-2"></i>
      {renderMessage()}
    </span>
  );
}

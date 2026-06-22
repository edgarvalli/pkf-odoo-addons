import { useContext, useEffect, useState } from "react";
import type { SignalRStatus } from "./types";
import { startSignalR, getSocket } from "./socket";
import { SignalRContext } from "./provider";
import { useAppContext } from "@/providers/app";

export function useSignalR() {
  const [status, setStatus] = useState<SignalRStatus>({
    status: "offline",
    message: "No conectado",
  });

  const { contpaqi_api_url } = useAppContext();

  useEffect(() => {
    if (!contpaqi_api_url) return;

    let mounted = true;

    startSignalR(contpaqi_api_url)
      .then((conn) => {
        if (!mounted || !conn) return;

        conn.onreconnecting(() => {
          setStatus({
            status: "reconnecting",
            message: "Reconectando...",
            color: "text-warning",
          });
        });

        conn.onreconnected(() => {
          setStatus({
            status: "connected",
            message: "Conectado a Comercial",
            color: "text-success",
          });
        });

        conn.onclose(() => {
          setStatus({
            status: "offline",
            message: "Desconectado",
            color: "text-danger",
          });
        });

        setStatus({
          status: "connected",
          message: "Conectado a Comercial",
          color: "text-success",
        });
      })
      .catch((err) => {
        if (!mounted) return;

        setStatus({
          status: "offline",
          message: String(err),
          color: "text-danger",
        });
      });

    return () => {
      mounted = false;
    };
  }, [contpaqi_api_url]);

  return {
    socket: getSocket(),
    status,
  };
}

export function useSignalRContext() {
  const ctx = useContext(SignalRContext);

  if (!ctx) {
    throw new Error("SignalR must be inside SignalRProvider");
  }

  return ctx;
}

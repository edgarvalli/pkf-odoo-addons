import { Alert, LinearProgress } from "@mui/material";
import type { NotificationProps } from "./types";
import { useEffect, useState } from "react";

export function EVNotification(
  props: NotificationProps & { onClose?: () => void },
) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    // Si la barra debe durar 3 segundos, actualizamos cada 30ms para que sea fluido
    const stepTime = props.delay / 100;

    const timer = setInterval(() => {
      setValue((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          // Ejecutamos el cierre después de un pequeño delay
          // para que el usuario vea la barra llena al 100%
          props.onClose && setTimeout(props.onClose, 200);
          return 100;
        }
        return prev + 1;
      });
    }, stepTime);

    return () => {
      clearInterval(timer);
    };
  }, [props.delay, props.onClose]);

  return (
    <div className="ev-notification" style={{ marginBottom: "1rem" }}>
      <Alert
        severity={props.color}
        onClose={props.onClose} // Permite cierre manual también
      >
        {props.message}
      </Alert>
      <LinearProgress
        color={props.color}
        value={value}
        variant="determinate"
        sx={{
          height: 4,
          borderBottomLeftRadius: 4,
          borderBottomRightRadius: 4,
        }}
      />
    </div>
  );
}

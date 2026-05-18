import { RecibosFilter } from "@/components/recibos/recibos-filter";
import { useRecibosContext } from "@/hooks/use-recibos-context";
import { Modal, Paper } from "@mui/material";
import { useState } from "react";

export function RecibosMobileNavbar() {
  const [open, setOpen] = useState(false);
  const { empleado } = useRecibosContext();
  return (
    <header>
      <nav className="navbar">
        <div className="d-flex justify-content-between align-items-center w-100 p-2">
          <span className="fw-bold text-muted">{empleado?.nombre}</span>
          <i
            className="fa fa-filter"
            style={{ cursor: "pointer" }}
            onClick={() => setOpen(true)}
          ></i>
        </div>
      </nav>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        style={{ width: "80%", height: "60%" }}
        className="m-auto"
      >
        <Paper style={{ height: "100%" }} className="p-2 d-flex flex-column">
          <RecibosFilter onFilter={() => setOpen(false)} />
        </Paper>
      </Modal>
    </header>
  );
}

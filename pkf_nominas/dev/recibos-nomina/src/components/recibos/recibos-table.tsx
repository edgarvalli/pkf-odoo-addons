import { useFullHeight } from "@/hooks/use-full-height";
import { useRecibosContext } from "@/hooks/use-recibos-context";
import { RecibosActions } from "@/components/recibos/recibos-actions";
import {
  Paper,
  Skeleton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { useRef } from "react";

export function RecibosTable() {
  const tableRef = useRef<HTMLDivElement>(null);
  const { comprobantes, loading } = useRecibosContext();
  const height = useFullHeight(tableRef);

  const renderRowsShadow = Array.from({ length: 15 }).map((_, i) => (
    <TableRow key={i}>
      <TableCell>
        <Skeleton variant="rectangular" />
      </TableCell>
      <TableCell>
        <Skeleton variant="rectangular" />
      </TableCell>
      <TableCell>
        <Skeleton variant="rectangular" />
      </TableCell>
      <TableCell>
        <Skeleton variant="rectangular" />
      </TableCell>
      <TableCell>
        <Skeleton variant="rectangular" />
      </TableCell>
    </TableRow>
  ));

  const renderRows = comprobantes?.map((c) => {
    return (
      <TableRow key={c.iddocumento}>
        <TableCell className="text-muted" style={{ fontSize: 12 }}>
          {c.nombreemisor}
        </TableCell>
        <TableCell className="text-muted" style={{ fontSize: 12 }}>
          {c.rfcemisor}
        </TableCell>
        <TableCell className="text-muted" style={{ fontSize: 12 }}>
          {c.uuid}
        </TableCell>
        <TableCell className="text-muted" style={{ fontSize: 12 }}>
          {Number(c.total).toLocaleString("es-MX", {
            maximumFractionDigits: 2,
            minimumFractionDigits: 2,
          })}
        </TableCell>
        <TableCell>
          <RecibosActions iddocumento={c.iddocumento} />
        </TableCell>
      </TableRow>
    );
  });

  return (
    <TableContainer
      component={Paper}
      className="d-flex flex-column flex-grow-1 mt-2"
      style={{ overflowY: "auto", height: height - 10, scrollbarWidth: "thin" }}
      ref={tableRef}
    >
      <Table sx={{ minWidth: 650 }} aria-label="a dense table">
        <TableHead style={{ position: "sticky", top: 0 }} className="bg-white">
          <TableRow>
            <TableCell className="fw-bold text-muted">Emisor</TableCell>
            <TableCell className="fw-bold text-muted">Rfc Emisor</TableCell>
            <TableCell className="fw-bold text-muted">UUID</TableCell>
            <TableCell className="fw-bold text-muted">Total</TableCell>
            <TableCell className="fw-bold text-muted">Acciones</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>{loading ? renderRowsShadow : renderRows}</TableBody>
      </Table>
    </TableContainer>
  );
}

import * as XLSX from "xlsx";
import { obtenerFechaFormato } from "./dates";

export function exportTableToExcel(tableId: string) {
  const target = document.getElementById(tableId);

  if (!target) {
    throw new Error(`La tabla ${tableId} no existe.`);
  }

  const workbook = XLSX.utils.table_to_book(target, {
    sheet: "SaldoClientes",
  });

  const worksheet = workbook.Sheets["SaldoClientes"];

  // Ajustar el ancho de las columnas
  const range = XLSX.utils.decode_range(worksheet["!ref"] || "A1");

  worksheet["!cols"] = [];

  for (let col = range.s.c; col <= range.e.c; col++) {
    let maxLength = 10;

    for (let row = range.s.r; row <= range.e.r; row++) {
      const address = XLSX.utils.encode_cell({ r: row, c: col });
      const cell = worksheet[address];

      if (cell?.v != null) {
        maxLength = Math.max(maxLength, String(cell.v).length + 2);
      }
    }

    worksheet["!cols"][col] = {
      wch: Math.min(maxLength, 35),
    };
  }

  // Agregar autofiltro a los encabezados
  worksheet["!autofilter"] = {
    ref: XLSX.utils.encode_range(range),
  };

  // Formato de moneda para columnas con encabezados de saldo o importe
  for (let col = range.s.c; col <= range.e.c; col++) {
    const headerAddress = XLSX.utils.encode_cell({
      r: range.s.r,
      c: col,
    });

    const header = String(worksheet[headerAddress]?.v ?? "").toLowerCase();

    if (
      header.includes("saldo") ||
      header.includes("importe") ||
      header.includes("total")
    ) {
      for (let row = range.s.r + 1; row <= range.e.r; row++) {
        const address = XLSX.utils.encode_cell({ r: row, c: col });
        const cell = worksheet[address];

        if (cell && typeof cell.v === "number") {
          cell.z = '"$"#,##0.00;[Red]-"$"#,##0.00';
        }
      }
    }
  }

  XLSX.writeFile(workbook, `SaldoClientes_${obtenerFechaFormato()}.xlsx`);
}

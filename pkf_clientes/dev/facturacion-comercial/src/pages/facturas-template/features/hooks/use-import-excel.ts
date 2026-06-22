import { useOrm } from "@/hooks";
import { useState, type RefObject } from "react";
import * as EXCEL from "xlsx";

export type Folio = {
  serie: string;
  folio: number;
};
export function useImportExcel() {
  const [importing, setImporting] = useState(false);
  const orm = useOrm();

  const getSerieFolio = (file: File): Promise<Folio[]> => {
    return new Promise((resolve, reject) => {
      try {
        const reader = new FileReader();
        reader.readAsArrayBuffer(file);
        reader.onerror = reject;
        reader.onload = function (ev) {
          if (!ev.target) return resolve([]);
          const buffer = ev.target.result;
          const wb = EXCEL.read(buffer, { type: "buffer" });
          const sn = wb.SheetNames[0];
          const data = EXCEL.utils.sheet_to_json<Record<string, any>>(
            wb.Sheets[sn],
          );
          const serieAndFolioList = data.map((item) => {
            const serie = (item["serie"] || item["Serie"] || "") as string;
            const folioRaw = item["folio"] || item["Folio"] || 0;
            const folio =
              typeof folioRaw === "number"
                ? folioRaw
                : parseInt(String(folioRaw)) || 0;
            return { serie, folio };
          });
          resolve(serieAndFolioList);
        };
      } catch (e) {
        reject(e);
      }
    });
  };

  const importFolios = async (folios: Folio[]) => {
    const result = await orm.call<boolean>(
      "pkf.factura.template",
      "import_facturas_by_serie_folio",
      [folios],
    );
    return result;
  };

  const handleImportChange = async (e: RefObject<HTMLInputElement | null>) => {
    if (!e.current) return;
    setImporting(true);
    const { files } = e.current;
    if (!files) return;
    const serieAndFolioList = await getSerieFolio(files[0]);
    const success = await importFolios(serieAndFolioList);
    e.current.value = "";
    setImporting(false);
    if (success) {
      window.toast("Documento Importado", "success");
      setTimeout(() => {
        window.location.reload();
      }, 500);
    }
  };
  return { importing, handleImportChange };
}

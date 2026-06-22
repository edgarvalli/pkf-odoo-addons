import type { Metadata } from "@/pages/facturas-template/features/types";
import type { FacturaTemplate } from "@/pages/facturas-template/features/types/models";

export interface FormBaseProps {
  metadata: Metadata;
  form: FormHook<FacturaTemplate>;
}

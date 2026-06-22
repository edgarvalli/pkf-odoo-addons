import { Moves } from "./moves";
import { ObservacionesTab } from "./observaciones-tab";
import { PaymentTab } from "./payment-tab";

import type { FormBaseProps } from "./types";
import { Tabs as TabsWidget } from "@/widgets";

const tabsList = (props: FormBaseProps) => {
  return [
    {
      name: "moves",
      title: "Movimientos",
      element: <Moves {...props} />,
    },
    {
      name: "observ",
      title: "Observaciones",
      element: <ObservacionesTab {...props} />,
    },
    {
      name: "payment",
      title: "Pagos",
      element: <PaymentTab {...props} />,
    },
  ];
};

export function Tabs(props: FormBaseProps) {
  return (
    <div className="row d-flex flex-column flex-grow-1 min-h">
      <div className="col d-flex flex-column flex-grow-1 min-h">
        <TabsWidget
          tabList={tabsList(props)}
          className="d-flex flex-column flex-grow-1 min-h"
        />
      </div>
    </div>
  );
}

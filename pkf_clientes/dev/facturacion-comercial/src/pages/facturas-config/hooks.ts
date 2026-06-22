import { useForm, useOrm } from "@/hooks";
import { useEffect } from "react";
export function useFacturasConfig() {
  const form = useForm<ParamsType>();
  const orm = useOrm();

  const getValues = async () => {
    const result = await orm.call<ParamsType>(
      "pkf.factura.template",
      "get_config",
      [[]],
    );

    if (result) {
      form.setData(result);
    }
  };

  const saveValues = async () => {
    await orm.call<Boolean>("pkf.factura.template", "save_config", [[]], {
      vals: form.data,
    });

    window.toast("Configuraciones guardadas", "success");
  };

  useEffect(() => {
    getValues();
  }, []);

  return { form, orm, saveValues };
}

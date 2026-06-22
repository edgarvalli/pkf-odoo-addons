import { useForm, useOrm } from "@/hooks";
import { Form } from "./features/components";
import { useTemplateMetadata } from "./features/hooks";
import type { FacturaTemplate } from "@/pages/facturas-template/features/types/models";
import { useParams } from "react-router";
import { useEffect } from "react";

function useFacturaForm() {
  const initData = {
    pago: 1,
    total_pagos: 12,
    movimientos: [],
  };

  const { metadata } = useTemplateMetadata();

  const form = useForm<FacturaTemplate>(initData);
  const orm = useOrm();
  const params = useParams();

  const getInitData = async () => {
    const result = await orm.call<FacturaTemplate[]>(
      "pkf.factura.template",
      "get_template",
      [],
      { template_id: params.id },
    );
    if (result) {
      form.setData((prev) => ({ ...prev, ...result }));
    }
  };

  useEffect(() => {
    if (params.id) {
      getInitData();
    }
  }, []);

  return { form, metadata };
}

export function FacturaTemplateForm() {
  const { form, metadata } = useFacturaForm();
  return (
    <Form>
      <Form.Header />
      <Form.Body>
        <Form.Info form={form} metadata={metadata} />
        <Form.Tabs form={form} metadata={metadata} />
      </Form.Body>
      <Form.Footer form={form} metadata={metadata} />
    </Form>
  );
}

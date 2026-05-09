import { Component } from "@odoo/owl";
import { registry } from "@web/core/registry";

export default class RecurringInvoce extends Component {
  static template = "pkf_clientes.RecurringInvoice";
  static props = { "*": true };
  static description = "Facturas Recurrentes";
}

registry
  .category("actions")
  .add("pkf_clientes.RecurringInvoice", RecurringInvoce);

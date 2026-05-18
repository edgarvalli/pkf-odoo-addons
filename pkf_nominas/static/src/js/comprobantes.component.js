/** @odoo-module */
import { Component } from "@odoo/owl";
import { registry } from "@web/core/registry";

export class ComprobantesComponent extends Component {
  static template = "pkf_nominas.Comprobantes";
  static props = ["*"];
}

registry
  .category("actions")
  .add("pkf_nominas.Comprobantes", ComprobantesComponent);

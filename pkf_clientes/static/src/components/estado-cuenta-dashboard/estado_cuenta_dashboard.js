import { Component } from "@odoo/owl";
import { registry } from "@web/core/registry";

export default class EstadoCuentaDashoard extends Component {
  static template = "pkf_clientes.EstadoCuentaDashoard";
  static props = { "*": true };
}

registry
  .category("actions")
  .add("pkf_clientes.EstadoCuentaDashoard", EstadoCuentaDashoard);

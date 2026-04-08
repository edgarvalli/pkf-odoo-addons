import { Component, useState, onWillStart } from "@odoo/owl";
import { registry } from "@web/core/registry";
import { useService } from "@web/core/utils/hooks";
import { mappedStatus } from "@pkf_clientes/constants/mapped";
import { formatAccount } from "@pkf_clientes/utils/helpers";

export class SaldoClientesComponent extends Component {
  static template = "pkf_clientes.SaldoClientes";
  static props = ["*"];

  setup() {
    this.state = useState({
      saldos: [],
    });
    this.orm = useService("orm");
    this.action = useService("action");
    this.formatAccount = formatAccount;

    onWillStart(async () => {
      await this.getSaldoClientes();
    });
  }

  async getSaldoClientes() {
    this.saldos = await this.orm.call("pkf.clientes", "saldo_clientes", [[]]);
    this.state.saldos = this.saldos;
  }

  searchClient(ev) {
    const value = ev.target.value;
    const result = this.saldos.filter(
      (c) =>
        c.cliente.nombre.toLowerCase().includes(value.toLowerCase()) ||
        c.cliente.rfc.toLowerCase().includes(value.toLowerCase()) ||
        c.clasificacion.valor.toLowerCase().includes(value.toLowerCase()),
    );

    this.state.saldos = result;
  }

  async goToEstadoCuenta(cliente_id) {
    await this.action.doAction({
      type: "ir.actions.client",
      tag: "pkf_clientes.EstadoCuentaCliente",
      params: { cliente_id },
    });
  }

  mappedColor(value = "vigente", amount = 0) {
    const classes = ["rounded-pill", "p-1"];
    if (amount == 0) return classes.join(" ");
    const s = mappedStatus[value];
    if (!s) return classes.join(" ");
    classes.push(s.class);
    return classes.join(" ");
  }
}

registry
  .category("actions")
  .add("pkf_clientes.SaldoClientes", SaldoClientesComponent);

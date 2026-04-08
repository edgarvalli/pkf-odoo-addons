/** @odoo-module */
import { Component, useState, onWillStart } from "@odoo/owl";
import { registry } from "@web/core/registry";
import { useService } from "@web/core/utils/hooks";
import { Dropdown } from "@web/core/dropdown/dropdown";
import { DropdownItem } from "@web/core/dropdown/dropdown_item";

export class ComprobantesComponent extends Component {
  static template = "pkf_nominas.Comprobantes";
  static components = { Dropdown, DropdownItem };
  static props = ["*"];
  setup() {
    this.state = useState({
      comprobantes: [],
      loading: false,
      message: "Obteniendo los recibos de nominas",
      user: {},
      startdate: "",
      enddate: "",
    });
    this.orm = useService("orm");

    onWillStart(async () => {
      this.state.loading = true;
      await this.getComprobantes();
      this.state.loading = false;
    });
  }

  async getComprobantes(startdate = null, enddate = null) {
    const params = { limit: 50, metadata: true };
    if (startdate) params.startdate = startdate;
    if (enddate) params.enddate = enddate;

    const response = await this.orm.call("pkf.nominas", "comprobantes", [
      [],
      params,
    ]);

    if (response) {
      this.state.comprobantes = response.comprobantes;
      this.state.user = response.empleado;
    }

    if (this.state.comprobantes.lenght == 0) {
      this.state.message = "No hay recibos por mostrar";
    }
  }

  handleChangeDate(ev) {
    const { value, name } = ev.target;
    this.state[name] = value;
  }

  async onFilter() {
    const startdate = this.state.startdate;
    const enddate = this.state.enddate;

    await this.getComprobantes(startdate, enddate);

    this.state.startdate = "";
    this.state.enddate = "";
  }

  formatCurrency(value) {
    return Number(value).toLocaleString("es-MX", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  }

  makeDocument(iddocumento, type = "pdf") {
    window.open(
      `/pkfmty/api/v1/nominas/recibos/${iddocumento}/crear?type=${type}`,
      "_blank",
    );
  }
}

registry
  .category("actions")
  .add("pkf_nominas.Comprobantes", ComprobantesComponent);

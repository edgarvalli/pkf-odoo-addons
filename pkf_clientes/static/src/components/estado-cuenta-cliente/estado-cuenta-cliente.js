import { Component, useState, onWillStart } from "@odoo/owl";
import { registry } from "@web/core/registry";
import { useService } from "@web/core/utils/hooks";
import { CheckBox } from "@web/core/checkbox/checkbox";
import { mappedStatus } from "@pkf_clientes/constants/mapped";
import { getUser } from "@pkf_clientes/utils/helpers";

export class EstadoCuentaClienteComponent extends Component {
  static template = "pkf_clientes.EstadoCuentaCliente";
  static props = ["*"];
  static components = { CheckBox };

  setup() {
    this.state = useState({
      client: {
        facturas: [],
      },
      sendToClient: false,
      totalPendiente: 0,
    });
    this.notification = useService("notification");
    this.orm = useService("orm");

    onWillStart(async () => {
      await this.getClientData();
    });
  }

  getClientId() {
    const key = "pkf_client_id";
    const id = this.props.action?.params?.cliente_id;
    if (id) {
      sessionStorage.setItem(key, String(id));
      return Number(id);
    }
    const cid = sessionStorage.getItem(key);

    if (cid == null) return undefined;

    return Number(cid);
  }

  clientIdError() {
    this.notification.add("Debe de definir un ID de cliente.", {
      title: "Advertencia",
      type: "warning",
    });
    setTimeout(() => {
      window.history.back();
    }, 500);
  }

  async getClientData() {
    const clientId = this.getClientId();
    if (clientId === null) return this.clientIdError();

    const data = await this.orm.call(
      "ev.contpaqi.comercial",
      "saldo_cliente_detalle",
      [[]],
      { id: clientId },
    );

    if (data) {
      this.state.client = data;
    }
  }

  toggleSendToClient() {
    this.state.sendToClient = !this.state.sendToClient;
  }

  async sendEstadoCuenta() {
    const user = getUser();
    let emails = [user.login];

    if (this.state.sendToClient) {
      const clientEmails = this.state.client.emails;
      if (clientEmails === "") return;
      emails = [...emails, ...clientEmails.split(",")];
    }

    const params = { idcliente: this.state.client.id, emails };
    const sent = await this.orm.call(
      "pkf.clientes",
      "enviar_estado_cuenta",
      [[]],
      params,
    );

    if (sent) {
      return this.notification.add(
        `Correo enviado con exito a ${emails.join(",")}`,
        { type: "success" },
      );
    }

    return this.notification.add("No se envio el correo", {
      title: "Email Error",
      type: "danger",
    });
  }

  mapStatus(status = "vigente") {
    const classes = ["pe-1", "ps-1", "pt-2", "pb-2", "rounded-pill"];
    const s = mappedStatus[status];
    classes.push(s.class);
    s.class = classes.join(" ");
    return s;
  }
}

registry
  .category("actions")
  .add("pkf_clientes.EstadoCuentaCliente", EstadoCuentaClienteComponent);
